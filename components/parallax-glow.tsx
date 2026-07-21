"use client";

import { useEffect, useRef } from "react";

/**
 * Halo dore + trame de points du hero, en parallaxe legere.
 * Pilote par rAF sur translate3d (compose par le GPU) : jamais de lecture de layout
 * dans le handler de scroll, jamais de re-render.
 */
export function ParallaxGlow() {
  const glow = useRef<HTMLDivElement>(null);
  const dots = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      // au-dela d'un ecran, le hero est sorti du champ : inutile de continuer
      if (y > window.innerHeight) return;
      if (glow.current) glow.current.style.transform = `translate3d(0, ${y * 0.28}px, 0)`;
      if (dots.current) dots.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        ref={dots}
        className="bg-dots absolute inset-x-0 -top-24 h-[140%] opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_25%,black,transparent)]"
      />
      <div ref={glow} className="bg-glow absolute inset-x-0 -top-32 h-[130%]" />
    </div>
  );
}
