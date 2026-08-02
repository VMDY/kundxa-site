import type { Metadata } from "next";
import { montserrat } from "./fonts";
import "./globals.css";
import { RevealProvider } from "@/components/reveal";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { legal, liens, site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nom} — ${site.tagline}`,
    template: `%s · ${site.nom}`,
  },
  description: site.description,
  keywords: [
    "automatisation",
    "systèmes agentiques",
    "agents IA",
    "n8n",
    "Claude Code",
    "agents vocaux",
    "automatisation entreprise",
  ],
  authors: [{ name: legal.editeur, url: liens.linkedin }],
  creator: legal.editeur,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: site.nom,
    title: `${site.nom} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nom} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

// JSON-LD : l'entreprise et ce qu'elle vend, pour les moteurs de recherche et de reponse.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: legal.nomCommercial,
  url: site.url,
  email: site.email,
  slogan: site.tagline,
  description: site.description,
  founder: { "@type": "Person", name: legal.editeur },
  address: {
    "@type": "PostalAddress",
    streetAddress: "48 rue de Brissac",
    postalCode: "49000",
    addressLocality: "Angers",
    addressCountry: "FR",
  },
  areaServed: "FR",
  sameAs: [liens.youtube, liens.x, liens.linkedin],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Systèmes agentiques",
    itemListElement: [
      "Build agentique sur-mesure",
      "Audit et diagnostic d'automatisation",
      "Accompagnement et formation",
      "Maintenance et évolution",
    ].map((nom) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: nom },
    })),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // suppressHydrationWarning : le script du head ajoute `js-reveal` sur <html>
  // avant l'hydratation — divergence attendue, limitee a cet element.
  return (
    <html lang="fr" className={montserrat.variable} suppressHydrationWarning>
      <head>
        {/* Masque les blocs a animer AVANT le premier paint (pas de FOUC), sauf si
            l'utilisateur demande moins d'animations. La revelation est ensuite
            geree par components/reveal.tsx. Script bloquant volontaire, minuscule. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-reveal')}catch(e){}",
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Premier element focusable de la page : sauter la nav au clavier.
            Cible <main> et non #haut : #haut n'existe que sur l'accueil, le lien
            ne menait donc nulle part sur /contact et les pages legales. */}
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-bg"
        >
          Aller au contenu
        </a>
        <ScrollProgress />
        <RevealProvider />
        <SiteHeader />
        <main id="contenu" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
