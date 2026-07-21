import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { legal, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Quelles données personnelles sont collectées sur ce site, pourquoi, combien de temps, et comment exercer vos droits.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/confidentialite" },
};

// Sous-traitants reels du site. A tenir a jour : toute nouvelle brique qui recoit
// une donnee personnelle doit apparaitre ici (obligation de transparence RGPD).
const soustraitants = [
  {
    nom: "Cal.com",
    role: "Prise de rendez-vous",
    donnees: "Nom, e-mail, informations que vous saisissez en réservant",
    lieu: "Union européenne / États-Unis",
  },
  {
    nom: "Airtable",
    role: "Base des abonnés à la newsletter",
    donnees: "Adresse e-mail, date d'inscription, consentement",
    lieu: "États-Unis",
  },
  {
    nom: "Resend",
    role: "Envoi de la newsletter",
    donnees: "Adresse e-mail",
    lieu: "Union européenne (eu-west-1)",
  },
  {
    nom: "Netlify",
    role: "Hébergement du site",
    donnees: "Journaux techniques, adresse IP",
    lieu: "États-Unis",
  },
];

export default function Confidentialite() {
  return (
    <Section className="pt-[calc(var(--header-h)+var(--section-py))]">
      <Container size="narrow">
        <Heading level="h1">Politique de confidentialité</Heading>
        <p className="mt-6 text-body text-muted">
          Cette page explique quelles données ce site collecte, pourquoi, et ce que vous pouvez
          exiger à leur sujet. Responsable du traitement : {legal.editeur}, {legal.adresse}.
        </p>

        <div className="mt-12 space-y-12">
          <section>
            <h2 className="text-h3">Ce qui est collecté, et pourquoi</h2>
            <dl className="mt-5 divide-y divide-border border-y border-border">
              <div className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="text-body font-semibold">Newsletter</dt>
                <dd className="text-body text-muted">
                  Votre adresse e-mail, la date d&apos;inscription et votre consentement. Finalité :
                  vous envoyer la newsletter. Base légale : votre consentement, que vous pouvez
                  retirer à tout moment.
                </dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="text-body font-semibold">Prise de rendez-vous</dt>
                <dd className="text-body text-muted">
                  Les informations que vous saisissez dans le calendrier Cal.com. Finalité :
                  organiser l&apos;appel et vous recontacter. Base légale : mesures précontractuelles
                  prises à votre demande.
                </dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="text-body font-semibold">Journaux techniques</dt>
                <dd className="text-body text-muted">
                  Adresse IP et informations de connexion enregistrées par l&apos;hébergeur.
                  Finalité : sécurité et bon fonctionnement du site. Base légale : intérêt légitime.
                </dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="text-h3">Traceurs</h2>
            <p className="mt-4 text-body text-muted">
              Ce site ne dépose aucun cookie publicitaire et n&apos;utilise aucun outil de mesure
              d&apos;audience. Les polices de caractères sont hébergées sur le site : aucune requête
              n&apos;est envoyée à un serveur tiers au chargement des pages. Le calendrier de prise
              de rendez-vous est un contenu intégré depuis Cal.com, qui peut déposer ses propres
              cookies au moment où vous interagissez avec lui.
            </p>
          </section>

          <section>
            <h2 className="text-h3">Qui d&apos;autre y a accès</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[38rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-border">
                    {["Prestataire", "Rôle", "Données", "Localisation"].map((th) => (
                      <th
                        key={th}
                        scope="col"
                        className="py-3 pr-6 text-caption uppercase tracking-[0.14em] text-accent"
                      >
                        {th}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {soustraitants.map((s) => (
                    <tr key={s.nom} className="border-b border-border align-top">
                      <td className="py-4 pr-6 text-body font-semibold">{s.nom}</td>
                      <td className="py-4 pr-6 text-body text-muted">{s.role}</td>
                      <td className="py-4 pr-6 text-body text-muted">{s.donnees}</td>
                      <td className="py-4 pr-6 text-body text-muted">{s.lieu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-caption text-muted">
              Vos données ne sont ni vendues, ni louées, ni transmises à des tiers en dehors des
              prestataires listés ci-dessus.
            </p>
          </section>

          <section>
            <h2 className="text-h3">Combien de temps</h2>
            <p className="mt-4 text-body text-muted">
              Abonnés à la newsletter : jusqu&apos;à votre désinscription, puis suppression sous
              trois mois. Échanges liés à un rendez-vous : trois ans à compter du dernier contact.
              Journaux techniques : treize mois au maximum.
            </p>
          </section>

          <section>
            <h2 className="text-h3">Vos droits</h2>
            <p className="mt-4 text-body text-muted">
              Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
              limitation, d&apos;opposition et de portabilité sur vos données, ainsi que du droit de
              retirer votre consentement à tout moment. Chaque newsletter contient un lien de
              désinscription. Pour toute demande, écrivez à{" "}
              <a
                href={`mailto:${site.email}`}
                className="rounded-sm underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {site.email}
              </a>
              . Une réponse vous sera apportée sous un mois.
            </p>
            <p className="mt-4 text-body text-muted">
              Si la réponse ne vous satisfait pas, vous pouvez saisir la CNIL —{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                cnil.fr
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
