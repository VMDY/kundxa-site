"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { accueil, appel, cas, cta, faq, realisations, site, tri } from "@/content/site";
import "./accueil.css";

/*
  Accueil Kundxa, version claire et épurée (skill viz-scroll-craft).

  Ouverture calme : le titre, le portrait encadré, le résumé du matin.
  Signature : le tri. La semaine type se lit comme une liste ; au fil du scroll,
  chaque ligne est cochée « fait par le système » et s'efface, et les trois
  décisions de dirigeant rejoignent le panneau « Pour vous ». Aucune scène
  épinglée : la page défile normalement, rien ne bloque la lecture.
*/

const DECISIONS = tri.taches.map((t, i) => ("decision" in t ? i : -1)).filter((i) => i >= 0);
const ROUTINE = tri.taches.length - DECISIONS.length;

function Titre({
  parts,
  as: Tag = "h2",
  className,
  id,
}: {
  parts: readonly string[];
  as?: "h1" | "h2";
  className?: string;
  id?: string;
}) {
  return (
    <Tag className={className} id={id}>
      {parts[0]}
      <em>{parts[1]}</em>
      {parts[2]}
    </Tag>
  );
}

export function Accueil() {
  const lignes = useRef<(HTMLLIElement | null)[]>([]);
  const [traitees, setTraitees] = useState<boolean[]>(() => tri.taches.map(() => false));

  // Une ligne est traitée quand elle passe au-dessus du milieu de l'écran.
  // En mouvement réduit, tout est affiché traité d'emblée.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTraitees(tri.taches.map(() => true));
      return;
    }
    let raf = 0;
    const lire = () => {
      raf = 0;
      const seuil = innerHeight * 0.58;
      const etat = lignes.current.map((el) => (el ? el.getBoundingClientRect().top < seuil : false));
      setTraitees((avant) => (avant.every((v, i) => v === etat[i]) ? avant : etat));
    };
    const demander = () => {
      if (!raf) raf = requestAnimationFrame(lire);
    };
    lire();
    addEventListener("scroll", demander, { passive: true });
    addEventListener("resize", demander);
    return () => {
      removeEventListener("scroll", demander);
      removeEventListener("resize", demander);
      cancelAnimationFrame(raf);
    };
  }, []);

  const faites = traitees.filter((v, i) => v && !DECISIONS.includes(i)).length;
  const recues = DECISIONS.filter((i) => traitees[i]);
  const r = accueil.hero.cartes.resume;
  const s = accueil.systeme;

  return (
    <div className="ac">
      {/* ------------------------------------------------------- 1 · OUVERTURE */}
      <section className="ac-une" aria-labelledby="ac-h1">
        <div className="ac-wrap ac-une__grille">
          <div className="ac-une__texte">
            <p className="ac-label">{site.signature}</p>
            <Titre id="ac-h1" parts={tri.droite.titre} as="h1" className="ac-h1" />
            <p className="ac-sous">{tri.droite.texte}</p>
            <div className="ac-actions">
              <Link href="/contact#appeler" className="ac-bouton">
                {cta.court}
              </Link>
              <Link href="/realisations" className="ac-lien">
                {cta.realisations}
              </Link>
            </div>
          </div>
          <div className="ac-une__visuel">
            <figure className="ac-portrait">
              <Image
                src={site.photo}
                alt={accueil.hero.photoAlt}
                width={820}
                height={1232}
                priority
                sizes="(max-width: 859px) 80vw, 30rem"
              />
            </figure>
            {/* Illustration d'une matinée type, pas un rapport client */}
            <div className="ac-resume" aria-label="Exemple de résumé du matin">
              <p className="ac-resume__tete">
                <span>{r.titre}</span>
                <span>{r.heure}</span>
              </p>
              <dl>
                {r.lignes.map(([cle, valeur]) => (
                  <div key={cle}>
                    <dt>{cle}</dt>
                    <dd>{valeur}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- 2 · LE TRI */}
      <section className="ac-section ac-blanc ac-tri" aria-labelledby="ac-tri">
        <div className="ac-wrap">
          <p className="ac-label">{tri.gauche.libelle}</p>
          <h2 id="ac-tri" className="ac-h2">
            Le système prend la semaine. Il vous rend trois <em>décisions</em>.
          </h2>
          <p className="ac-note">{tri.note}</p>
        </div>
        <div className="ac-wrap ac-tri__grille">
          <ol className="ac-semaine">
            {tri.taches.map((t, i) => {
              const decision = DECISIONS.includes(i);
              const fait = traitees[i];
              return (
                <li
                  key={t.t}
                  ref={(el) => {
                    lignes.current[i] = el;
                  }}
                  data-etat={fait ? (decision ? "pour-vous" : "fait") : "a-faire"}
                >
                  <span className="ac-semaine__t">{t.t}</span>
                  <span className="ac-semaine__d">
                    {fait ? (decision ? "Pour vous" : "Fait par le système") : t.d}
                  </span>
                </li>
              );
            })}
          </ol>
          <aside className="ac-pourvous" aria-live="polite">
            <p className="ac-label">
              {tri.droite.libelle} · {recues.length}
            </p>
            {recues.length === 0 && <p className="ac-pourvous__vide">{tri.plateauVide}</p>}
            <ul>
              {recues.map((i) => (
                <li key={i}>
                  <p>{tri.taches[i].t}</p>
                  <span>{tri.taches[i].d}</span>
                </li>
              ))}
            </ul>
            <p className="ac-pourvous__compte">
              <b>{faites}</b> / {ROUTINE} tâches faites par le système
            </p>
          </aside>
        </div>
      </section>

      {/* ------------------------------------------------- 3 · LE SYSTÈME RÉEL */}
      <section className="ac-section" data-sc-act="flow" aria-labelledby="ac-systeme">
        <div className="ac-wrap ac-grille">
          <div>
            <p className="ac-label">{s.surtitre}</p>
            <Titre id="ac-systeme" parts={s.titre} className="ac-h2" />
            <p className="ac-texte">
              {s.texte}{" "}
              <a href={s.source.href} target="_blank" rel="noopener noreferrer" className="ac-source">
                {s.source.libelle}
              </a>
            </p>
            <ol className="ac-paliers">
              <svg className="ac-paliers__trait" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
                <line x1="1" y1="0" x2="1" y2="100" pathLength={1} />
              </svg>
              {s.schema.noeuds.slice(0, 5).map((n) => (
                <li key={n.id} data-sc-in>
                  <span className="ac-paliers__cle">{n.cle}</span>
                  <span className="ac-paliers__texte">{n.texte}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="ac-colle">
            <div className="ac-retour" data-sc-in>
              <p className="ac-label">Ce qui vous revient</p>
              <p className="ac-retour__titre">{s.schema.noeuds[5].texte}</p>
              <p className="ac-retour__cle">{s.schema.noeuds[5].cle}</p>
            </div>
            <dl className="ac-faits" data-sc-in data-sc-stagger="70">
              {s.faits.map((f) => (
                <div key={f.cle}>
                  <dt>{f.cle}</dt>
                  <dd>{f.texte}</dd>
                </div>
              ))}
            </dl>
            <a href={site.videoRelance} target="_blank" rel="noopener noreferrer" className="ac-lien">
              {s.video}
            </a>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- 4 · RÉALISATIONS */}
      <section className="ac-section ac-blanc" aria-labelledby="ac-cas">
        <div className="ac-wrap ac-grille">
          <div>
            <p className="ac-label">{accueil.realisations.surtitre}</p>
            <Titre id="ac-cas" parts={accueil.realisations.titre} className="ac-h2" />
            <p className="ac-texte">{accueil.realisations.texte}</p>
          </div>
          <div>
            <p className="ac-label">{realisations.chezNous.surtitre}</p>
            <ul className="ac-chez" data-sc-in data-sc-stagger="60">
              {realisations.chezNous.items.map((it) => (
                <li key={it.titre}>
                  <span>{it.titre}</span> {it.texte}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ac-wrap ac-cas">
          {cas.map((c) => (
            <article key={c.slug} className="ac-cas__ligne" data-sc-in>
              <img src={c.image} alt="" width={933} height={1400} loading="lazy" className="ac-cas__img" />
              <div>
                <p className="ac-label">{c.surtitre}</p>
                <h3 className="ac-h3">{c.titre}</h3>
                <p className="ac-texte ac-texte--court">{c.systeme}</p>
              </div>
              <div className="ac-cas__revient">
                <p className="ac-label">Ce qui revient au dirigeant</p>
                <p>{c.revient}</p>
              </div>
            </article>
          ))}
          <Link href="/realisations" className="ac-lien">
            {accueil.realisations.lien}
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------ 5 · LIMITES + FONDATEUR */}
      <section className="ac-section" aria-labelledby="ac-limites">
        <div className="ac-wrap ac-grille">
          <div className="ac-colle">
            <p className="ac-label">{accueil.limites.surtitre}</p>
            <Titre id="ac-limites" parts={accueil.limites.titre} className="ac-h2" />
            <ul className="ac-limites" data-sc-in data-sc-stagger="80">
              {accueil.limites.items.map((it) => (
                <li key={it.titre}>
                  <p className="ac-limites__titre">{it.titre}</p>
                  <p className="ac-texte ac-texte--court">{it.texte}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <blockquote className="ac-citation" data-sc-in>
              {accueil.fondateur.citation[0]}
              <em>{accueil.fondateur.citation[1]}</em>
              {accueil.fondateur.citation[2]}
            </blockquote>
            <p className="ac-texte">{accueil.fondateur.texte[0]}</p>
            <p className="ac-texte">{accueil.fondateur.texte[1]}</p>
            <p className="ac-signature">
              {accueil.fondateur.badgeNom}, {accueil.fondateur.badgeRole}
              <span>{accueil.fondateur.badgeCertifs}</span>
            </p>
            <Link href="/a-propos" className="ac-lien">
              {accueil.fondateur.lien}
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ 6 · FAQ */}
      <section className="ac-section ac-blanc" aria-labelledby="ac-faq">
        <div className="ac-wrap ac-faq">
          <div>
            <p className="ac-label">{accueil.faq.surtitre}</p>
            <Titre id="ac-faq" parts={accueil.faq.titre} className="ac-h2" />
          </div>
          <div className="ac-faq__liste">
            {faq.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- 7 · LA FIN : L'APPEL */}
      <section className="ac-fin" aria-labelledby="ac-fin">
        <div className="ac-fin__contenu" data-sc-in>
          <Titre id="ac-fin" parts={appel.titre} className="ac-h2 ac-fin__titre" />
          <p className="ac-texte">{appel.texte}</p>
          <div className="ac-actions ac-actions--centre">
            <Link href="/contact#appeler" className="ac-bouton">
              {cta.court}
            </Link>
            <Link href="/contact#ecrire" className="ac-lien">
              {cta.ecrire}
            </Link>
          </div>
          <p className="ac-fin__closer">{appel.closer}</p>
        </div>
      </section>
    </div>
  );
}
