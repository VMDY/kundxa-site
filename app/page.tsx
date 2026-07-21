import { Appel } from "@/components/sections/appel";
import { Hero } from "@/components/sections/hero";
import { Offres } from "@/components/sections/offres";
import { Probleme } from "@/components/sections/probleme";
import { Solution } from "@/components/sections/solution";

export default function Accueil() {
  return (
    <>
      <Hero />
      <Probleme />
      <Solution />
      <Offres />
      <Appel />
    </>
  );
}
