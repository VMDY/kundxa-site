"use client";

import { useEffect, useRef, useState } from "react";

// Index des objets du catalogue. Il suit le défilement latéral (l'objet le plus
// proche du centre est marqué) et il saute : un clic amène l'objet devant soi.

type Item = { id: string; libelle: string };

export function IndexCas({ titre, items }: { titre: string; items: Item[] }) {
  const nav = useRef<HTMLElement>(null);
  const [actif, setActif] = useState(items[0]?.id);

  useEffect(() => {
    let raf = 0;
    const suivre = () => {
      raf = 0;
      const centre = innerWidth / 2;
      let meilleur = items[0]?.id;
      let ecart = Infinity;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - centre);
        if (d < ecart) {
          ecart = d;
          meilleur = it.id;
        }
      }
      setActif(meilleur);
    };
    const demander = () => {
      if (!raf) raf = requestAnimationFrame(suivre);
    };
    suivre();
    addEventListener("scroll", demander, { passive: true });
    addEventListener("resize", demander);
    const stage = nav.current?.parentElement;
    stage?.addEventListener("scroll", demander, { passive: true });
    return () => {
      removeEventListener("scroll", demander);
      removeEventListener("resize", demander);
      stage?.removeEventListener("scroll", demander);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  const aller = (id: string) => {
    const el = document.getElementById(id);
    const acte = nav.current?.closest("section");
    const rail = el?.parentElement;
    if (!el || !acte || !rail) return;
    const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduit) {
      el.scrollIntoView({ inline: "center", block: "nearest" });
      return;
    }
    // Le moteur translate le rail de -(scrollWidth - largeur) * p : on inverse.
    const debord = rail.scrollWidth - innerWidth;
    const cible = Math.min(1, Math.max(0, (el.offsetLeft - (innerWidth - el.offsetWidth) / 2) / Math.max(1, debord)));
    const haut = acte.getBoundingClientRect().top + scrollY;
    scrollTo({ top: haut + cible * (acte.offsetHeight - innerHeight), behavior: "smooth" });
  };

  return (
    <nav ref={nav} className="rz-index" aria-label={titre}>
      <p className="rz-index__titre">{titre}</p>
      <ol>
        {items.map((it) => (
          <li key={it.id}>
            <button type="button" aria-current={actif === it.id ? "true" : undefined} onClick={() => aller(it.id)}>
              {it.libelle}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
