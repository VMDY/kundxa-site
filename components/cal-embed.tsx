"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@/components/ui/icons";
import { pageContact, site } from "@/content/site";

const CAL_SRC = `https://cal.com/${site.calcom}?theme=dark&brandColor=%23EFB509&layout=month_view`;

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
  const { cal } = pageContact;

  if (charge) {
    return (
      <div className="overflow-hidden rounded-xl border border-white/12 bg-midnight">
        <iframe
          src={CAL_SRC}
          title="Réserver un appel de cadrage avec Kundxa"
          className="h-[42rem] w-full border-0 lg:h-[46rem]"
        />
      </div>
    );
  }

  return (
    <div className="glass flex flex-col items-start justify-center rounded-xl p-8 sm:p-10 lg:min-h-[28rem]">
      <p className="font-mono text-label uppercase text-gold">{cal.surtitre}</p>
      <p className="mt-4 font-serif text-h3">{cal.titre}</p>
      <p className="mt-4 max-w-md text-small text-muted">{cal.texte}</p>

      <Button onClick={() => setCharge(true)} className="mt-8">
        {cal.bouton}
        <IconArrowRight className="h-[1.1em] w-[1.1em]" />
      </Button>

      <a
        href={site.calcomUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 rounded-sm text-caption text-muted underline underline-offset-4 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        {cal.lien}
      </a>
    </div>
  );
}
