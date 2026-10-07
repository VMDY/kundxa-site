import type { Metadata } from "next";
import { Appel } from "@/components/blocks/appel";
import { Engagements } from "@/components/blocks/engagements";
import { PageHero } from "@/components/blocks/page-hero";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading, Titre } from "@/components/ui/heading";
import { IconArrowRight, IconCheck } from "@/components/ui/icons";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { cta, offres } from "@/content/site";

export const metadata: Metadata = {
  title: offres.meta.titre,
  description: offres.meta.description,
  alternates: { canonical: "/offres" },
};

export default function Offres() {
  const p = offres.principale;
  return (
    <>
      <PageHero {...offres.hero} />

      <Section tone="deep" className="pt-0">
        <Container>
          <Reveal className="grid gap-10 rounded-xl border border-gold/50 bg-gradient-to-br from-[#1b2e4c] to-dusk p-8 sm:p-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <span className="inline-block rounded-sm bg-gold/15 px-3 py-1.5 font-mono text-label uppercase text-gold">
                {p.badge}
              </span>
              <h2 className="mt-6 text-h2">{p.titre}</h2>
              <p className="mt-4 text-lead text-muted">{p.accroche}</p>
              <p className="mt-8 font-mono text-label uppercase text-gold">{offres.pourQuiLibelle}</p>
              <p className="mt-2">{p.pourQui}</p>
              <p className="mt-6 font-mono text-label uppercase text-gold">{offres.dureeLibelle}</p>
              <p className="mt-2">{p.duree}</p>
              <ButtonLink href="/contact#appeler" className="mt-9">
                {cta.principal}
                <IconArrowRight className="h-[1.1em] w-[1.1em]" />
              </ButtonLink>
            </div>
            <div>
              <p className="font-mono text-label uppercase text-gold">{offres.livreLibelle}</p>
              <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {p.livre.map((item) => (
                  <li key={item} className="flex items-center gap-3 py-4">
                    <IconCheck className="h-4 w-4 shrink-0 text-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <ul className="mt-5 grid gap-5 lg:grid-cols-3">
            {offres.secondaires.map((s, i) => (
              <Reveal as="li" key={s.titre} delay={i * 80} className="glass flex flex-col rounded-lg p-8">
                <p className="font-mono text-label uppercase text-gold">{s.surtitre}</p>
                <h2 className="mt-4 text-h3">{s.titre}</h2>
                <p className="mt-2 font-serif italic text-paper/90">{s.accroche}</p>
                <p className="mt-4 flex-1 text-small text-muted">{s.texte}</p>
                <p className="mt-6 border-t border-white/10 pt-4 font-mono text-caption text-muted">
                  {offres.dureeLibelle} · <span className="text-paper">{s.duree}</span>
                </p>
              </Reveal>
            ))}
          </ul>

          <p className="mt-10 text-center text-small text-muted">{offres.mention}</p>
        </Container>
      </Section>

      <Section tone="light">
        <Container size="narrow">
          <Reveal>
            <Kicker light>{offres.choisir.surtitre}</Kicker>
            <Heading className="mt-5 text-ink">
              <Titre parts={offres.choisir.titre} light />
            </Heading>
          </Reveal>
          <ul className="mt-12 divide-y divide-line-light border-y border-line-light">
            {offres.choisir.lignes.map(([situation, offre]) => (
              <Reveal as="li" key={offre} className="grid gap-2 py-6 sm:grid-cols-[1.3fr_1fr] sm:gap-8">
                <span className="text-ink-muted">{situation}</span>
                <span className="flex items-center gap-2 font-serif text-h3 text-ink">
                  <IconArrowRight className="h-5 w-5 shrink-0 text-dusk" />
                  {offre}
                </span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Engagements />
      <Appel />
    </>
  );
}
