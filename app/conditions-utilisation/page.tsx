import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { legal, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: `Conditions d'utilisation du site ${site.url} et des services de publication connectés à TikTok et X.`,
  robots: { index: true, follow: true },
  alternates: { canonical: "/conditions-utilisation" },
};

const lien =
  "rounded-sm underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

// Date de la version en vigueur. A changer a chaque modification du texte.
const miseAJour = "3 octobre 2026";

export default function ConditionsUtilisation() {
  return (
    <Section className="pt-[calc(var(--header-h)+var(--section-py))]">
      <Container size="narrow">
        <Heading level="h1">Conditions d&apos;utilisation</Heading>
        <p className="mt-6 text-body text-muted">
          Version en vigueur au {miseAJour}. En utilisant ce site ou un service Kundxa connecté à
          un compte TikTok ou X, vous acceptez les conditions ci-dessous.
        </p>

        <div className="mt-12 space-y-12">
          <section>
            <h2 className="text-h3">1. Objet</h2>
            <p className="mt-4 text-body text-muted">
              Ces conditions encadrent l&apos;utilisation du site {site.url} et des services de
              publication proposés par {legal.nomCommercial} ({legal.editeur}), qui permettent de
              publier et de suivre des contenus sur des comptes TikTok et X dont le titulaire a
              autorisé la connexion.
            </p>
          </section>

          <section>
            <h2 className="text-h3">2. Éditeur</h2>
            <p className="mt-4 text-body text-muted">
              L&apos;identité de l&apos;éditeur et de l&apos;hébergeur figure sur la page{" "}
              <a href="/mentions-legales" className={lien}>
                Mentions légales
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h3">3. Accès au site</h2>
            <p className="mt-4 text-body text-muted">
              Le site est accessible gratuitement. Kundxa s&apos;efforce de le maintenir disponible
              mais ne garantit pas un accès sans interruption, notamment en cas de maintenance ou
              d&apos;incident chez l&apos;hébergeur.
            </p>
          </section>

          <section>
            <h2 className="text-h3">4. Connexion d&apos;un compte TikTok ou X</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-body text-muted">
              <li>
                La connexion se fait uniquement depuis l&apos;écran d&apos;autorisation officiel de
                TikTok ou de X. Kundxa ne reçoit jamais votre mot de passe.
              </li>
              <li>
                Vous choisissez les autorisations accordées et pouvez les retirer à tout moment
                depuis les paramètres de TikTok ou de X, ou en écrivant à{" "}
                <a href={`mailto:${site.email}`} className={lien}>
                  {site.email}
                </a>
                .
              </li>
              <li>
                Kundxa ne publie que les contenus que vous avez préparés et validés. Avant chaque
                publication, vous voyez le compte de destination, un aperçu du contenu, et vous
                choisissez vous-même la visibilité et les options d&apos;interaction.
              </li>
              <li>
                Les données obtenues par ces connexions sont traitées comme décrit dans la{" "}
                <a href="/confidentialite" className={lien}>
                  politique de confidentialité
                </a>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3">5. Vos engagements</h2>
            <p className="mt-4 text-body text-muted">
              Vous êtes responsable des contenus que vous publiez. Vous garantissez disposer des
              droits nécessaires (images, musique, marques, personnes filmées) et respecter les{" "}
              <a
                href="https://www.tiktok.com/legal/terms-of-service-eea"
                target="_blank"
                rel="noopener noreferrer"
                className={lien}
              >
                conditions d&apos;utilisation de TikTok
              </a>
              , ses règles communautaires et les{" "}
              <a
                href="https://x.com/fr/tos"
                target="_blank"
                rel="noopener noreferrer"
                className={lien}
              >
                conditions d&apos;utilisation de X
              </a>
              . Tout contenu promotionnel ou de partenariat rémunéré doit être signalé comme tel.
            </p>
          </section>

          <section>
            <h2 className="text-h3">6. Responsabilité</h2>
            <p className="mt-4 text-body text-muted">
              Kundxa ne peut être tenu responsable d&apos;une indisponibilité de TikTok ou de X,
              d&apos;une modification de leurs interfaces de programmation, ni des décisions de
              modération prises par ces plateformes. En cas d&apos;échec d&apos;une publication,
              Kundxa vous en informe et ne la relance pas sans votre accord.
            </p>
          </section>

          <section>
            <h2 className="text-h3">7. Propriété intellectuelle</h2>
            <p className="mt-4 text-body text-muted">
              Les contenus du site (textes, identité visuelle, logo) appartiennent à{" "}
              {legal.editeur}. Vous conservez tous les droits sur vos propres contenus ; vous
              accordez seulement à Kundxa le droit de les transmettre à TikTok ou à X pour les
              publier à votre demande.
            </p>
          </section>

          <section>
            <h2 className="text-h3">8. Modification des conditions</h2>
            <p className="mt-4 text-body text-muted">
              Ces conditions peuvent évoluer. La date de la version en vigueur figure en haut de
              cette page ; en cas de changement important, les titulaires de comptes connectés en
              sont informés par e-mail.
            </p>
          </section>

          <section>
            <h2 className="text-h3">9. Droit applicable</h2>
            <p className="mt-4 text-body text-muted">
              Ces conditions sont régies par le droit français. En cas de litige, une solution
              amiable est recherchée en priorité par écrit à{" "}
              <a href={`mailto:${site.email}`} className={lien}>
                {site.email}
              </a>
              ; à défaut, les tribunaux français compétents sont saisis.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
