import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GoldRule } from "@/components/ui/gold-rule";
import { Heading } from "@/components/ui/heading";
import { IconArrowRight, IconCheck, IconShield } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { liens, solution } from "@/content/site";

export function Solution() {
  return (
    <Section id="solution">
      <Container>
        <Reveal>
          <Eyebrow>{solution.eyebrow}</Eyebrow>
          <Heading level="h2" className="mt-6 max-w-3xl">
            {solution.titreDebut}
            <span className="text-accent">{solution.titreAccent}</span>.
          </Heading>
          <GoldRule className="mt-7" />
        </Reveal>

        <Reveal delay={80} className="mt-10 max-w-2xl space-y-5">
          {solution.corps.map((p, i) => (
            <p key={i} className="text-body text-muted">
              {p}
            </p>
          ))}
        </Reveal>

        {/* Timeline : le filet dore vertical relie les quatre etapes et se remplit
            au fur et a mesure que chacune entre dans le viewport. */}
        <ol className="mt-20 relative">
          <span
            aria-hidden
            className="absolute left-[0.9rem] top-2 bottom-2 w-px bg-border sm:left-[1.4rem]"
          />
          {solution.etapes.map((etape, i) => (
            <Reveal key={etape.numero} as="li" delay={i * 90} className="relative pl-12 pb-12 last:pb-0 sm:pl-20">
              <span
                aria-hidden
                className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-accent bg-bg text-[0.7rem] font-bold text-accent sm:h-11 sm:w-11 sm:text-caption"
              >
                {etape.numero}
              </span>
              <h3 className="text-h3">{etape.titre}</h3>
              <p className="mt-3 max-w-2xl text-body text-muted">{etape.texte}</p>
            </Reveal>
          ))}
        </ol>

        {/* Production-proven : la seule preuve autorisee est le business de Valdo. */}
        <Reveal className="mt-8">
          <Card interactive={false} className="border-accent/25 sm:p-10">
            <Heading level="h3" as="h3">
              {solution.preuve.titre}
            </Heading>
            <p className="mt-5 max-w-2xl text-body text-muted">{solution.preuve.intro}</p>

            <ul className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {solution.preuve.items.map((item) => (
                <li key={item.titre} className="flex gap-3">
                  <IconCheck className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <p className="text-body">
                    <span className="font-semibold">{item.titre}</span>{" "}
                    <span className="text-muted">— {item.texte}</span>
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-9 max-w-2xl text-body font-semibold">{solution.preuve.closer}</p>

            <a
              href={liens.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-sm text-body font-semibold text-accent transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {solution.preuve.lienLibelle}
              <IconArrowRight className="h-[1.1em] w-[1.1em]" />
            </a>
          </Card>
        </Reveal>

        <ul className="mt-5 grid gap-5 sm:grid-cols-2">
          {solution.garanties.map((g, i) => (
            <Reveal key={g.titre} as="li" delay={i * 60}>
              <Card as="div" className="h-full">
                <IconShield className="h-6 w-6 text-accent" />
                <p className="mt-4 text-body font-semibold">{g.titre}</p>
                {g.note ? <p className="mt-3 text-caption text-muted">{g.note}</p> : null}
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
