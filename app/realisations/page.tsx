import type { Metadata } from "next";
import Link from "next/link";
import { IndexCas } from "@/components/realisations/index-cas";
import { cas, cta, realisations, site } from "@/content/site";
import "./realisations.css";

export const metadata: Metadata = {
  title: realisations.meta.titre,
  description: realisations.meta.description,
  alternates: { canonical: "/realisations" },
};

/*
  Grammaire « gallery / catalog » : une collection qu'on parcourt de côté. Chaque
  objet porte la même étiquette (situation, système, ce qui revient) ; c'est le
  schéma qui fait la collection. La fin est un objet de plus, typographié comme
  les autres : le vôtre.
*/

type Objet = {
  id: string;
  numero: string;
  surtitre: string;
  titre: string;
  image?: string;
  situation: string;
  systeme: React.ReactNode;
  revient: string;
};

export default function Realisations() {
  const { libelles, catalogue, chezNous } = realisations;

  const objets: Objet[] = [
    ...cas.map((c, i) => ({
      id: c.slug,
      numero: String(i + 1).padStart(2, "0"),
      surtitre: c.surtitre,
      titre: c.titre,
      image: c.image,
      situation: c.situation,
      systeme: c.systeme,
      revient: c.revient,
    })),
    {
      id: "chez-nous",
      numero: String(cas.length + 1).padStart(2, "0"),
      surtitre: catalogue.chezNous.surtitre,
      titre: catalogue.chezNous.titre,
      image: "/images/3d/chaine.webp",
      situation: catalogue.chezNous.situation,
      systeme: (
        <ul className="rz-liste">
          {chezNous.items.map((it) => (
            <li key={it.titre}>
              <strong>{it.titre}</strong> {it.texte}
            </li>
          ))}
        </ul>
      ),
      revient: catalogue.chezNous.revient,
    },
  ];

  return (
    <div className="rz">
      <section className="rz-acte" data-sc-act="pan" data-sc-span="5.4" aria-labelledby="rz-h1">
        <div data-sc-stage className="rz-scene">
          <div className="rz-rail" data-sc-pan="0">
            <div className="rz-tete">
              <p className="rz-label">{realisations.hero.surtitre}</p>
              <h1 id="rz-h1" className="rz-h1">
                {realisations.hero.titre[0]}
                <em>{realisations.hero.titre[1]}</em>
                {realisations.hero.titre[2]}
              </h1>
              <p className="rz-texte">{realisations.hero.texte}</p>
            </div>

            {objets.map((o) => (
              <article key={o.id} id={o.id} className="rz-objet" aria-labelledby={`${o.id}-t`}>
                {o.image && (
                  <div className="rz-objet__image" data-sc-tilt="4">
                    <img src={o.image} alt="" width={933} height={1400} loading="lazy" />
                  </div>
                )}
                <div className="rz-etiquette">
                  <p className="rz-label rz-label--or">
                    Cas {o.numero} · {o.surtitre}
                  </p>
                  <h2 id={`${o.id}-t`} className="rz-h2">
                    {o.titre}
                  </h2>
                  <dl>
                    <div>
                      <dt>{libelles.situation}</dt>
                      <dd>{o.situation}</dd>
                    </div>
                    <div>
                      <dt>{libelles.systeme}</dt>
                      <dd>{o.systeme}</dd>
                    </div>
                    <div className="rz-revient">
                      <dt>{libelles.revient}</dt>
                      <dd>{o.revient}</dd>
                    </div>
                  </dl>
                  {o.id === "chez-nous" && (
                    <a href={site.videoRelance} target="_blank" rel="noopener noreferrer" className="rz-lien">
                      {chezNous.items[0].lien}
                    </a>
                  )}
                </div>
              </article>
            ))}

            {/* La fin : un objet de plus, avec la même étiquette. */}
            <article id="votre-cas" className="rz-objet rz-objet--vous" aria-labelledby="votre-cas-t">
              <div className="rz-etiquette">
                <p className="rz-label rz-label--or">
                  Cas {String(objets.length + 1).padStart(2, "0")} · {catalogue.vous.surtitre.split(" · ")[1]}
                </p>
                <h2 id="votre-cas-t" className="rz-h2">
                  {catalogue.vous.titre}
                </h2>
                <dl>
                  <div>
                    <dt>{libelles.situation}</dt>
                    <dd>{catalogue.vous.situation}</dd>
                  </div>
                  <div>
                    <dt>{libelles.systeme}</dt>
                    <dd>{catalogue.vous.systeme}</dd>
                  </div>
                  <div className="rz-revient">
                    <dt>{libelles.revient}</dt>
                    <dd>{catalogue.vous.revient}</dd>
                  </div>
                </dl>
                <Link href="/contact#appeler" className="rz-bouton">
                  {cta.court}
                </Link>
              </div>
            </article>
          </div>

          <IndexCas
            titre={catalogue.index}
            items={[
              ...objets.map((o) => ({ id: o.id, libelle: `${o.numero} · ${o.surtitre.split(" · ")[0]}` })),
              { id: "votre-cas", libelle: `${String(objets.length + 1).padStart(2, "0")} · Votre boîte` },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
