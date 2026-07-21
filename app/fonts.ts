// Montserrat est la seule famille de la marque (moves.md #11 : « typo mono-famille »).
// next/font/google telecharge la police au BUILD et l'auto-heberge : aucune requete
// runtime vers Google (RGPD + Lighthouse). Ne jamais ajouter de <link> Google Fonts.
import { Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  // Montserrat est une police variable. On omet `weight` volontairement : cela charge
  // l'axe complet (100-900), qui couvre toute l'echelle typo (300/400/600/700/800).
  display: "swap",
  variable: "--font-montserrat",
});
