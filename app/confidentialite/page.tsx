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
    nom: "Notion",
    role: "Base des abonnés à la newsletter",
    donnees: "Adresse e-mail, date d'inscription, consentement",
    lieu: "États-Unis",
  },
  {
    nom: "Hostinger (n8n)",
    role: "Serveur d'automatisation qui reçoit les inscriptions, rendez-vous, messages et résumés d'appel",
    donnees: "Adresse e-mail, nom, message, résumé de l'appel",
    lieu: "France (Paris)",
  },
  {
    nom: "Telegram",
    role: "Notification interne de chaque demande",
    donnees: "Nom, e-mail, numéro de téléphone, résumé de la demande",
    lieu: "Hors Union européenne",
  },
  {
    nom: "Retell AI",
    role: "Assistant vocal du standard téléphonique",
    donnees: "Numéro de téléphone, enregistrement et transcription de l'appel, informations données pendant l'appel",
    lieu: "États-Unis",
  },
  {
    nom: "Telnyx",
    role: "Acheminement des appels téléphoniques",
    donnees: "Numéro de téléphone, date et durée de l'appel",
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
    role: "Hébergement du site et réception du formulaire de contact",
    donnees: "Journaux techniques, adresse IP, nom, e-mail et message envoyés via le formulaire",
    lieu: "États-Unis",
  },
  {
    nom: "Composio",
    role: "Connexion aux API de TikTok et de X (jetons d'accès, exécution des requêtes)",
    donnees:
      "Jetons d'accès, données de profil, statistiques et contenus des comptes connectés",
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
                <dt className="text-body font-semibold">Formulaire de contact</dt>
                <dd className="text-body text-muted">
                  Votre nom, votre adresse e-mail et le message que vous rédigez. Finalité : vous
                  répondre. Base légale : mesures précontractuelles prises à votre demande. La
                  soumission est reçue par Netlify, qui me la transmet par courrier électronique.
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
                <dt className="text-body font-semibold">Appel téléphonique</dt>
                <dd className="text-body text-muted">
                  Au {site.telephone}, un assistant vocal (une intelligence artificielle) vous
                  répond, ce qu&apos;il annonce dès le début de l&apos;appel. Votre numéro,
                  l&apos;enregistrement, la transcription et un résumé de l&apos;appel sont
                  conservés. Finalité : répondre à votre demande, organiser un rendez-vous et vous
                  rappeler. Base légale : mesures précontractuelles prises à votre demande.
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
            <h2 className="text-h3">Comptes TikTok et X connectés</h2>
            <p className="mt-4 text-body text-muted">
              Kundxa utilise une application connectée à TikTok et à X pour publier et suivre les
              contenus de ses propres comptes. Ces connexions ne concernent que les comptes dont le
              titulaire a lui-même donné son autorisation sur l&apos;écran de connexion de TikTok ou
              de X ; aucune donnée des visiteurs du site n&apos;est collectée par ce biais.
            </p>
            <dl className="mt-5 divide-y divide-border border-y border-border">
              <div className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="text-body font-semibold">Données TikTok</dt>
                <dd className="text-body text-muted">
                  Identifiant TikTok (open_id), nom affiché et photo de profil ; lien du profil,
                  biographie et statut vérifié ; nombre d&apos;abonnés, d&apos;abonnements, de mentions
                  « J&apos;aime » et de vidéos ; liste des vidéos publiques du compte ; vidéos,
                  légendes et paramètres de publication que le titulaire choisit de publier.
                </dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="text-body font-semibold">Données X</dt>
                <dd className="text-body text-muted">
                  Informations de profil, publications et statistiques du compte connecté, ainsi
                  que les contenus que le titulaire choisit de publier.
                </dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="text-body font-semibold">Finalité et base légale</dt>
                <dd className="text-body text-muted">
                  Publier sur le compte du titulaire les contenus qu&apos;il a préparés, et suivre
                  les performances de ces publications. Base légale : le consentement donné lors
                  de l&apos;autorisation, retirable à tout moment.
                </dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="text-body font-semibold">Ce qui n&apos;est jamais fait</dt>
                <dd className="text-body text-muted">
                  Aucune vente ni location de ces données, aucun usage publicitaire, aucun
                  croisement avec d&apos;autres sources, aucune publication sans action du
                  titulaire.
                </dd>
              </div>
              <div className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="text-body font-semibold">Retirer l&apos;accès</dt>
                <dd className="text-body text-muted">
                  À tout moment depuis TikTok (Paramètres et confidentialité, Sécurité et
                  autorisations, Gérer les applications), depuis X (Paramètres, Sécurité et accès
                  au compte, Applications et sessions), ou en écrivant à l&apos;adresse indiquée
                  plus bas. L&apos;accès est alors révoqué et les jetons supprimés.
                </dd>
              </div>
            </dl>
            <p className="mt-5 text-caption text-muted">
              Les règles de ces plateformes s&apos;appliquent également :{" "}
              <a
                href="https://www.tiktok.com/legal/privacy-policy-eea"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                politique de confidentialité de TikTok
              </a>{" "}
              et{" "}
              <a
                href="https://x.com/fr/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                politique de confidentialité de X
              </a>
              .
            </p>
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
              trois mois. Messages envoyés via le formulaire de contact, appels téléphoniques
              (enregistrement, transcription, résumé) et échanges liés à un rendez-vous : trois ans
              à compter du dernier contact. Journaux techniques : treize
              mois au maximum. Comptes TikTok et X connectés : jetons d&apos;accès conservés tant
              que la connexion est active, supprimés à la déconnexion ; statistiques et données
              de publication conservées treize mois au maximum.
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
