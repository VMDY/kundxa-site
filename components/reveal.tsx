"use client";

import { useEffect, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Moteur d'animation du site.
 *
 * Le MASQUAGE (`.js-reveal` sur <html>) est pose par un script bloquant dans le
 * <head> (voir app/layout.tsx), donc AVANT le premier paint : pas de flash de
 * contenu (FOUC), et l'etat ne depend pas du timing d'un effet React.
 * Sous `prefers-reduced-motion`, ce script n'ajoute pas la classe -> la page
 * s'affiche directement, sans animation.
 *
 * Ce composant ne gere que la REVELATION :
 *  - IntersectionObserver : chaque bloc recoit `is-visible` en entrant a l'ecran.
 *  - Le setup passe par requestAnimationFrame pour que les blocs deja visibles
 *    au chargement soient peints masques AVANT d'etre reveles -> la transition joue.
 *  - `bottom < 0` : un bloc qui saute au-dessus du viewport (scroll rapide, ancre)
 *    est revele quand meme, sinon il ne croiserait jamais le seuil.
 *  - Filet de securite : balayage toutes les 2s qui revele les blocs masques
 *    presents dans le viewport. Les blocs hors ecran gardent leur animation.
 */
export function RevealProvider() {
  useEffect(() => {
    const root = document.documentElement;
    // Pas de masquage pose (reduced-motion, ou pas de JS au chargement) : rien a faire.
    if (!root.classList.contains("js-reveal")) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    const setup = () =>
      root
        .querySelectorAll("[data-reveal]:not(.is-visible)")
        .forEach((el) => observer.observe(el));

    // Appel synchrone (pas de rAF) : l'etat masque a deja ete peint par le script
    // <head> avant l'hydratation, donc observer maintenant laisse la transition
    // jouer. Et surtout, l'IntersectionObserver fonctionne meme dans un onglet en
    // arriere-plan, la ou requestAnimationFrame est gele.
    setup();

    // Contenu injecte apres coup (facade Cal.com remplacee par l'iframe, etc.).
    const mutation = new MutationObserver(setup);
    mutation.observe(document.body, { childList: true, subtree: true });

    // Filet de securite : toutes les 2s, revele tout bloc masque situe dans le
    // viewport OU au-dessus (deja depasse). Indispensable : un saut de scroll
    // plus grand que le viewport (flick mobile, PgDn, ancre) fait passer un bloc
    // de "sous l'ecran" a "au-dessus" sans AUCUN callback IO — le ratio reste a 0,
    // aucun seuil n'est franchi. Seuls les blocs encore sous l'ecran sont
    // laisses masques : eux gardent leur animation d'entree au scroll.
    const failsafe = window.setInterval(() => {
      root.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      });
    }, 2000);

    return () => {
      observer.disconnect();
      mutation.disconnect();
      window.clearInterval(failsafe);
    };
  }, []);

  return null;
}

/**
 * Enveloppe un bloc a reveler. `delay` sert au stagger dans les grilles :
 * on passe l'index * 60ms pour que les cartes entrent l'une apres l'autre.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      data-reveal=""
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
