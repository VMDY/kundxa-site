import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GoldRule } from "@/components/ui/gold-rule";
import { Heading } from "@/components/ui/heading";
import { IconArrowRight, IconCheck } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { cta, offres } from "@/content/site";

export function Offres() {
  const { principale } = offres;

  return (
    <Section id="offres" bg="muted">
      <Container>
        <Reveal>
          <Eyebrow>{offres.eyebrow}</Eyebrow>
          <Heading level="h2" className="mt-6 max-w-3xl">
            {offres.titre}
          </Heading>
          <GoldRule className="mt-7" />
          <p className="mt-7 max-w-2xl text-body text-muted">{offres.sousTitre}</p>
        </Reveal>

        {/* Carte large en tete plutot qu'une grille de quatre colonnes egales :
            la hierarchie de l'offre doit se voir avant d'etre lue. */}
        <Reveal delay={80} className="mt-12">
          <Card interactive={false} className="border-accent/30 bg-bg sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
              <div>
                <Badge>{principale.badge}</Badge>
                <Heading level="h3" as="h3" className="mt-5">
                  {principale.titre}
                </Heading>
                <p className="mt-4 text-body">{principale.accroche}</p>
                <p className="mt-6 text-caption uppercase tracking-[0.14em] text-accent">Pour qui</p>
                <p className="mt-2 text-body text-muted">{principale.pourQui}</p>
              </div>

              <div className="lg:border-l lg:border-border lg:pl-10">
                <p className="text-caption uppercase tracking-[0.14em] text-accent">Ce qui est livré</p>
                <ul className="mt-4 space-y-3">
                  {principale.livre.map((item) => (
                    <li key={item} className="flex gap-3 text-body text-muted">
                      <IconCheck className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <ButtonLink href="#appel">
                    {cta.principal}
                    <IconArrowRight className="h-[1.1em] w-[1.1em]" />
                  </ButtonLink>
                  <span className="text-caption uppercase tracking-[0.14em] text-muted">
                    {offres.mention}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>

        <ul className="mt-5 grid gap-5 lg:grid-cols-3">
          {offres.secondaires.map((o, i) => (
            <Reveal key={o.titre} as="li" delay={i * 70}>
              <Card as="div" className="flex h-full flex-col bg-bg">
                <h3 className="text-h3">{o.titre}</h3>
                <p className="mt-3 text-body font-semibold text-accent">{o.accroche}</p>
                <p className="mt-3 text-body text-muted">{o.texte}</p>
                <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                  <span className="text-caption uppercase tracking-[0.14em] text-muted">
                    {offres.mention}
                  </span>
                  <a
                    href="#appel"
                    className="inline-flex items-center gap-2 rounded-sm text-caption font-semibold text-accent transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {cta.principal}
                    <IconArrowRight className="h-[1.1em] w-[1.1em]" />
                  </a>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
