"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { inscrireNewsletter, type EtatInscription } from "@/app/actions/newsletter";
import { Button } from "@/components/ui/button";
import { footer } from "@/content/site";

function Soumettre() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" disabled={pending} className="sm:px-6">
      {pending ? "Envoi…" : footer.newsletter.bouton}
    </Button>
  );
}

export function NewsletterForm() {
  const [etat, action] = useActionState<EtatInscription, FormData>(inscrireNewsletter, null);

  return (
    <form action={action} className="mt-5">
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
          className="w-full rounded-md border border-border bg-bg px-4 py-2.5 text-body text-fg placeholder:text-muted/70 focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        <Soumettre />
      </div>

      {/* aria-live : le retour est annonce aux lecteurs d'ecran sans deplacer le focus */}
      <p
        id="newsletter-retour"
        aria-live="polite"
        className={etat ? `mt-3 text-caption ${etat.ok ? "text-accent" : "text-muted"}` : "sr-only"}
      >
        {etat?.message ?? ""}
      </p>
    </form>
  );
}
