import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading, Titre } from "@/components/ui/heading";
import { IconArrowRight } from "@/components/ui/icons";
import { Kicker } from "@/components/ui/kicker";
import { cn } from "@/lib/cn";
import { accueil, cta, site } from "@/content/site";

const { hero } = accueil;

export function Hero() {
  return (
    <section className="bg-hero relative overflow-hidden">
      <Container className="grid items-center gap-14 pt-[calc(var(--header-h)+3.5rem)] lg:min-h-[min(100svh,58rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-[var(--header-h)]">
        <div className="lg:pb-10">
          <Reveal>
            <Kicker>{hero.surtitre}</Kicker>
          </Reveal>
          <Reveal delay={80} className="mt-6">
            <Heading level="display">
              <Titre parts={hero.titre} />
            </Heading>
          </Reveal>
          <Reveal delay={160} className="mt-7 max-w-xl">
            <p className="text-lead text-muted">{hero.sousTitre}</p>
          </Reveal>
          <Reveal delay={240} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact#appeler" size="lg">
              {cta.principal}
              <IconArrowRight className="h-[1.1em] w-[1.1em]" />
            </ButtonLink>
            <ButtonLink href="/realisations" variant="ghost" size="lg">
              {cta.realisations}
            </ButtonLink>
          </Reveal>
          <Reveal delay={300} className="mt-5">
            <p className="flex items-center gap-2.5 text-caption text-muted">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
              {hero.micro}
            </p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <HeroScene />
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * Le portrait, et trois cartes d'interface qui montrent une matinee type : ce que
 * le systeme a fait, ce qu'il est en train de faire, et la decision qu'il rend.
 * Les cartes sont une illustration (aria-hidden) ; le texte de la page porte le sens.
 */
function HeroScene() {
  const { cartes } = hero;
  return (
    <div className="relative mx-auto h-[30rem] w-full max-w-[34rem] sm:h-[38rem] lg:h-[44rem]">
      <div className="absolute right-0 bottom-0 h-[92%] w-[78%] overflow-hidden rounded-t-[1.375rem] sm:right-[4%]">
        <Image
          src={site.photo}
          alt={hero.photoAlt}
          fill
          priority
          sizes="(max-width: 1024px) 80vw, 36vw"
          className="object-cover object-[center_12%]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-dusk/90" />
      </div>

      <div aria-hidden className="text-[0.84rem] leading-snug">
        <Carte className="float-slow top-[30%] left-0 hidden w-[15.5rem] sm:block sm:-left-[4%]">
          <Entete titre={cartes.resume.titre} etat={cartes.resume.heure} />
          {cartes.resume.lignes.map(([libelle, valeur], i) => (
            <div key={libelle} className="mt-2 flex justify-between text-paper/90">
              <span>{libelle}</span>
              <span className={cn("font-mono", i === 2 && "text-gold")}>{valeur}</span>
            </div>
          ))}
        </Carte>

        <Carte className="float-slower top-[66%] right-0 hidden w-[15rem] sm:block sm:-right-[2%]">
          <Entete titre={cartes.relance.titre} etat={cartes.relance.etat} />
          <p className="mt-2 text-paper">{cartes.relance.texte}</p>
        </Carte>

        <Carte className="float-slow bottom-[3%] left-0 w-[18.5rem] border-gold/45 sm:-left-[2%]">
          <Entete titre={cartes.decision.titre} etat={cartes.decision.etat} or />
          <p className="mt-2 text-paper">
            {cartes.decision.texte[0]}
            <span className="font-semibold text-gold">{cartes.decision.texte[1]}</span>
            {cartes.decision.texte[2]}
          </p>
          <div className="mt-3 flex gap-2">
            <span className="rounded-sm bg-gold px-3 py-1.5 text-[0.8rem] font-semibold text-midnight">
              {cartes.decision.boutons[0]}
            </span>
            <span className="rounded-sm border border-white/25 px-3 py-1.5 text-[0.8rem] font-semibold">
              {cartes.decision.boutons[1]}
            </span>
          </div>
        </Carte>
      </div>
    </div>
  );
}

function Carte({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("glass absolute rounded-lg p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)]", className)}>
      {children}
    </div>
  );
}

function Entete({ titre, etat, or = false }: { titre: string; etat: string; or?: boolean }) {
  return (
    <div className="flex justify-between gap-3 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
      <span className={or ? "text-gold" : "text-muted"}>{titre}</span>
      <span className="text-muted">{etat}</span>
    </div>
  );
}
