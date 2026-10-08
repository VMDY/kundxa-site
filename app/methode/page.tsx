import type { Metadata } from "next";
import { Appel } from "@/components/blocks/appel";
import { Engagements } from "@/components/blocks/engagements";
import { PageHero } from "@/components/blocks/page-hero";
import { Reveal } from "@/components/reveal";
import { Container } from "@/components/ui/container";
import { Heading, Titre } from "@/components/ui/heading";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { etapes, methode } from "@/content/site";

export const metadata: Metadata = {
  title: methode.meta.titre,
  description: methode.meta.description,
  alternates: { canonical: "/methode" },
};

export default function Methode() {
  const { colonnes } = methode;
  return (
    <>
      <PageHero {...methode.hero} image="/images/3d/chaine.webp" />

      <Section tone="deep">
        <Container>
          <ol className="divide-y divide-white/10 border-y border-white/10">
            {etapes.map((e) => (
              <Reveal
                as="li"
                key={e.numero}
                className="grid gap-6 py-12 lg:grid-cols-[13rem_1fr] lg:gap-12"
              >
                <div>
                  <span className="font-serif text-[3.25rem] leading-none text-gold">{e.numero}</span>
                  <h2 className="mt-4 text-[clamp(1.6rem,1.3rem+1vw,2.1rem)] leading-[1.12]">{e.titre}</h2>
                </div>
                <dl className="grid gap-6 sm:grid-cols-3">
                  {(
                    [
                      [colonnes.nousFaisons, e.nousFaisons],
                      [colonnes.vousFaites, e.vousFaites],
                      [colonnes.vousRecevez, e.vousRecevez],
                    ] as const
                  ).map(([libelle, texte], j) => (
                    <div key={libelle} className={j === 2 ? "rounded-md border border-gold/30 bg-gold/[0.04] p-5" : "p-5 pl-0 sm:pl-5"}>
                      <dt className="font-mono text-label uppercase text-gold">{libelle}</dt>
                      <dd className="mt-2 text-small text-paper/90">{texte}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <Reveal>
            <Kicker light>{methode.principes.surtitre}</Kicker>
            <Heading className="mt-5 text-ink">
              <Titre parts={methode.principes.titre} light />
            </Heading>
          </Reveal>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {methode.principes.items.map((p, i) => (
              <Reveal as="li" key={p.titre} delay={i * 70} className="rounded-lg bg-raised p-7">
                <span className="font-mono text-label text-dusk">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-h3 text-ink">{p.titre}</h3>
                <p className="mt-3 text-small text-ink-muted">{p.texte}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <Kicker>{methode.outils.surtitre}</Kicker>
            <Heading className="mt-5">
              <Titre parts={methode.outils.titre} />
            </Heading>
          </Reveal>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {methode.outils.items.map((o) => (
              <Reveal as="li" key={o.nom} className="py-6">
                <span className="font-serif text-h3">{o.nom}</span>
                <span className="text-muted"> {o.texte}</span>
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
