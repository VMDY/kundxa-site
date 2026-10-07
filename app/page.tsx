import { Appel } from "@/components/blocks/appel";
import { Faq } from "@/components/blocks/faq";
import { Hero } from "@/components/home/hero";
import {
  Fondateur,
  Limites,
  MethodeApercu,
  OffresApercu,
  Ouverture,
  Preuves,
  RealisationsApercu,
  Systeme,
} from "@/components/home/sections";

export default function Accueil() {
  return (
    <>
      <Hero />
      <Preuves />
      <Ouverture />
      <Systeme />
      <RealisationsApercu />
      <MethodeApercu />
      <Limites />
      <OffresApercu />
      <Fondateur />
      <Faq />
      <Appel />
    </>
  );
}
