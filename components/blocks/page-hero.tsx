import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { Container } from "@/components/ui/container";
import { Heading, Titre } from "@/components/ui/heading";
import { Kicker } from "@/components/ui/kicker";
import { cn } from "@/lib/cn";

// En-tete des pages interieures : surtitre, titre a un mot en italique, chapo,
// et en option un visuel 3D de la charte a droite.
export function PageHero({
  surtitre,
  titre,
  texte,
  image,
  children,
}: {
  surtitre: string;
  titre: readonly string[];
  texte: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-hero relative overflow-hidden">
      <Container
        className={cn(
          "grid items-center gap-12 pt-[calc(var(--header-h)+4.5rem)] pb-[var(--section-py)]",
          image && "lg:grid-cols-[1.2fr_0.8fr]",
        )}
      >
        <div>
          <Reveal>
            <Kicker>{surtitre}</Kicker>
          </Reveal>
          <Reveal delay={80} className="mt-6">
            <Heading level="h1">
              <Titre parts={titre} />
            </Heading>
          </Reveal>
          <Reveal delay={160} className="mt-7 max-w-2xl">
            <p className="text-lead text-muted">{texte}</p>
          </Reveal>
          {children}
        </div>
        {image && (
          <Reveal delay={160} className="relative hidden h-[30rem] overflow-hidden rounded-xl lg:block">
            <Image src={image} alt="" fill priority sizes="35vw" className="object-cover" />
          </Reveal>
        )}
      </Container>
    </section>
  );
}
