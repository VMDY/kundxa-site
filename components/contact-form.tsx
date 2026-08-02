"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { contact, site } from "@/content/site";

/**
 * Formulaire de contact — acheminé par Netlify Forms.
 *
 * Pas de Server Action ici, contrairement à la newsletter : Netlify récupère la
 * soumission au niveau de sa plateforme et envoie la notification par mail. Rien
 * à stocker, aucune clé API, aucune variable d'environnement.
 *
 * Les champs sont déclarés en double dans public/__forms.html — c'est ce fichier
 * que Netlify parse au build pour connaître le formulaire. Les deux listes de
 * champs doivent rester identiques.
 *
 * ⚠ L'envoi ne fonctionne QUE sur le site déployé. En `next dev`, /__forms.html
 * est servi tel quel et le POST retourne une erreur : le formulaire s'affiche et
 * se valide normalement, mais l'envoi affiche le message d'échec. C'est attendu.
 */

type Etat = { ok: boolean; message: string } | null;

const champ =
  "w-full rounded-md border border-border bg-bg px-4 py-2.5 text-body text-fg placeholder:text-muted/70 focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const etiquette = "block text-caption uppercase tracking-[0.14em] text-accent";

export function ContactForm() {
  const [etat, setEtat] = useState<Etat>(null);
  const [envoi, setEnvoi] = useState(false);

  async function envoyer(evenement: React.FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    // currentTarget est remis à null par React dès le premier await : on garde
    // la référence maintenant, tant qu'elle est valide.
    const formulaire = evenement.currentTarget;

    setEnvoi(true);
    setEtat(null);

    const parametres = new URLSearchParams();
    new FormData(formulaire).forEach((valeur, cle) => {
      parametres.append(cle, String(valeur));
    });

    try {
      const reponse = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: parametres.toString(),
      });
      if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
      setEtat({ ok: true, message: contact.succes });
      formulaire.reset();
    } catch {
      setEtat({ ok: false, message: contact.erreur });
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <form name="contact" onSubmit={envoyer} className="mt-8">
      <input type="hidden" name="form-name" value="contact" />

      {/* Piège à robots : invisible et hors du parcours clavier. Un humain ne le
          remplit jamais ; Netlify écarte la soumission s'il est rempli. */}
      <p className="hidden">
        <label>
          Ne remplissez pas ce champ <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-nom" className={etiquette}>
            {contact.champs.nom}
          </label>
          <input
            id="contact-nom"
            name="nom"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            className={`mt-2 ${champ}`}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={etiquette}>
            {contact.champs.email}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={site.email}
            className={`mt-2 ${champ}`}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className={etiquette}>
          {contact.champs.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          maxLength={5000}
          placeholder={contact.champs.messagePlaceholder}
          aria-describedby={etat ? "contact-retour" : undefined}
          className={`mt-2 resize-y ${champ}`}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button type="submit" disabled={envoi}>
          {envoi ? contact.envoi : contact.bouton}
        </Button>

        <p className="text-caption text-muted">
          {contact.ouEmail}{" "}
          <a
            href={`mailto:${site.email}`}
            className="rounded-sm text-accent underline underline-offset-4 transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {site.email}
          </a>
        </p>
      </div>

      {/* aria-live : le retour est annoncé aux lecteurs d'écran sans bouger le focus */}
      <p
        id="contact-retour"
        aria-live="polite"
        className={etat ? `mt-4 text-caption ${etat.ok ? "text-accent" : "text-muted"}` : "sr-only"}
      >
        {etat?.message ?? ""}
      </p>
    </form>
  );
}
