import type { Metadata } from "next";
import { Selecteur } from "@/components/offres/selecteur";
import { engagements, offres } from "@/content/site";
import "./offres.css";

export const metadata: Metadata = {
  title: offres.meta.titre,
  description: offres.meta.description,
  alternates: { canonical: "/offres" },
};

/*
  Grammaire « surface utile » : la vraie question d'un dirigeant ici est
  « laquelle pour moi ». La page est un outil : on choisit sa situation, l'offre
  se compose, et le choix part avec la demande de contact.
*/
export default function Offres() {
  return (
    <div className="of">
      <header className="of-tete">
        <p className="of-label">{offres.hero.surtitre}</p>
        <h1 className="of-h1">
          {offres.hero.titre[0]}
          <em>{offres.hero.titre[1]}</em>
          {offres.hero.titre[2]}
        </h1>
        <p className="of-chapeau">{offres.hero.texte}</p>
      </header>

      <Selecteur />

      <section className="of-engagements" aria-labelledby="of-eng">
        <p className="of-label of-label--or">{engagements.surtitre}</p>
        <h2 id="of-eng" className="of-h2">
          {engagements.titre[0]}
          <em>{engagements.titre[1]}</em>
          {engagements.titre[2]}
        </h2>
        <ol data-sc-in data-sc-stagger="80">
          {engagements.items.map((it) => (
            <li key={it.titre}>
              <p className="of-eng__titre">{it.titre}</p>
              <p className="of-texte">{it.note}</p>
            </li>
          ))}
        </ol>
        <p className="of-mention">{offres.mention}</p>
      </section>
    </div>
  );
}
