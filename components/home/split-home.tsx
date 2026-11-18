"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { accueil, appel, cas, cta, faq, realisations, site, tri } from "@/content/site";
import "./split-home.css";

/*
  Accueil Kundxa : grammaire « split stage » (skill viz-scroll-craft).

  Deux colonnes tenues toute la page : à gauche, la semaine (fond papier) ; à
  droite, ce qui mérite un dirigeant (fond midnight). La ligne entre les deux est
  le seul chrome. Signature : le tri. La semaine défile vers la ligne, le système
  la prend, seules trois décisions la traversent. À la fin, la ligne glisse au
  bord et la colonne du dirigeant prend toute la largeur.

  Tout le mouvement passe par transform, opacity et clip-path, sur une seule
  boucle rAF qui ne travaille que quand le scroll ou le pointeur bouge.
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

// Fenêtres de la timeline du tri (progression p de l'acte épinglé, 0..1).
const T = { heroOut: [0.07, 0.15], tri: [0.2, 0.86], bilan: [0.87, 0.94] } as const;
const SPLIT_REPOS = 0.5;
const SPLIT_FIN = 0.42;

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

export function SplitHome() {
  const racine = useRef<HTMLDivElement>(null);
  const acteTri = useRef<HTMLElement>(null);
  const acteFin = useRef<HTMLElement>(null);
  const cartes = useRef<(HTMLLIElement | null)[]>([]);
  const [faits, setFaits] = useState(0);
  const [dernier, setDernier] = useState("");
  const [recus, setRecus] = useState(0);
  const [question, setQuestion] = useState(0);

  useEffect(() => {
    const root = racine.current;
    const act = acteTri.current;
    const fin = acteFin.current;
    if (!root || !act || !fin) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    root.classList.add("hs--js");
    if (reduce) {
      root.classList.add("hs--reduce");
      setFaits(ROUTINE);
      setDernier(tri.taches[N - 1].t);
      setRecus(DECISIONS.length);
      return;
    }

    let w = 0, h = 0, mobile = false;
    let cw = 0, ch = 0;
    let hauteurs: number[] = [];
    let repos: { x: number; y: number; s: number; flou: number }[] = [];
    let mx = 0, my = 0;
    let raf = 0, sale = true;
    let dejaFaits = -1, dejaRecus = -1;

    const mesurer = () => {
      w = innerWidth;
      h = innerHeight;
      mobile = w < 860;
      const c0 = cartes.current[0];
      cw = c0 ? c0.offsetWidth : 260;
      ch = c0 ? c0.offsetHeight : 64;
      hauteurs = cartes.current.map((c) => (c ? c.offsetHeight : ch));
      // Positions de repos : un paquet de feuilles en profondeur, côté semaine.
      repos = tri.taches.map((_, i) => {
        const couloir = i % 3;
        const rang = Math.floor(i / 3);
        const prof = [1, 0.88, 0.94][(i * 7) % 3];
        if (mobile) {
          const x0 = 16, x1 = w - 16 - cw;
          const y0 = Math.max(h * 0.255, 186), y1 = Math.max(y0 + 8, h * 0.44 - ch);
          return {
            x: lerp(x0, x1, ((i * 37) % 100) / 100),
            y: lerp(y0, y1, ((i * 53) % 100) / 100),
            s: prof * 0.92,
            flou: (1 - prof) * 14,
          };
        }
        const x0 = Math.max(24, w * 0.035), x1 = w * SPLIT_REPOS - 40 - cw;
        const y0 = h * 0.4, y1 = h * 0.9 - ch;
        return {
          x: lerp(x0, x1, couloir / 2) + (rang % 2) * 18,
          y: lerp(y0, y1, rang / 4) + couloir * 14,
          s: prof,
          flou: (1 - prof) * 16,
        };
      });
      sale = true;
    };

    const peindre = () => {
      raf = 0;
      if (!sale) return;
      sale = false;

      // --- progression de l'acte du tri et de l'acte final
      const r = act.getBoundingClientRect();
      const p = clamp01(-r.top / Math.max(1, r.height - h));
      const rf = fin.getBoundingClientRect();
      const pf = clamp01(-rf.top / Math.max(1, rf.height - h));

      const hero = smooth((p - T.heroOut[0]) / (T.heroOut[1] - T.heroOut[0]));
      const tp = clamp01((p - T.tri[0]) / (T.tri[1] - T.tri[0]));
      const bilan = smooth((p - T.bilan[0]) / (T.bilan[1] - T.bilan[0]));
      const fermeture = smooth(pf / 0.7);

      let split = lerp(SPLIT_REPOS, SPLIT_FIN, smooth(tp));
      if (rf.top < h) split = lerp(SPLIT_FIN, 0, fermeture);
      const splitMobile = 0.46;

      const st = root.style;
      st.setProperty("--split", String(split));
      st.setProperty("--hero", String(hero));
      st.setProperty("--bilan", String(bilan));
      st.setProperty("--tri", String(tp));
      st.setProperty("--ferme", String(fermeture));
      st.setProperty("--mx", mx.toFixed(3));
      st.setProperty("--my", my.toFixed(3));
      root.classList.toggle("hs--apres", p >= 1 && rf.top > h * 0.35);
      root.classList.toggle("hs--pendant", p > 0 && p < 1);
      root.classList.toggle("hs--ligne", rf.bottom > h * 0.6);

      // --- cartes
      const ligneX = w * split;
      const ligneY = h * splitMobile;
      const fenetre = 0.2;
      let nFaits = 0, nRecus = 0, dernierFait = -1;
      let empile = 0;
      for (let i = 0; i < N; i++) {
        const el = cartes.current[i];
        if (!el) continue;
        const rp = repos[i];
        const estDecision = DECISIONS.includes(i);
        const t0 = (i / (N - 1)) * (1 - fenetre);
        const loc = clamp01((tp - t0) / fenetre);
        const a = smooth(loc / 0.55);
        const b = smooth((loc - 0.55) / 0.45);

        // au repos : léger parallaxe au pointeur, plus fort pour les cartes proches
        const px = (mx - 0.5) * 22 * rp.s * (1 - a);
        const py = (my - 0.5) * 14 * rp.s * (1 - a);

        let x: number, y: number;
        if (mobile) {
          x = lerp(rp.x, rp.x * 0.35 + 16, a);
          y = lerp(rp.y, ligneY - ch - 10, a);
        } else {
          x = lerp(rp.x, ligneX - cw - 18, a);
          y = rp.y;
        }
        let s = lerp(rp.s, 1, a);
        let o = 1;
        const flou = rp.flou * (1 - a);

        if (estDecision) {
          const tx = mobile ? 16 : w * SPLIT_REPOS + 48;
          const ty = (mobile ? h * 0.5 + 22 : h * 0.3) + empile;
          empile += hauteurs[i] + (mobile ? 8 : 12);
          x = lerp(x, tx, b);
          y = lerp(y, ty, b);
          if (loc > 0.55) nRecus++;
          el.dataset.etat = loc > 0.5 ? "or" : loc > 0 ? "file" : "repos";
        } else {
          const lx = mobile ? 16 : Math.max(24, w * 0.035);
          const ly = mobile ? ligneY - ch * 0.6 : h - ch - 26;
          x = lerp(x, lx, b);
          y = lerp(y, ly, b);
          s = lerp(s, 0.5, b);
          o = 1 - b;
          if (loc >= 0.75) {
            nFaits++;
            dernierFait = i;
          }
          el.dataset.etat = loc > 0.45 ? "fait" : loc > 0 ? "file" : "repos";
        }

        el.style.transform = `translate3d(${(x + px).toFixed(1)}px, ${(y + py).toFixed(1)}px, 0) scale(${s.toFixed(3)})`;
        el.style.opacity = o.toFixed(3);
        el.style.filter = flou > 0.3 ? `blur(${flou.toFixed(1)}px)` : "";
        el.style.zIndex = String(estDecision && loc > 0.5 ? 40 : Math.round(rp.s * 20));
      }

      if (nFaits !== dejaFaits) {
        dejaFaits = nFaits;
        setFaits(nFaits);
        setDernier(dernierFait >= 0 ? tri.taches[dernierFait].t : "");
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

    mesurer();
    peindre();
    root.classList.add("hs--pret");
    addEventListener("scroll", demander, { passive: true });
    addEventListener("resize", () => {
      mesurer();
      demander();
    });
    if (fine) addEventListener("pointermove", pointeur, { passive: true });
    return () => {
      removeEventListener("scroll", demander);
      removeEventListener("pointermove", pointeur);
      cancelAnimationFrame(raf);
    };
  }, []);

  const s = accueil.systeme;

  return (
    <div ref={racine} className="hs">
      {/* La ligne : le seul chrome de la page. Elle porte les deux libellés. */}
      <div className="hs-ligne" aria-hidden="true">
        <span className="hs-ligne__gauche">Le système s&apos;en charge</span>
        <span className="hs-ligne__droite">{tri.droite.libelle}</span>
      </div>

      {/* ---------------------------------------------------------- 1-2 · LE TRI */}
      <section ref={acteTri} className="hs-tri" aria-labelledby="hs-h1">
        <div className="hs-scene">
          {/* Côté semaine */}
          <div className="hs-gauche">
            <div className="hs-gauche__copie">
              <p className="hs-label">{tri.gauche.libelle}</p>
              <Titre parts={tri.gauche.titre} className="hs-gauche__titre" />
            </div>
            <div className="hs-journal" aria-live="polite">
              <p className="hs-label">{tri.journal}</p>
              <p className="hs-journal__compte">
                <span>{faits}</span> / {ROUTINE} tâches faites
              </p>
              <p className="hs-journal__dernier">{dernier}</p>
            </div>
            <p className="hs-note">{tri.note}</p>
          </div>

          {/* Côté dirigeant : plans indépendants, du fond au premier plan */}
          <div className="hs-droite">
            <div className="hs-plan hs-plan--fond">
              <picture>
                <source media="(max-width: 859px)" srcSet="/sc/hero-plate-m.webp" />
                <img src="/sc/hero-plate.webp" alt="" width={2400} height={1350} fetchPriority="high" />
              </picture>
            </div>
            <div className="hs-plan hs-plan--engrenage">
              <img src="/sc/gear.webp" alt="" width={900} height={900} />
            </div>
            <div className="hs-plan hs-plan--valdo">
              <img src="/sc/valdo.webp" alt="Valdo Mendy, fondateur de Kundxa" width={820} height={1232} fetchPriority="high" />
            </div>
            <div className="hs-plan hs-plan--maillons">
              <img src="/sc/links.webp" alt="" width={900} height={900} />
            </div>
            <div className="hs-voile" aria-hidden="true" />

            <div className="hs-copie">
              <p className="hs-label hs-label--or">{site.signature}</p>
              <Titre id="hs-h1" parts={tri.droite.titre} as="h1" className="hs-h1" />
              <p className="hs-sous">{tri.droite.texte}</p>
              <Link href="/contact#appeler" className="hs-bouton">
                {cta.court}
              </Link>
            </div>

            <div className="hs-plateau">
              <p className="hs-label hs-label--or">
                {tri.droite.libelle} · {recus}
              </p>
              {recus === 0 && <p className="hs-plateau__vide">{tri.plateauVide}</p>}
            </div>
            <Titre parts={tri.bilan} className="hs-bilan" />
          </div>

          {/* Les tâches : une seule couche au-dessus des deux colonnes */}
          <ol className="hs-taches" aria-label="Une semaine type">
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
                  {"decision" in t ? <span className="tk__pour">Décision de dirigeant · </span> : null}
                  {t.d}
                </p>
                <span className="tk__tampon" aria-hidden="true">
                  Fait par le système
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------- 3 · LE SYSTÈME RÉEL */}
      <section className="hs-flux hs-systeme" data-sc-act="flow" aria-labelledby="hs-systeme">
        <div className="hs-col hs-col--g">
          <p className="hs-label">{s.surtitre}</p>
          <Titre id="hs-systeme" parts={s.titre} className="hs-h2" />
          <p className="hs-texte">
            {s.texte}{" "}
            <a href={s.source.href} target="_blank" rel="noopener noreferrer" className="hs-source">
              {s.source.libelle}
            </a>
          </p>
          <ol className="hs-paliers">
            <svg className="hs-paliers__trait" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1="1" y1="0" x2="1" y2="100" pathLength={1} />
            </svg>
            {s.schema.noeuds.slice(0, 5).map((n) => (
              <li key={n.id} data-sc-in>
                <span className="hs-paliers__cle">{n.cle}</span>
                <span className="hs-paliers__texte">{n.texte}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="hs-col hs-col--d">
          <div className="hs-colle">
          <div className="hs-retour" data-sc-in>
            <p className="hs-label hs-label--or">Ce qui vous revient</p>
            <p className="hs-retour__titre">{s.schema.noeuds[5].texte}</p>
            <p className="hs-retour__cle">{s.schema.noeuds[5].cle}</p>
          </div>
          <dl className="hs-faits" data-sc-in data-sc-stagger="70">
            {s.faits.map((f) => (
              <div key={f.cle}>
                <dt>{f.cle}</dt>
                <dd>{f.texte}</dd>
              </div>
            ))}
          </dl>
          <a href={site.videoRelance} target="_blank" rel="noopener noreferrer" className="hs-lien">
            {s.video}
          </a>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- 4 · RÉALISATIONS */}
      <section className="hs-flux hs-cas" aria-labelledby="hs-cas">
        <div className="hs-col hs-col--g hs-cas__tete">
          <p className="hs-label">{accueil.realisations.surtitre}</p>
          <Titre id="hs-cas" parts={accueil.realisations.titre} className="hs-h2" />
          <p className="hs-texte">{accueil.realisations.texte}</p>
        </div>
        <div className="hs-col hs-col--d hs-cas__tete hs-cas__tete--d">
          <p className="hs-label hs-label--or">{realisations.chezNous.surtitre}</p>
          <ul className="hs-chez" data-sc-in data-sc-stagger="60">
            {realisations.chezNous.items.map((it) => (
              <li key={it.titre}>
                <span>{it.titre}</span> {it.texte}
              </li>
            ))}
          </ul>
        </div>
        {cas.map((c) => (
          <article key={c.slug} className="hs-cas__ligne">
            <div className="hs-col hs-col--g" data-sc-in>
              <p className="hs-label">{c.surtitre}</p>
              <h3 className="hs-h3">{c.titre}</h3>
              <p className="hs-texte hs-texte--court">{c.systeme}</p>
            </div>
            <div className="hs-col hs-col--d hs-cas__droite" data-sc-in>
              <img src={c.image} alt="" width={933} height={1400} loading="lazy" className="hs-cas__img" />
              <div>
                <p className="hs-label hs-label--or">Ce qui revient au dirigeant</p>
                <p className="hs-cas__revient">{c.revient}</p>
              </div>
            </div>
          </article>
        ))}
        <div className="hs-col hs-col--g" />
        <div className="hs-col hs-col--d">
          <Link href="/realisations" className="hs-lien">
            {accueil.realisations.lien}
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------ 5 · LIMITES + FONDATEUR */}
      <section className="hs-flux hs-limites" aria-labelledby="hs-limites">
        <div className="hs-col hs-col--g">
          <div className="hs-colle">
          <p className="hs-label">{accueil.limites.surtitre}</p>
          <Titre id="hs-limites" parts={accueil.limites.titre} className="hs-h2" />
          <ul className="hs-limites__liste" data-sc-in data-sc-stagger="80">
            {accueil.limites.items.map((it) => (
              <li key={it.titre}>
                <p className="hs-limites__titre">{it.titre}</p>
                <p className="hs-texte hs-texte--court">{it.texte}</p>
              </li>
            ))}
          </ul>
          </div>
        </div>
        <div className="hs-col hs-col--d hs-fondateur">
          <figure className="hs-fondateur__photo" data-sc-in>
            <Image src={site.photo} alt={accueil.fondateur.badgeNom} width={820} height={1232} sizes="(max-width: 859px) 40vw, 18vw" />
          </figure>
          <blockquote className="hs-citation" data-sc-in>
            {accueil.fondateur.citation[0]}
            <em>{accueil.fondateur.citation[1]}</em>
            {accueil.fondateur.citation[2]}
          </blockquote>
          <p className="hs-texte hs-texte--sombre">{accueil.fondateur.texte[0]}</p>
          <p className="hs-texte hs-texte--sombre">{accueil.fondateur.texte[1]}</p>
          <p className="hs-signature">
            {accueil.fondateur.badgeNom}, {accueil.fondateur.badgeRole}
            <span>{accueil.fondateur.badgeCertifs}</span>
          </p>
          <Link href="/a-propos" className="hs-lien">
            {accueil.fondateur.lien}
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------ 6 · FAQ */}
      <section className="hs-flux hs-faq" aria-labelledby="hs-faq">
        <div className="hs-col hs-col--g">
          <p className="hs-label">{accueil.faq.surtitre}</p>
          <Titre id="hs-faq" parts={accueil.faq.titre} className="hs-h2" />
          <div className="hs-faq__questions" role="tablist" aria-orientation="vertical">
            {faq.map((f, i) => (
              <button
                key={f.q}
                type="button"
                role="tab"
                id={`q-${i}`}
                aria-selected={question === i}
                aria-controls="faq-reponse"
                onClick={() => setQuestion(i)}
                className="hs-faq__q"
              >
                {f.q}
              </button>
            ))}
          </div>
          {/* Sur téléphone, les réponses suivent chaque question (details natifs). */}
          <div className="hs-faq__mobile">
            {faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.r}</p>
              </details>
            ))}
          </div>
        </div>
        <div className="hs-col hs-col--d">
          <div id="faq-reponse" role="tabpanel" aria-labelledby={`q-${question}`} className="hs-faq__reponse">
            <p className="hs-label hs-label--or">Notre réponse</p>
            <p key={question} className="hs-faq__texte">
              {faq[question].r}
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------- 7 · LA FIN : LA LIGNE CÈDE */}
      <section ref={acteFin} className="hs-fin" aria-labelledby="hs-fin">
        <div className="hs-fin__scene">
          <div className="hs-fin__papier">
            <p className="hs-label">{tri.journal}</p>
            <ul>
              {tri.taches
                .filter((t) => !("decision" in t))
                .map((t) => (
                  <li key={t.t}>{t.t}</li>
                ))}
            </ul>
          </div>
          <div className="hs-fin__contenu">
            <Titre id="hs-fin" parts={appel.titre} className="hs-h2 hs-fin__titre" />
            <p className="hs-texte hs-texte--sombre">{appel.texte}</p>
            <ul className="hs-fin__decisions" aria-label="Les trois décisions de la semaine">
              {DECISIONS.map((i) => (
                <li key={i}>{tri.taches[i].t}</li>
              ))}
            </ul>
            <div className="hs-fin__actions">
              <Link href="/contact#appeler" className="hs-bouton">
                {cta.court}
              </Link>
              <Link href="/contact#ecrire" className="hs-lien hs-lien--clair">
                {cta.ecrire}
              </Link>
            </div>
            <p className="hs-fin__closer">{appel.closer}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
