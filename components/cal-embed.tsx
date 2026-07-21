"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@/components/ui/icons";
import { site } from "@/content/site";

const CAL_SRC = `https://cal.com/${site.calcom}?theme=dark&brandColor=%23FBED12&layout=month_view`;

/**
 * Facade Cal.com : on affiche d'abord une carte statique aux couleurs du site,
 * et l'iframe n'est chargee qu'au clic.
 *
 * Trois raisons, dans cet ordre :
 *  1. Perf — l'embed est lourd (plusieurs centaines de ko de JS tiers). Charge
 *     automatiquement, il fige le rendu de la page pendant plusieurs secondes.
 *  2. RGPD — Cal.com depose ses propres cookies. Les charger seulement apres une
 *     action explicite du visiteur est defendable ; les imposer ne l'est pas.
 *  3. Robustesse — si Cal.com est indisponible, le lien direct reste la.
 */
export function CalEmbed() {
  const [charge, setCharge] = useState(false);

  if (charge) {
    return (
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <iframe
          src={CAL_SRC}
          title="Réserver un appel de cadrage avec Kundxa"
          className="h-[42rem] w-full border-0 lg:h-[46rem]"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start justify-center rounded-lg border border-border bg-surface p-8 sm:p-10 lg:min-h-[32rem]">
      <p className="text-caption uppercase tracking-[0.14em] text-accent">Appel de cadrage</p>
      <p className="mt-4 text-h3 font-semibold">Soixante minutes, en visio.</p>
      <p className="mt-4 max-w-md text-body text-muted">
        Le calendrier s&apos;ouvre ici même. Il est fourni par Cal.com, qui dépose ses propres
        cookies — il ne se charge donc qu&apos;à votre demande.
      </p>

      <Button onClick={() => setCharge(true)} className="mt-8">
        Voir les créneaux disponibles
        <IconArrowRight className="h-[1.1em] w-[1.1em]" />
      </Button>

      <a
        href={site.calcomUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 rounded-sm text-caption text-muted underline underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        ou ouvrir le calendrier dans un nouvel onglet
      </a>
    </div>
  );
}
