import Image from "next/image";
import { ParallaxGlow } from "@/components/parallax-glow";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { IconArrowDown, IconArrowRight } from "@/components/ui/icons";
import { cta, hero, site } from "@/content/site";

export function Hero() {
  return (
    <section
      id="haut"
      className="relative flex min-h-[88svh] items-center overflow-hidden pb-16 pt-[calc(var(--header-h)+2rem)]"
    >
      <ParallaxGlow />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* --- Colonne texte --- */}
          <div>
            <Reveal>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </Reveal>

            {/* Le mot pivot dore entre 120ms apres le reste de la ligne : l'oeil
                finit de lire la phrase au moment ou l'accent apparait. */}
            <Reveal delay={80} className="mt-6">
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
          </div>

          {/* --- Colonne photo ---
              Le portrait est un studio dore-sur-noir. Pose tel quel sur la page
              noire il ne se detache pas ; on l'installe donc dans un panneau
              charcoal avec un halo dore derriere. Le fond noir de la photo se
              fond dans le panneau, le visage et le lisere dore ressortent. */}
          <Reveal delay={160} className="relative justify-self-center">
            {/* halo dore qui deborde du panneau, cote haut */}
            <div
              aria-hidden
              className="bg-glow absolute -inset-10 opacity-90 [mask-image:radial-gradient(55%_45%_at_50%_35%,black,transparent)]"
            />
            <div className="relative mx-auto w-[74%] max-w-xs lg:w-full lg:max-w-sm">
              {/* filet dore qui coiffe le cadre — signature de marque */}
              <span
                aria-hidden
                className="absolute -top-px left-8 right-8 z-10 h-px bg-accent/70"
              />
              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-b from-surface to-bg">
                <Image
                  src={site.photo}
                  alt="Valdo Mendy, fondateur de Kundxa"
                  width={1023}
                  height={1537}
                  priority
                  sizes="(max-width: 1024px) 50vw, 32vw"
                  className="w-full [mask-image:linear-gradient(to_bottom,black_72%,transparent_99%)]"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bandeau de preuve, pleine largeur : la stack nommee, puis les certifs. */}
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
