import type { Metadata } from "next";
import Image from "next/image";
import { Appel } from "@/components/blocks/appel";
import { PageHero } from "@/components/blocks/page-hero";
import { Reveal } from "@/components/reveal";
import { Container } from "@/components/ui/container";
import { Heading, Titre } from "@/components/ui/heading";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { aPropos, site } from "@/content/site";

export const metadata: Metadata = {
  title: aPropos.meta.titre,
  description: aPropos.meta.description,
  alternates: { canonical: "/a-propos" },
};

export default function APropos() {
  return (
    <>
      <PageHero {...aPropos.hero} />

      <Section tone="deep" className="pt-0">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="relative h-[30rem] overflow-hidden rounded-xl sm:h-[38rem] lg:sticky lg:top-28">
            <Image
              src={site.photo}
              alt="Valdo Mendy, fondateur de Kundxa"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-[center_15%]"
            />
          </Reveal>
          <div>
            <Reveal>
              <Kicker>{aPropos.parcours.surtitre}</Kicker>
              <Heading className="mt-5">
                <Titre parts={aPropos.parcours.titre} />
              </Heading>
            </Reveal>
            {aPropos.parcours.texte.map((t, i) => (
              <Reveal key={t} delay={i * 60} className="mt-6">
                <p className="text-lead text-muted">{t}</p>
              </Reveal>
            ))}
            <Reveal className="mt-12">
              <p className="font-mono text-label uppercase text-gold">{aPropos.enBref.surtitre}</p>
              <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {aPropos.enBref.lignes.map(([cle, valeur]) => (
                  <div key={cle} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="text-small font-semibold">{cle}</dt>
                    <dd className="text-small text-muted">{valeur}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <Reveal>
            <Kicker light>{aPropos.valeurs.surtitre}</Kicker>
            <Heading className="mt-5 max-w-4xl text-ink">
              <Titre parts={aPropos.valeurs.titre} light />
            </Heading>
          </Reveal>
          <ol className="mt-14 divide-y divide-line-light border-y border-line-light">
            {aPropos.valeurs.items.map((v) => (
              <Reveal
                as="li"
                key={v.numero}
                className="grid gap-3 py-7 sm:grid-cols-[4rem_1fr_1.2fr] sm:items-baseline sm:gap-8"
              >
                <span className="font-mono text-label text-dusk">{v.numero}</span>
                <h3 className="text-h3 text-ink">{v.titre}</h3>
                <p className="text-ink-muted">{v.texte}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Appel titre={aPropos.suite.titre} />
    </>
  );
}
