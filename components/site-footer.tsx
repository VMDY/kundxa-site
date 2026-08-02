import Image from "next/image";
import { NewsletterForm } from "@/components/newsletter-form";
import { Container } from "@/components/ui/container";
import { IconLinkedin, IconMail, IconX, IconYoutube } from "@/components/ui/icons";
import { footer, legal, liens, site } from "@/content/site";

// Chaque reseau porte un aria-label explicite : l'icone seule ne dit rien a un
// lecteur d'ecran.
//
// `couleur` = couleur officielle de la marque, appliquee en style inline (les
// icones sont en `currentColor`). Deux choix a connaitre :
//  - X n'a pas de couleur : son glyphe est noir ou blanc. Sur notre fond sombre,
//    c'est blanc.
//  - LinkedIn : #378FE9 et non #0A66C2. C'est la declinaison que LinkedIn lui-meme
//    prescrit sur fond sombre ; le bleu standard tombe a 3,4:1 de contraste ici,
//    et parait terne a cote du rouge YouTube.
// La newsletter n'est pas une marque tierce : elle garde l'accent du site
// (couleur nulle -> la classe `text-accent` s'applique).
const reseaux = [
  { href: liens.youtube, libelle: "Chaîne YouTube de Kundxa", Icone: IconYoutube, couleur: "#FF0000" },
  { href: liens.x, libelle: "Compte X de Kundxa", Icone: IconX, couleur: "#FFFFFF" },
  { href: liens.linkedin, libelle: "Profil LinkedIn de Valdo Mendy", Icone: IconLinkedin, couleur: "#378FE9" },
  { href: liens.newsletter, libelle: "La newsletter Kundxa", Icone: IconMail, couleur: null },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Image
              src="/logos/kundxa-logo.png"
              alt={site.nom}
              width={560}
              height={178}
              className="h-10 w-auto"
            />
            <p className="mt-5 max-w-sm text-body text-muted">{site.tagline}</p>

            <ul className="mt-8 flex items-center gap-3">
              {reseaux.map(({ href, libelle, Icone, couleur }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={libelle}
                    title={libelle}
                    // Le survol ne touche plus a la couleur : un style inline la
                    // rendrait insurchargeable en CSS. Le retour visuel passe
                    // donc par la bordure seule.
                    style={couleur ? { color: couleur } : undefined}
                    className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-accent transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <Icone className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pl-10">
            <h2 className="text-h3">{footer.newsletter.titre}</h2>
            <p className="mt-3 max-w-md text-body text-muted">{footer.newsletter.texte}</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-muted">
            © {new Date().getFullYear()} {legal.nomCommercial} · {legal.editeur} ·{" "}
            <a
              href={`mailto:${site.email}`}
              className="rounded-sm underline underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {site.email}
            </a>
          </p>
          <nav aria-label="Liens légaux" className="flex gap-6">
            <a
              href="/mentions-legales"
              className="rounded-sm text-caption text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Mentions légales
            </a>
            <a
              href="/confidentialite"
              className="rounded-sm text-caption text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Confidentialité
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
