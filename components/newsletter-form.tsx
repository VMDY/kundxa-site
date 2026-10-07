"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { inscrireNewsletter, type EtatInscription } from "@/app/actions/newsletter";
import { Button } from "@/components/ui/button";
import { footer } from "@/content/site";

function Soumettre() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="sm:px-6">
      {pending ? "Envoi…" : footer.newsletter.bouton}
    </Button>
  );
}

export function NewsletterForm() {
  const [etat, action] = useActionState<EtatInscription, FormData>(inscrireNewsletter, null);

  return (
    <form action={action} className="mt-5">
      {/* Piège à robots : invisible et hors du parcours clavier (voir l'action). */}
      <p className="hidden">
        <label>
          Ne remplissez pas ce champ <input name="site_web" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Votre adresse e-mail
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={footer.newsletter.placeholder}
          aria-describedby={etat ? "newsletter-retour" : undefined}
          className="w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-small text-paper placeholder:text-muted/70 focus-visible:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        />
        <Soumettre />
      </div>

      {/* aria-live : le retour est annonce aux lecteurs d'ecran sans deplacer le focus */}
      <p
        id="newsletter-retour"
        aria-live="polite"
        className={etat ? `mt-3 text-caption ${etat.ok ? "text-gold" : "text-muted"}` : "sr-only"}
      >
        {etat?.message ?? ""}
      </p>
      {!etat?.ok && <p className="mt-3 text-caption text-muted/80">{footer.newsletter.mention}</p>}
    </form>
  );
}
