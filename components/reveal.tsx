"use client";

import { useEffect, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Moteur d'animation du site. Un seul IntersectionObserver pour toute la page :
 * chaque element porteur de [data-reveal] recoit `is-visible` en entrant dans le
 * viewport, puis n'est plus observe (l'animation ne joue qu'une fois).
 *
 * Degradation : la classe `js-reveal` est posee sur <html> par ce composant. Le CSS
 * ne masque les elements QUE sous cette classe -> sans JS, la page reste lisible.
 */
export function RevealProvider() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      root.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    root.classList.add("js-reveal");

    const reveler = (el: Element) => {
      el.classList.add("is-visible");
      observer.unobserve(el);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Cas normal : l'element entre dans le viewport.
          if (entry.isIntersecting) {
            reveler(entry.target);
            continue;
          }
          // Filet de securite : sur un scroll qui saute (molette rapide, Page bas,
          // touche Fin, arrivee directe sur une ancre), un bloc peut passer de
          // « sous le viewport » a « au-dessus » sans jamais croiser le seuil.
          // Sans ce cas, il resterait invisible pour toujours.
          if (entry.boundingClientRect.bottom < 0) reveler(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    const observe = () =>
      root.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => {
        // Deja au-dessus du viewport au moment ou on l'observe (chargement sur une
        // ancre, restauration de scroll) : on le montre sans animation.
        if (el.getBoundingClientRect().bottom < 0) el.classList.add("is-visible");
        else observer.observe(el);
      });

    observe();

    // Le contenu injecte apres coup (embed Cal.com) doit lui aussi etre pris en compte.
    const mutation = new MutationObserver(observe);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
      root.classList.remove("js-reveal");
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
