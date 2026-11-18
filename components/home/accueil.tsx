"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { accueil, appel, cas, cta, faq, realisations, site, tri } from "@/content/site";
import "./accueil.css";

/*
  Accueil Kundxa : une seule scène plein écran (skill viz-scroll-craft).

  Valdo à contre-jour doré, l'engrenage du système derrière lui. Les tâches de la
  semaine flottent autour de lui, chacune à sa profondeur. Signature : le tri en
  profondeur. Au scroll, les tâches reculent une à une dans l'engrenage et
  disparaissent derrière lui ; trois décisions seulement s'avancent au premier
  plan. Transform, opacity et filter, sur une seule boucle rAF qui ne travaille
  que quand le scroll ou le pointeur bouge.
*/

const N = tri.taches.length;
const DECISIONS = tri.taches.map((t, i) => ("decision" in t ? i : -1)).filter((i) => i >= 0);
const ROUTINE = N - DECISIONS.length;

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smooth = (x: number) => {
  x = clamp01(x);
  return x * x * (3 - 2 * x);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Positions de repos [x, y, profondeur], en fractions de l'écran. Profondeur < 0,8 :
// derrière Valdo (petit, flou) ; > 1 : devant lui (grand, un peu flou).
// Les décisions (indices 4, 8, 13) sont au plan moyen, à gauche : elles s'avancent.
const REPOS_ECRAN: [number, number, number][] = [
  [0.66, 0.1, 0.62],
  [0.06, 0.15, 0.9],
  [0.86, 0.2, 0.6],
  [0.3, 0.1, 0.84],
  [0.17, 0.33, 0.95],
  [0.58, 0.28, 0.66],
  [0.9, 0.44, 0.64],
  [0.4, 0.27, 0.8],
  [0.03, 0.39, 0.92],
  [0.78, 0.64, 1.18],
  [0.6, 0.06, 0.7],
  [0.42, 0.45, 0.86],
  [0.86, 0.82, 1.24],
  [0.25, 0.2, 0.98],
  [0.6, 0.8, 1.12],
];
const REPOS_TEL: [number, number, number][] = [
  [0.5, 0.13, 0.62],
  [0.02, 0.13, 0.9],
  [0.68, 0.22, 0.6],
  [0.36, 0.19, 0.8],
  [0.04, 0.27, 0.94],
  [0.56, 0.3, 0.64],
  [0.62, 0.38, 0.66],
  [0.3, 0.33, 0.78],
  [0.08, 0.4, 0.92],
  [0.04, 0.53, 1.08],
  [0.22, 0.08, 0.7],
  [0.14, 0.47, 0.82],
  [0.5, 0.58, 1.12],
  [0.1, 0.2, 0.96],
  [0.78, 0.3, 0.62],
];

// Fenêtres de la timeline (progression p de l'acte épinglé, 0..1).
const T = { heroOut: [0.06, 0.14], tri: [0.18, 0.86], bilan: [0.87, 0.94] } as const;

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
  const racine = useRef<HTMLDivElement>(null);
  const acte = useRef<HTMLElement>(null);
  const engrenage = useRef<HTMLDivElement>(null);
  const cartes = useRef<(HTMLLIElement | null)[]>([]);
  const [faits, setFaits] = useState(0);
  const [recus, setRecus] = useState(0);
  const [question, setQuestion] = useState(0);

  useEffect(() => {
    const root = racine.current;
    const act = acte.current;
    const gear = engrenage.current;
    if (!root || !act || !gear) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    root.classList.add("ac--js");
    if (reduce) {
      root.classList.add("ac--reduce");
      setFaits(ROUTINE);
      setRecus(DECISIONS.length);
      return;
    }

    let w = 0, h = 0, mobile = false;
    let hauteurs: number[] = [];
    let largeur = 280;
    let cible = { x: 0, y: 0 };
    let mx = 0.5, my = 0.5;
    let raf = 0, sale = true;
    let dejaFaits = -1, dejaRecus = -1;

    const mesurer = () => {
      w = innerWidth;
      h = innerHeight;
      mobile = w < 860;
      largeur = cartes.current[0]?.offsetWidth ?? 280;
      hauteurs = cartes.current.map((c) => c?.offsetHeight ?? 64);
      // Le centre de l'engrenage : c'est là que le système avale les tâches.
      // Coordonnées dans la scène (offsetParent), indépendantes du scroll.
      cible = { x: gear.offsetLeft + gear.offsetWidth / 2, y: gear.offsetTop + gear.offsetHeight / 2 };
      sale = true;
    };

    const peindre = () => {
      raf = 0;
      if (!sale) return;
      sale = false;

      const r = act.getBoundingClientRect();
      const p = clamp01(-r.top / Math.max(1, r.height - h));
      const hero = smooth((p - T.heroOut[0]) / (T.heroOut[1] - T.heroOut[0]));
      const tp = clamp01((p - T.tri[0]) / (T.tri[1] - T.tri[0]));
      const bilan = smooth((p - T.bilan[0]) / (T.bilan[1] - T.bilan[0]));

      const st = root.style;
      st.setProperty("--hero", hero.toFixed(3));
      st.setProperty("--tri", tp.toFixed(3));
      st.setProperty("--bilan", bilan.toFixed(3));
      st.setProperty("--mx", mx.toFixed(3));
      st.setProperty("--my", my.toFixed(3));

      const repos = mobile ? REPOS_TEL : REPOS_ECRAN;
      const fenetre = 0.2;
      const trayX = mobile ? 16 : Math.max(24, w * 0.045);
      const trayY = mobile ? h * 0.55 : h * 0.27;
      let empile = 0;
      let nFaits = 0, nRecus = 0;

      for (let i = 0; i < N; i++) {
        const el = cartes.current[i];
        if (!el) continue;
        const [rx, ry, z] = repos[i];
        const estDecision = DECISIONS.includes(i);
        const t0 = (i / (N - 1)) * (1 - fenetre);
        const loc = clamp01((tp - t0) / fenetre);
        const a = smooth(loc);

        // au repos : parallaxe au pointeur selon la profondeur
        const px = (mx - 0.5) * (z - 0.85) * -70;
        const py = (my - 0.5) * (z - 0.85) * -40;
        const x0 = rx * w + px;
        const y0 = ry * h + py;
        const flouRepos = Math.abs(1 - z) * 7;

        let x: number, y: number, s: number, o = 1, flou: number, zi: number;
        if (estDecision) {
          const ty = trayY + empile;
          empile += hauteurs[i] + (mobile ? 8 : 12);
          x = lerp(x0, trayX, a);
          y = lerp(y0, ty, a);
          s = lerp(z, 1, a);
          flou = flouRepos * (1 - a);
          zi = loc > 0 ? 40 : 15;
          if (loc > 0.6) nRecus++;
          el.dataset.etat = loc > 0.35 ? "or" : "repos";
        } else {
          // la tâche recule vers l'engrenage, passe derrière Valdo et s'éteint
          x = lerp(x0, cible.x - (largeur * 0.12) / 2, a);
          y = lerp(y0, cible.y - (hauteurs[i] * 0.12) / 2, a);
          s = lerp(z, 0.12, a);
          flou = lerp(flouRepos, 6, a);
          o = 1 - smooth((loc - 0.55) / 0.45);
          zi = loc > 0.12 ? 4 : z < 0.8 ? 4 : z > 1 ? 30 : 15;
          if (loc >= 0.8) nFaits++;
          el.dataset.etat = loc > 0.02 ? "pris" : "repos";
        }

        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${s.toFixed(3)})`;
        el.style.opacity = o.toFixed(3);
        el.style.filter = flou > 0.4 ? `blur(${flou.toFixed(1)}px)` : "";
        el.style.zIndex = String(zi);
      }

      if (nFaits !== dejaFaits) {
        dejaFaits = nFaits;
        setFaits(nFaits);
      }
      if (nRecus !== dejaRecus) {
        dejaRecus = nRecus;
        setRecus(nRecus);
      }
    };

    const demander = () => {
      sale = true;
      if (!raf) raf = requestAnimationFrame(peindre);
    };
    const pointeur = (e: PointerEvent) => {
      mx = e.clientX / w;
      my = e.clientY / h;
      demander();
    };
    const redimensionner = () => {
      mesurer();
      demander();
    };

    mesurer();
    peindre();
    root.classList.add("ac--pret");
    addEventListener("scroll", demander, { passive: true });
    addEventListener("resize", redimensionner);
    if (fine) addEventListener("pointermove", pointeur, { passive: true });
    return () => {
      removeEventListener("scroll", demander);
      removeEventListener("resize", redimensionner);
      removeEventListener("pointermove", pointeur);
      cancelAnimationFrame(raf);
    };
  }, []);

  const s = accueil.systeme;

  return (
    <div ref={racine} className="ac">
      {/* ------------------------------------------------ 1-2 · LA SCÈNE ET LE TRI */}
      <section ref={acte} className="ac-tri" aria-labelledby="ac-h1">
        <div className="ac-scene">
          <div className="ac-plan ac-plan--fond">
            <picture>
              <source media="(max-width: 859px)" srcSet="/sc/hero-plate-m.webp" />
              <img src="/sc/hero-plate.webp" alt="" width={2400} height={1350} fetchPriority="high" />
            </picture>
          </div>
          <div ref={engrenage} className="ac-plan ac-plan--engrenage">
            <img src="/sc/gear.webp" alt="" width={900} height={900} />
          </div>
          <div className="ac-plan ac-plan--valdo">
            <img src="/sc/valdo.webp" alt="Valdo Mendy, fondateur de Kundxa" width={820} height={1232} fetchPriority="high" />
          </div>
          <div className="ac-plan ac-plan--maillons">
            <img src="/sc/links.webp" alt="" width={900} height={900} />
          </div>
          <div className="ac-voile" aria-hidden="true" />

          {/* Les tâches : une couche, chacune à sa profondeur */}
          <ol className="ac-taches" aria-label="Une semaine type">
            {tri.taches.map((t, i) => (
              <li
                key={t.t}
                ref={(el) => {
                  cartes.current[i] = el;
                }}
                className="tk"
                data-decision={"decision" in t ? "" : undefined}
                data-etat="repos"
              >
                <p className="tk__t">{t.t}</p>
                <p className="tk__d">
                  {"decision" in t ? <span className="tk__pour">Pour vous · </span> : null}
                  {t.d}
                </p>
              </li>
            ))}
          </ol>

          <div className="ac-copie">
            <p className="ac-label ac-label--or">{site.signature}</p>
            <Titre id="ac-h1" parts={tri.droite.titre} as="h1" className="ac-h1" />
            <p className="ac-sous">{tri.droite.texte}</p>
            <Link href="/contact#appeler" className="ac-bouton">
              {cta.court}
            </Link>
          </div>

          <p className="ac-plateau ac-label ac-label--or">
            {tri.droite.libelle} · {recus}
          </p>
          <Titre parts={tri.bilan} className="ac-bilan" />

          <div className="ac-compteur" aria-live="polite">
            <span className="ac-label">{tri.journal}</span>
            <span className="ac-compteur__n">
              <b>{faits}</b> / {ROUTINE} tâches prises
            </span>
          </div>
          <p className="ac-note">{tri.note}</p>
        </div>
      </section>

      {/* ------------------------------------------------- 3 · LE SYSTÈME RÉEL */}
      <section className="ac-section ac-papier" data-sc-act="flow" aria-labelledby="ac-systeme">
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
              <p className="ac-label ac-label--or">Ce qui vous revient</p>
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
      <section className="ac-section" aria-labelledby="ac-cas">
        <div className="ac-wrap ac-grille">
          <div>
            <p className="ac-label">{accueil.realisations.surtitre}</p>
            <Titre id="ac-cas" parts={accueil.realisations.titre} className="ac-h2" />
            <p className="ac-texte">{accueil.realisations.texte}</p>
          </div>
          <div>
            <p className="ac-label ac-label--or">{realisations.chezNous.surtitre}</p>
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
                <p className="ac-label ac-label--or">Ce qui revient au dirigeant</p>
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
      <section className="ac-section ac-papier" aria-labelledby="ac-limites">
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
          <div className="ac-fondateur">
            <figure className="ac-fondateur__photo" data-sc-in>
              <Image src={site.photo} alt={accueil.fondateur.badgeNom} width={820} height={1232} sizes="(max-width: 859px) 40vw, 15rem" />
            </figure>
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
      <section className="ac-section" aria-labelledby="ac-faq">
        <div className="ac-wrap ac-grille">
          <div>
            <p className="ac-label">{accueil.faq.surtitre}</p>
            <Titre id="ac-faq" parts={accueil.faq.titre} className="ac-h2" />
            <div className="ac-faq__questions" role="tablist" aria-orientation="vertical">
              {faq.map((f, i) => (
                <button
                  key={f.q}
                  type="button"
                  role="tab"
                  id={`q-${i}`}
                  aria-selected={question === i}
                  aria-controls="faq-reponse"
                  onClick={() => setQuestion(i)}
                  className="ac-faq__q"
                >
                  {f.q}
                </button>
              ))}
            </div>
            <div className="ac-faq__mobile">
              {faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.r}</p>
                </details>
              ))}
            </div>
          </div>
          <div id="faq-reponse" role="tabpanel" aria-labelledby={`q-${question}`} className="ac-faq__reponse">
            <p className="ac-label ac-label--or">Notre réponse</p>
            <p key={question} className="ac-faq__texte">
              {faq[question].r}
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- 7 · LA FIN : L'APPEL */}
      <section className="ac-fin" aria-labelledby="ac-fin">
        <img className="ac-fin__engrenage" src="/sc/gear.webp" alt="" width={900} height={900} loading="lazy" />
        <div className="ac-fin__contenu" data-sc-in>
          <Titre id="ac-fin" parts={appel.titre} className="ac-h2 ac-fin__titre" />
          <p className="ac-texte">{appel.texte}</p>
          <ul className="ac-fin__decisions" aria-label="Les trois décisions de la semaine">
            {DECISIONS.map((i) => (
              <li key={i}>{tri.taches[i].t}</li>
            ))}
          </ul>
          <div className="ac-fin__actions">
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
