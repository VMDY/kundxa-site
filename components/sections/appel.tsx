import { CalEmbed } from "@/components/cal-embed";
import { Reveal } from "@/components/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GoldRule } from "@/components/ui/gold-rule";
import { Heading } from "@/components/ui/heading";
import { IconArrowRight } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { appel, site } from "@/content/site";

export function Appel() {
  return (
    <Section id="appel" className="overflow-hidden">
      <div aria-hidden className="bg-glow pointer-events-none absolute inset-x-0 top-0 h-2/3" />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
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
              <dl className="mt-10 space-y-6 border-t border-border pt-8">
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

            <Reveal delay={160}>
              <p className="mt-10 text-body font-semibold text-balance">{appel.closer}</p>
              <a
                href={site.calcomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-sm text-body font-semibold text-accent transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Ouvrir le calendrier dans un nouvel onglet
                <IconArrowRight className="h-[1.1em] w-[1.1em]" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <CalEmbed />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
