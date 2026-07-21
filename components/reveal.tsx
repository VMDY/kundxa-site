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

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    const observe = () =>
      root.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => observer.observe(el));

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
