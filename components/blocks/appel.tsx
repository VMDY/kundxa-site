import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading, Titre } from "@/components/ui/heading";
import { IconArrowRight } from "@/components/ui/icons";
import { Kicker } from "@/components/ui/kicker";
import { appel, cta, site } from "@/content/site";

/**
 * Derniere section de chaque page : l'appel de cadrage. `titre` permet a une page
 * de poser sa propre accroche (« Le prochain cas peut etre le votre. ») au-dessus
 * de la meme carte.
 */
export function Appel({ titre }: { titre?: readonly string[] }) {
  return (
    <section className="bg-cta relative py-[var(--section-py)]">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_29rem] lg:gap-20">
        <Reveal>
          <Kicker>{appel.surtitre}</Kicker>
          <Heading className="mt-5">
            <Titre parts={titre ?? appel.titre} />
          </Heading>
          <p className="mt-6 max-w-xl text-lead text-muted">{appel.texte}</p>
          <p className="mt-10 font-serif text-h3 italic">{appel.closer}</p>
        </Reveal>

        <Reveal delay={120} className="glass rounded-xl p-7 sm:p-8">
          <div className="flex items-center gap-4 border-b border-white/10 pb-5">
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
              <Image src={site.photo} alt="" fill sizes="48px" className="object-cover object-[center_15%]" />
            </span>
            <div>
              <p className="font-semibold">{appel.carte.titre}</p>
              <p className="text-caption text-muted">{appel.carte.sousTitre}</p>
            </div>
          </div>
          <dl className="mt-2 divide-y divide-white/10">
            {appel.puces.map((p) => (
              <div key={p.titre} className="py-4">
                <dt className="font-mono text-label uppercase text-gold">{p.titre}</dt>
                <dd className="mt-1.5 text-small text-paper/90">{p.texte}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink href="/contact#appeler" className="mt-4 w-full">
            {cta.final}
            <IconArrowRight className="h-[1.1em] w-[1.1em]" />
          </ButtonLink>
          <ButtonLink href="/contact#ecrire" variant="ghost" size="sm" className="mt-3 w-full">
            {cta.ecrire}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
