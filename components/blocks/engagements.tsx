import { Reveal } from "@/components/reveal";
import { Container } from "@/components/ui/container";
import { Heading, Titre } from "@/components/ui/heading";
import { IconShield } from "@/components/ui/icons";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { engagements } from "@/content/site";

// Les deux engagements ecrits dans chaque devis. Affiches sur Methode et Offres.
export function Engagements() {
  return (
    <Section tone="deep">
      <Container>
        <Reveal>
          <Kicker>{engagements.surtitre}</Kicker>
          <Heading className="mt-5">
            <Titre parts={engagements.titre} />
          </Heading>
        </Reveal>
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {engagements.items.map((e, i) => (
            <Reveal as="li" key={e.titre} delay={i * 80} className="glass rounded-lg p-8">
              <IconShield className="h-6 w-6 text-gold" />
              <p className="mt-5 font-serif text-h3">{e.titre}</p>
              <p className="mt-3 text-small text-muted">{e.note}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
