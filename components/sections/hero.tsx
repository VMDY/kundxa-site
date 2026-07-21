import { ParallaxGlow } from "@/components/parallax-glow";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { IconArrowDown, IconArrowRight } from "@/components/ui/icons";
import { cta, hero } from "@/content/site";

export function Hero() {
  return (
    <section
      id="haut"
      className="relative flex min-h-[88svh] items-center overflow-hidden pb-16 pt-[calc(var(--header-h)+2.5rem)]"
    >
      <ParallaxGlow />

      <Container className="relative">
        <Reveal>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </Reveal>

        {/* Le mot pivot dore entre 120ms apres le reste de la ligne : l'oeil finit
            de lire la phrase au moment ou l'accent apparait. */}
        <Reveal delay={80} className="mt-6 max-w-5xl">
          <h1 className="text-display font-extrabold">
            {hero.titreDebut}
            <span
              data-reveal=""
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              className="inline-block text-accent"
            >
              {hero.titreAccent}
            </span>
            .
          </h1>
        </Reveal>

        <Reveal delay={160} className="mt-7 max-w-xl">
          <p className="text-body text-muted">{hero.sousTitre}</p>
        </Reveal>

        <Reveal delay={240} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="#appel">
            {cta.principal}
            <IconArrowRight className="h-[1.1em] w-[1.1em]" />
          </ButtonLink>
          <ButtonLink href="#solution" variant="secondary">
            {cta.secondaire}
            <IconArrowDown className="h-[1.1em] w-[1.1em]" />
          </ButtonLink>
        </Reveal>

        {/* Bandeau de preuve : la stack nommee, puis les certifications reelles. */}
        <Reveal delay={320} className="mt-12 border-t border-border pt-6">
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {hero.stack.map((outil) => (
              <li key={outil} className="flex items-center gap-2.5 text-caption font-semibold">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                {outil}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-caption text-muted">{hero.certifications}</p>
        </Reveal>
      </Container>
    </section>
  );
}
