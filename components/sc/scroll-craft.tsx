"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Moteur scroll-craft (public/sc/scrollcraft.js, copie non modifiee du moteur de la
// skill viz-scroll-craft). Il lit les attributs data-sc-* du <main> et ne genere
// aucun DOM. Le routeur Next ne recharge pas la page : on detruit l'instance a
// chaque changement de route et on en monte une neuve sur le nouveau contenu.

type Instance = { destroy?: () => void };
type Engine = { mount: (root: Element) => Instance };

declare global {
  interface Window {
    ScrollCraft?: Engine;
  }
}

let chargement: Promise<Engine> | null = null;

function charger(): Promise<Engine> {
  if (window.ScrollCraft) return Promise.resolve(window.ScrollCraft);
  if (!chargement) {
    chargement = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "/sc/scrollcraft.js";
      s.async = true;
      s.onload = () => (window.ScrollCraft ? resolve(window.ScrollCraft) : reject(new Error("ScrollCraft absent")));
      s.onerror = () => reject(new Error("scrollcraft.js introuvable"));
      document.head.appendChild(s);
    });
  }
  return chargement;
}

export function ScrollCraft() {
  const pathname = usePathname();

  useEffect(() => {
    let instance: Instance | null = null;
    let annule = false;
    charger()
      .then((engine) => {
        if (annule) return;
        const racine = document.getElementById("contenu");
        if (racine) instance = engine.mount(racine);
        document.documentElement.classList.add("sc-on");
      })
      .catch(() => document.documentElement.classList.add("sc-off"));
    return () => {
      annule = true;
      instance?.destroy?.();
    };
  }, [pathname]);

  return null;
}
