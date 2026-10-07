import type { Metadata } from "next";
import Image from "next/image";
import { Appel } from "@/components/blocks/appel";
import { PageHero } from "@/components/blocks/page-hero";
import { Reveal } from "@/components/reveal";
import { Container } from "@/components/ui/container";
import { Heading, Titre } from "@/components/ui/heading";
import { IconArrowUpRight } from "@/components/ui/icons";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { cas, realisations, site } from "@/content/site";

export const metadata: Metadata = {
  title: realisations.meta.titre,
  description: realisations.meta.description,
  alternates: { canonical: "/realisations" },
};

export default function Realisations() {
  const { libelles } = realisations;
  return (
    <>
      <PageHero {...realisations.hero} />

      {cas.map((c, i) => (
        <Section key={c.slug} id={c.slug} tone={i % 2 ? "midnight" : "deep"}>
          <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal
              className={cn(
                "relative h-[22rem] overflow-hidden rounded-xl sm:h-[30rem]",
                i % 2 && "lg:order-2",
              )}
            >
              <Image src={c.image} alt="" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            </Reveal>

            <Reveal delay={100}>
              <p className="font-mono text-label uppercase text-gold">
                Cas {String(i + 1).padStart(2, "0")} · {c.surtitre}
              </p>
              <Heading as="h2" level="h2" className="mt-5 text-[clamp(1.85rem,1.4rem+1.6vw,2.75rem)] leading-[1.12]">
                {c.titre}
              </Heading>
              <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {(
                  [
                    [libelles.situation, c.situation],
                    [libelles.systeme, c.systeme],
                    [libelles.revient, c.revient],
                  ] as const
                ).map(([libelle, texte], j) => (
                  <div key={libelle} className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className={cn("font-mono text-label uppercase", j === 2 ? "text-gold" : "text-muted")}>
                      {libelle}
                    </dt>
                    <dd className={cn("text-small", j === 2 ? "text-paper" : "text-paper/85")}>{texte}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Container>
        </Section>
      ))}

      <Section tone="light">
        <Container>
          <Reveal>
            <Kicker light>{realisations.chezMoi.surtitre}</Kicker>
            <Heading className="mt-5 max-w-4xl text-ink">
              <Titre parts={realisations.chezMoi.titre} light />
            </Heading>
          </Reveal>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2">
            {realisations.chezMoi.items.map((it, i) => (
              <Reveal as="li" key={it.titre} delay={i * 70} className="rounded-lg bg-raised p-8">
                <h3 className="text-h3 text-ink">{it.titre}</h3>
                <p className="mt-3 text-ink-muted">{it.texte}</p>
                {"lien" in it && (
                  <a
                    href={site.videoRelance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 rounded-sm font-semibold text-dusk underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-dusk"
                  >
                    {it.lien}
                    <IconArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Appel titre={realisations.suite.titre} />
    </>
  );
}
