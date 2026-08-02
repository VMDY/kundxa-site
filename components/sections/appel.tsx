import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GoldRule } from "@/components/ui/gold-rule";
import { Heading } from "@/components/ui/heading";
import { IconArrowRight } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { appel } from "@/content/site";

/**
 * Section finale de la page d'accueil.
 *
 * Elle n'embarque plus aucun moyen de contact — ni calendrier, ni formulaire :
 * les trois canaux vivent sur /contact (decision 2026-08-02). Cette section
 * garde la narration (ce qui se passe pendant l'appel, ce qu'on en repart avec)
 * et se termine sur un lien unique vers la page dediee.
 */

export function Appel() {
  return (
    <Section id="appel" className="overflow-hidden">
      <div aria-hidden className="bg-glow pointer-events-none absolute inset-x-0 top-0 h-2/3" />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{appel.eyebrow}</Eyebrow>
            <Heading level="h2" className="mt-6">
              {appel.titreDebut}
              <span className="text-accent">{appel.titreAccent}</span>
            </Heading>
            <GoldRule className="mt-7" />
            <p className="mt-7 text-body text-muted">{appel.corps}</p>
          </Reveal>

          <Reveal delay={80}>
            <dl className="space-y-6 border-t border-border pt-8 lg:border-t-0 lg:pt-0">
              {appel.puces.map((p) => (
                <div key={p.titre}>
                  <dt className="text-caption uppercase tracking-[0.14em] text-accent">
                    {p.titre}
                  </dt>
                  <dd className="mt-1.5 text-body">{p.texte}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={160} className="mt-16 border-t border-border pt-12">
          <p className="max-w-2xl text-body font-semibold text-balance">{appel.closer}</p>

          <ButtonLink href="/contact" className="mt-8">
            {appel.ctaPage}
            <IconArrowRight className="h-[1.1em] w-[1.1em]" />
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
