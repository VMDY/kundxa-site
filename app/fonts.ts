// Les trois familles du Brand Book v1.0 (brand_context/visual-identity/identity.md) :
// Fraunces pour les titres (un seul mot en italique), IBM Plex Sans pour le texte,
// IBM Plex Mono pour les reperes, chiffres et etiquettes.
// next/font/google telecharge les polices au BUILD et les auto-heberge : aucune
// requete runtime vers Google (RGPD + Lighthouse). Ne jamais ajouter de <link> Google Fonts.
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

// Police variable : on omet `weight` pour charger l'axe complet, et on garde
// l'axe optique (opsz) qui affine le dessin aux grandes tailles.
export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-sans",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});
