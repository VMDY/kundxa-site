import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { Container } from "@/components/ui/container";
import { IconLinkedin, IconMail, IconX, IconYoutube } from "@/components/ui/icons";
import { footer, legal, liens, nav, site } from "@/content/site";

// `couleur` = couleur officielle de la marque, en style inline (les icones sont
// en `currentColor`). Deux choix a connaitre :
//  - X n'a pas de couleur : son glyphe est noir ou blanc. Sur fond sombre, blanc.
//  - LinkedIn : #378FE9 et non #0A66C2. C'est la declinaison que LinkedIn prescrit
//    sur fond sombre ; le bleu standard tombe a 3,4:1 de contraste ici.
// L'e-mail n'est pas une marque tierce : il garde l'or du site.
const reseaux = [
  { libelle: "YouTube", href: liens.youtube, Icone: IconYoutube, couleur: "#FF0000" },
  { libelle: "LinkedIn", href: liens.linkedin, Icone: IconLinkedin, couleur: "#378FE9" },
  { libelle: "X", href: liens.x, Icone: IconX, couleur: "#FFFFFF" },
  { libelle: "E-mail", href: `mailto:${site.email}`, Icone: IconMail, couleur: "var(--color-gold)" },
];

const legaux = [
  { libelle: "Mentions légales", href: "/mentions-legales" },
  { libelle: "Confidentialité", href: "/confidentialite" },
  { libelle: "Conditions d'utilisation", href: "/conditions-utilisation" },
];

const lien =
  "rounded-sm text-muted transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-deep pt-20 pb-10">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.6fr_1.3fr] lg:gap-16">
          <div>
            <Image
              src="/logos/kundxa-lockup-golden.png"
              alt={site.nom}
              width={871}
              height={269}
              className="h-8 w-auto"
            />
            <p className="mt-5 font-serif text-h3 italic text-paper">{site.signature}</p>
            <ul className="mt-8 flex gap-3">
              {reseaux.map(({ libelle, href, Icone, couleur }) => (
                <li key={libelle}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{ color: couleur }}
                    className="grid h-10 w-10 place-items-center rounded-sm border border-white/12 bg-white/[0.03] transition-[border-color,background-color] hover:border-current hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <span className="sr-only">{libelle}</span>
                    <Icone className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Pied de page">
            <p className="font-mono text-label uppercase text-gold">{footer.colonnes.site}</p>
            <ul className="mt-5 space-y-3 text-small">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={lien}>
                    {item.libelle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-serif text-h3 text-paper">{footer.newsletter.titre}</p>
            <p className="mt-3 max-w-md text-small text-muted">{footer.newsletter.texte}</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-caption text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nom} · {legal.editeur} ·{" "}
            <a href={`mailto:${site.email}`} className={lien}>
              {site.email}
            </a>{" "}
            ·{" "}
            <a href={site.telephoneUrl} className={lien}>
              {site.telephone}
            </a>
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legaux.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={lien}>
                  {item.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
