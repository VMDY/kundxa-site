import type { Metadata } from "next";
import { CalEmbed } from "@/components/cal-embed";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GoldRule } from "@/components/ui/gold-rule";
import { Heading } from "@/components/ui/heading";
import { IconArrowDown, IconArrowRight } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { pageContact, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Trois façons de joindre Kundxa : le formulaire, un appel de cadrage de soixante minutes, ou un e-mail direct.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <Section className="pt-[calc(var(--header-h)+var(--section-py))]">
      <Container>
        {/* --- En-tete --- */}
        <Heading level="h1">{pageContact.titre}</Heading>
        <GoldRule className="mt-7" />
        <p className="mt-7 max-w-2xl text-body text-muted">{pageContact.intro}</p>

        {/* --- Sommaire des trois canaux ---
            Chaque carte est un lien d'ancre : la page reste une seule colonne de
            lecture, mais le visiteur qui sait deja ce qu'il veut saute directement. */}
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {pageContact.canaux.map((canal) => (
            <li key={canal.ancre}>
              <a
                href={`#${canal.ancre}`}
                className="flex h-full flex-col rounded-lg border border-border bg-surface p-7 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className="text-caption uppercase tracking-[0.14em] text-accent">
                  {canal.eyebrow}
                </span>
                <span className="mt-3 text-h3 font-semibold">{canal.titre}</span>
                <span className="mt-3 grow text-body text-muted">{canal.pourQui}</span>
                <span className="mt-6 inline-flex items-center gap-2 text-caption font-semibold">
                  {canal.repere}
                  <IconArrowDown className="h-[1.1em] w-[1.1em] text-accent" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* --- 1. Ecrire --- */}
        <div id="ecrire" className="mt-24 scroll-mt-[calc(var(--header-h)+2rem)]">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <Eyebrow>{pageContact.ecrire.eyebrow}</Eyebrow>
              <Heading level="h2" className="mt-5">
                {pageContact.ecrire.titre}
              </Heading>
              <p className="mt-5 text-body text-muted">{pageContact.ecrire.texte}</p>
            </div>

            <ContactForm />
          </div>
        </div>

        {/* --- 2. Parler --- */}
        <div
          id="appeler"
          className="mt-24 scroll-mt-[calc(var(--header-h)+2rem)] border-t border-border pt-16"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <Eyebrow>{pageContact.appeler.eyebrow}</Eyebrow>
              <Heading level="h2" className="mt-5">
                {pageContact.appeler.titre}
              </Heading>
              <p className="mt-5 text-body text-muted">{pageContact.appeler.texte}</p>
            </div>

            <CalEmbed />
          </div>
        </div>

        {/* --- 3. E-mail --- */}
        <div
          id="email"
          className="mt-24 scroll-mt-[calc(var(--header-h)+2rem)] border-t border-border pt-16"
        >
          <Eyebrow>{pageContact.email.eyebrow}</Eyebrow>
          <Heading level="h2" className="mt-5">
            {pageContact.email.titre}
          </Heading>
          <p className="mt-5 max-w-xl text-body text-muted">{pageContact.email.texte}</p>

          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex items-center gap-2 rounded-md border border-border bg-surface px-6 py-3.5 text-body font-semibold transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {pageContact.email.bouton}
            <IconArrowRight className="h-[1.1em] w-[1.1em] text-accent" />
          </a>
        </div>
      </Container>
    </Section>
  );
}
