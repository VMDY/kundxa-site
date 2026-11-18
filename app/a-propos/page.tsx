import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aPropos, cta, site } from "@/content/site";
import "./a-propos.css";

export const metadata: Metadata = {
  title: aPropos.meta.titre,
  description: aPropos.meta.description,
  alternates: { canonical: "/a-propos" },
};

/*
  Grammaire « typographic poster » : l'actif de cette page est une phrase. Les
  mots arrivent à des échelles très différentes ; aucune photo en fond, un seul
  portrait en petit dans le texte. La fin s'inverse : les plus petits caractères
  du site, l'appel en simple lien souligné.
*/
export default function APropos() {
  const { hero, parcours, valeurs, enBref, suite } = aPropos;
  return (
    <div className="ap">
      <header className="ap-une">
        <p className="ap-label">{hero.surtitre}</p>
        <h1 className="ap-h1">
          {hero.titre[0]}
          <em>{hero.titre[1]}</em>
          {hero.titre[2]}
        </h1>
        <p className="ap-chapeau">{hero.texte}</p>
      </header>

      {/* Le pic : la phrase du fondateur, tenue pendant le scroll */}
      <section className="ap-phrase" data-sc-act="pin" data-sc-span="2.4" aria-labelledby="ap-phrase">
        <div data-sc-stage className="ap-phrase__scene">
          <h2 id="ap-phrase" className="ap-phrase__titre">
            <span className="ap-phrase__a">
              <span data-sc-cue="0 1 0">Par nécessité,</span>
            </span>
            <span className="ap-phrase__b" data-sc-cue="0.3 1 0.42">
              pas par <em>curiosité</em>.
            </span>
          </h2>
        </div>
      </section>

      <section className="ap-parcours" aria-label={parcours.surtitre}>
        <p className="ap-label">{parcours.surtitre}</p>
        <div className="ap-parcours__corps">
          <figure className="ap-portrait" data-sc-in>
            <Image src={site.photo} alt="Valdo Mendy" width={820} height={1232} sizes="(max-width: 859px) 40vw, 14rem" />
            <figcaption>Valdo Mendy, fondateur</figcaption>
          </figure>
          <div className="ap-texte" data-sc-in data-sc-stagger="90">
            {parcours.texte.map((t) => (
              <p key={t.slice(0, 24)}>{t}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="ap-valeurs" aria-labelledby="ap-valeurs">
        <p className="ap-label">{valeurs.surtitre}</p>
        <h2 id="ap-valeurs" className="ap-h2">
          {valeurs.titre[0]}
          <em>{valeurs.titre[1]}</em>
          {valeurs.titre[2]}
        </h2>
        <ol className="ap-liste">
          {valeurs.items.map((v) => (
            <li key={v.numero} data-sc-in>
              <span className="ap-num">{v.numero}</span>
              <span className="ap-valeur">{v.titre}</span>
              <span className="ap-valeur__texte">{v.texte}</span>
            </li>
          ))}
        </ol>
      </section>

      <footer className="ap-fin">
        <dl className="ap-bref">
          {enBref.lignes.map(([cle, valeur]) => (
            <div key={cle}>
              <dt>{cle}</dt>
              <dd>{valeur}</dd>
            </div>
          ))}
        </dl>
        <p className="ap-suite">
          {suite.titre[0]}
          {suite.titre[1]}
          {suite.titre[2]} <Link href="/contact#appeler">{cta.court}</Link>
        </p>
      </footer>
    </div>
  );
}
