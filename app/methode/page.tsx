import type { Metadata } from "next";
import Link from "next/link";
import { cta, engagements, etapes, methode } from "@/content/site";
import "./methode.css";

export const metadata: Metadata = {
  title: methode.meta.titre,
  description: methode.meta.description,
  alternates: { canonical: "/methode" },
};

/*
  Grammaire « chaptered editorial » : une méthode se lit. Page de titre sans
  image, quatre chapitres qui changent de sol d'un coup, un folio dans la marge.
  Signature : le plan du système se dessine dans la marge, une couche par
  chapitre (la semaine relevée, les briques, le branchement sur le vrai flux avec
  ses garde-fous, la surveillance). Au colophon, le plan est complet.
*/

// Le plan, en quatre couches. Tracés en pathLength=1 : le CSS les dessine.
function Plan({ chapitre }: { chapitre: number }) {
  const jours = ["L", "M", "M", "J", "V"];
  return (
    <svg className="mt-plan" data-chapitre={chapitre} viewBox="0 0 300 420" role="img" aria-label="Plan du système, à l'étape de ce chapitre">
      {/* 1 · la semaine relevée : où part le temps, trois goulots cerclés */}
      <g className="mt-c mt-c1">
        {jours.map((j, x) =>
          [0, 1, 2, 3].map((y) => (
            <rect key={`${x}-${y}`} x={34 + x * 48} y={30 + y * 26} width="36" height="16" rx="2" pathLength={1} />
          )),
        )}
        {jours.map((j, x) => (
          <text key={`t${x}`} x={52 + x * 48} y={20} textAnchor="middle">
            {j}
          </text>
        ))}
        <circle cx="100" cy="64" r="22" pathLength={1} className="mt-fort" />
        <circle cx="196" cy="90" r="22" pathLength={1} className="mt-fort" />
        <circle cx="244" cy="38" r="22" pathLength={1} className="mt-fort" />
      </g>
      {/* 2 · les briques, reliées */}
      <g className="mt-c mt-c2">
        <rect x="40" y="160" width="88" height="34" rx="4" pathLength={1} />
        <rect x="172" y="160" width="88" height="34" rx="4" pathLength={1} />
        <rect x="40" y="226" width="88" height="34" rx="4" pathLength={1} />
        <rect x="172" y="226" width="88" height="34" rx="4" pathLength={1} />
        <path d="M128 177 H172 M216 194 V210 H84 V226 M128 243 H172" pathLength={1} />
        <path d="M100 64 L84 160 M196 90 L216 160" pathLength={1} className="mt-fin" />
      </g>
      {/* 3 · branché sur le vrai flux, garde-fous aux étapes sensibles */}
      <g className="mt-c mt-c3">
        <path d="M216 260 V300 H150 V330" pathLength={1} />
        <path d="M150 318 l10 10 -10 10 -10 -10 z" pathLength={1} className="mt-fort" />
        <path d="M84 260 V300 H150" pathLength={1} />
        <rect x="96" y="344" width="108" height="34" rx="4" pathLength={1} className="mt-fort" />
        <text x="150" y="366" textAnchor="middle">
          résumé du matin
        </text>
      </g>
      {/* 4 · surveillé : le pouls, et la boucle qui revient à la semaine */}
      <g className="mt-c mt-c4">
        <path d="M20 400 H90 l8 -14 8 26 8 -22 8 10 H210 l8 -14 8 26 8 -22 8 10 H284" pathLength={1} />
        <path d="M284 400 V8 H20 V30" pathLength={1} className="mt-fin" />
      </g>
    </svg>
  );
}

export default function Methode() {
  const { colonnes } = methode;
  return (
    <div className="mt">
      {/* Page de titre : du texte sur le papier, aucune image */}
      <header className="mt-titre">
        <p className="mt-folio">Méthode · Kundxa</p>
        <h1 className="mt-h1">
          {methode.hero.titre[0]}
          <em>{methode.hero.titre[1]}</em>
          {methode.hero.titre[2]}
        </h1>
        <p className="mt-chapeau">{methode.hero.texte}</p>
        <ol className="mt-sommaire" aria-label="Chapitres">
          {etapes.map((e) => (
            <li key={e.numero}>
              <a href={`#chapitre-${e.numero}`}>
                <span>{e.numero}</span> {e.titre}
              </a>
            </li>
          ))}
        </ol>
      </header>

      {etapes.map((e, i) => (
        <section
          key={e.numero}
          id={`chapitre-${e.numero}`}
          className={`mt-chapitre ${i % 2 ? "mt-chapitre--nuit" : ""}`}
          data-sc-act="flow"
          aria-labelledby={`ch-${e.numero}`}
        >
          <aside className="mt-marge">
            <p className="mt-folio">
              Chapitre {e.numero} · {e.titre}
            </p>
            <Plan chapitre={i + 1} />
          </aside>
          <div className="mt-corps">
            <h2 id={`ch-${e.numero}`} className="mt-h2">
              <em>{e.titre}</em>.
            </h2>
            <p className="mt-lede" data-sc-in>
              {e.court}
            </p>
            <dl className="mt-planche" data-sc-in data-sc-stagger="70">
              <div>
                <dt>{colonnes.nousFaisons}</dt>
                <dd>{e.nousFaisons}</dd>
              </div>
              <div>
                <dt>{colonnes.vousFaites}</dt>
                <dd>{e.vousFaites}</dd>
              </div>
              <div className="mt-recevez">
                <dt>{colonnes.vousRecevez}</dt>
                <dd>{e.vousRecevez}</dd>
              </div>
            </dl>
          </div>
        </section>
      ))}

      {/* Colophon : petits caractères, l'appel en ligne de texte */}
      <footer className="mt-colophon" aria-labelledby="colophon">
        <div className="mt-colophon__plan">
          <Plan chapitre={5} />
        </div>
        <div>
          <h2 id="colophon" className="mt-folio">
            Colophon
          </h2>
          <p className="mt-colophon__intro">
            {methode.principes.titre[0]}
            <em>{methode.principes.titre[1]}</em>
            {methode.principes.titre[2]}
          </p>
          <ol className="mt-regles">
            {methode.principes.items.map((p) => (
              <li key={p.titre}>
                <strong>{p.titre}.</strong> {p.texte}
              </li>
            ))}
          </ol>
          <p className="mt-folio mt-folio--espace">{methode.outils.surtitre}</p>
          <ul className="mt-outils">
            {methode.outils.items.map((o) => (
              <li key={o.nom}>
                <strong>{o.nom}</strong> {o.texte}
              </li>
            ))}
          </ul>
          <p className="mt-folio mt-folio--espace">{engagements.surtitre}</p>
          <ul className="mt-outils">
            {engagements.items.map((it) => (
              <li key={it.titre}>
                <strong>{it.titre}</strong> {it.note}
              </li>
            ))}
          </ul>
          <p className="mt-suite">
            Pour commencer par votre semaine à vous :{" "}
            <Link href="/contact#appeler">{cta.court.toLowerCase()}</Link>.
          </p>
        </div>
      </footer>
    </div>
  );
}
