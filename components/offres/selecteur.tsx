"use client";

import Link from "next/link";
import { useState } from "react";
import { cta, offres, type SlugOffre } from "@/content/site";

// Le sélecteur de situation : on part de ce que vit le dirigeant, l'offre suit.
// Le choix voyage jusqu'au formulaire de contact (?offre=...).

type Offre = {
  slug: SlugOffre;
  image: string;
  surtitre: string;
  titre: string;
  accroche: string;
  texte: string;
  livre?: readonly string[];
  duree: string;
};

const p = offres.principale;
const [audit, accompagnement, maintenance] = offres.secondaires;

const OFFRES: Record<SlugOffre, Offre> = {
  audit: { slug: "audit", image: "/sc/loupe.webp", ...audit },
  build: {
    slug: "build",
    image: "/sc/gear.webp",
    surtitre: p.badge,
    titre: p.titre,
    accroche: p.accroche,
    texte: p.pourQui,
    livre: p.livre,
    duree: p.duree,
  },
  accompagnement: { slug: "accompagnement", image: "/sc/steps.webp", ...accompagnement },
  maintenance: { slug: "maintenance", image: "/sc/shield.webp", ...maintenance },
};

// Les lignes « Comment choisir » du contenu, dans leur ordre, avec leur offre.
const SITUATIONS: { situation: string; slug: SlugOffre }[] = offres.choisir.lignes.map(([situation, titre]) => ({
  situation,
  slug: (Object.values(OFFRES).find((o) => o.titre === titre)?.slug ?? "build") as SlugOffre,
}));

export function Selecteur() {
  const [choix, setChoix] = useState<SlugOffre>("build");
  const o = OFFRES[choix];

  return (
    <div className="of-surface">
      <fieldset className="of-situations">
        <legend className="of-legende">
          <span className="of-label">{offres.choisir.surtitre}</span>
          <span className="of-legende__titre">
            {offres.choisir.titre[0]}
            <em>{offres.choisir.titre[1]}</em>
            {offres.choisir.titre[2]}
          </span>
        </legend>
        {SITUATIONS.map((s) => (
          <label key={s.slug} className="of-situation" data-actif={choix === s.slug ? "" : undefined}>
            <input
              type="radio"
              name="situation"
              value={s.slug}
              checked={choix === s.slug}
              onChange={() => setChoix(s.slug)}
            />
            <span>{s.situation}</span>
          </label>
        ))}
      </fieldset>

      <article className="of-offre" aria-live="polite" key={o.slug}>
        <img className="of-objet" src={o.image} alt="" width={900} height={900} />
        <p className="of-label of-label--or">{o.surtitre}</p>
        <h2 className="of-titre">{o.titre}</h2>
        <p className="of-accroche">{o.accroche}</p>
        <p className="of-texte">{o.texte}</p>
        {o.livre && (
          <>
            <p className="of-label">{offres.livreLibelle}</p>
            <ul className="of-livre">
              {o.livre.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </>
        )}
        <p className="of-label">{offres.dureeLibelle}</p>
        <p className="of-duree">{o.duree}</p>
        <div className="of-actions">
          <Link href={`/contact?offre=${o.slug}#appeler`} className="of-bouton">
            {cta.court}
          </Link>
          <Link href={`/contact?offre=${o.slug}#ecrire`} className="of-lien">
            {cta.ecrire}
          </Link>
        </div>
      </article>
    </div>
  );
}
