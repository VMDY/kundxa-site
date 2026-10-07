import type { Metadata } from "next";
import { CalEmbed } from "@/components/cal-embed";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/blocks/page-hero";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { IconArrowDown, IconArrowRight, IconPhone } from "@/components/ui/icons";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { pageContact, site } from "@/content/site";

export const metadata: Metadata = {
  title: pageContact.meta.titre,
  description: pageContact.meta.description,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero surtitre={pageContact.surtitre} titre={pageContact.titre} texte={pageContact.intro}>
        {/* Sommaire des canaux : chaque carte saute a sa section, sauf le
            telephone qui lance l'appel. */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {pageContact.canaux.map((canal) => (
            <li key={canal.ancre}>
              <a
                href={"href" in canal ? canal.href : `#${canal.ancre}`}
                className="glass flex h-full flex-col rounded-lg p-6 transition-colors hover:border-gold/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <span className="font-mono text-label uppercase text-gold">{canal.surtitre}</span>
                <span className="mt-3 font-serif text-h3">{canal.titre}</span>
                <span className="mt-3 grow text-small text-muted">{canal.pourQui}</span>
                <span className="mt-5 inline-flex items-center gap-2 text-small font-semibold">
                  {canal.repere}
                  {"href" in canal ? (
                    <IconPhone className="h-[1.1em] w-[1.1em] text-gold" />
                  ) : (
                    <IconArrowDown className="h-[1.1em] w-[1.1em] text-gold" />
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section tone="deep" id="appeler">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <Kicker>{pageContact.appeler.surtitre}</Kicker>
            <Heading className="mt-5 text-[clamp(1.85rem,1.4rem+1.6vw,2.75rem)] leading-[1.12]">
              {pageContact.appeler.titre}
            </Heading>
            <p className="mt-5 text-muted">{pageContact.appeler.texte}</p>
          </div>
          <CalEmbed />
        </Container>
      </Section>

      <Section id="ecrire">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <Kicker>{pageContact.ecrire.surtitre}</Kicker>
            <Heading className="mt-5 text-[clamp(1.85rem,1.4rem+1.6vw,2.75rem)] leading-[1.12]">
              {pageContact.ecrire.titre}
            </Heading>
            <p className="mt-5 text-muted">{pageContact.ecrire.texte}</p>
          </div>
          <ContactForm />
        </Container>
      </Section>

      <Section tone="light" id="email">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <Kicker light>{pageContact.email.surtitre}</Kicker>
            <Heading className="mt-5 text-ink text-[clamp(1.85rem,1.4rem+1.6vw,2.75rem)] leading-[1.12]">
              {pageContact.email.titre}
            </Heading>
            <p className="mt-5 text-ink-muted">{pageContact.email.texte}</p>
          </div>
          <div className="lg:pt-4">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-3 rounded-sm bg-midnight px-7 py-4 font-semibold text-paper transition-colors hover:bg-dusk focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-dusk"
            >
              {pageContact.email.bouton}
              <IconArrowRight className="h-[1.1em] w-[1.1em]" />
            </a>
            <p className="mt-6 font-mono text-caption text-ink-muted">{pageContact.coordonnees}</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
