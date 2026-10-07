import type { Metadata } from "next";
import { fraunces, plexMono, plexSans } from "./fonts";
import "./globals.css";
import { RevealProvider } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { accueil, legal, liens, offres, site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: accueil.meta.titre,
    template: `%s · ${site.nom}`,
  },
  description: accueil.meta.description,
  keywords: [
    "automatisation",
    "agents IA",
    "agent vocal",
    "n8n",
    "Claude",
    "relance factures impayées",
    "TPE",
    "PME",
    "dirigeant",
  ],
  authors: [{ name: legal.editeur, url: liens.linkedin }],
  creator: legal.editeur,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: site.nom,
    title: accueil.meta.titre,
    description: accueil.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: accueil.meta.titre,
    description: accueil.meta.description,
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
  slogan: site.signature,
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
  sameAs: [liens.youtube, liens.linkedin, liens.x],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Systèmes IA pour dirigeants",
    itemListElement: [offres.principale.titre, ...offres.secondaires.map((o) => o.titre)].map(
      (nom) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: nom },
      }),
    ),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // suppressHydrationWarning : le script du head ajoute `js-reveal` sur <html>
  // avant l'hydratation — divergence attendue, limitee a cet element.
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
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
        {/* Premier element focusable : sauter la nav au clavier. */}
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:font-semibold focus:text-midnight"
        >
          Aller au contenu
        </a>
        <RevealProvider />
        <SiteHeader />
        <main id="contenu" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
