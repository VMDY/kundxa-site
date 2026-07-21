import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { legal, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${site.url} — éditeur, hébergeur et identité de l'entreprise.`,
  robots: { index: true, follow: true },
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <Section className="pt-[calc(var(--header-h)+var(--section-py))]">
      <Container size="narrow">
        <Heading level="h1">Mentions légales</Heading>

        <div className="mt-12 space-y-12">
          <section>
            <h2 className="text-h3">Éditeur du site</h2>
            <dl className="mt-5 divide-y divide-border border-y border-border">
              {[
                ["Éditeur", legal.editeur],
                ["Forme juridique", legal.formeJuridique],
                ["Nom commercial", legal.nomCommercial],
                ["Adresse", legal.adresse],
                ["SIREN", legal.siren],
                ["SIRET (siège)", legal.siret],
                ["Code APE", legal.ape],
                ["TVA", legal.tva],
              ].map(([cle, valeur]) => (
                <div key={cle} className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="text-body font-semibold">{cle}</dt>
                  <dd className="text-body text-muted">{valeur}</dd>
                </div>
              ))}
              <div className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="text-body font-semibold">Contact</dt>
                <dd className="text-body text-muted">
                  <a
                    href={`mailto:${site.email}`}
                    className="rounded-sm underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="text-h3">Directeur de la publication</h2>
            <p className="mt-4 text-body text-muted">{legal.editeur}</p>
          </section>

          <section>
            <h2 className="text-h3">Hébergement</h2>
            <p className="mt-4 text-body text-muted">
              Ce site est hébergé par {legal.hebergeur}.{" "}
              <a
                href={legal.hebergeurSite}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                netlify.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-h3">Propriété intellectuelle</h2>
            <p className="mt-4 text-body text-muted">
              L&apos;ensemble des contenus de ce site — textes, identité visuelle, logo, mise en
              page — est la propriété de {legal.editeur}, sauf mention contraire. Toute reproduction
              ou représentation, totale ou partielle, sans autorisation écrite préalable est
              interdite.
            </p>
          </section>

          <section>
            <h2 className="text-h3">Données personnelles</h2>
            <p className="mt-4 text-body text-muted">
              Les traitements de données réalisés depuis ce site sont détaillés sur la page{" "}
              <a
                href="/confidentialite"
                className="rounded-sm underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Confidentialité
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h3">Médiation de la consommation</h2>
            <p className="mt-4 text-body text-muted">
              Les prestations proposées s&apos;adressent à des professionnels dans le cadre de leur
              activité. En cas de litige, une solution amiable sera recherchée en priorité par écrit
              à l&apos;adresse de contact ci-dessus.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
