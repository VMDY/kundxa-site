"use server";

/**
 * Inscription newsletter -> le circuit de newsletter.kundxa.com (/api/subscribe).
 *
 * Un seul circuit pour les deux sites : la fonction Netlify du projet
 * kundxa-newsletter range l'adresse dans Notion (Statut « En attente »), envoie
 * l'e-mail de confirmation (double opt-in), puis le message de bienvenue avec la
 * checklist. Valdo reçoit l'alerte Telegram quand l'inscription est confirmée.
 *
 * Appel serveur a serveur : pas de CORS, rien a exposer au navigateur.
 * NEWSLETTER_API_URL permet de viser un deploy preview ; par defaut, la prod.
 */

import { footer } from "@/content/site";

export type EtatInscription = { ok: boolean; message: string } | null;

// Validation volontairement simple : on refuse ce qui est manifestement faux,
// la verification reelle se fait par l'e-mail de confirmation.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const API = process.env.NEWSLETTER_API_URL ?? "https://newsletter.kundxa.com/api/subscribe";
const { succes: SUCCES, erreur: ECHEC, emailInvalide } = footer.newsletter;

export async function inscrireNewsletter(
  _precedent: EtatInscription,
  formData: FormData,
): Promise<EtatInscription> {
  // Piège à robots : un humain ne voit pas ce champ. Rempli -> on fait comme si
  // tout s'était bien passé, sans rien enregistrer.
  if (String(formData.get("site_web") ?? "") !== "") {
    return { ok: true, message: SUCCES };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: emailInvalide };
  }

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Le consentement est l'envoi du formulaire, sous la mention affichée ; le
      // double opt-in le confirme.
      body: JSON.stringify({ email, consentement: true, website: "", source: "kundxa.com" }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      console.error("[newsletter] /api/subscribe", res.status, (await res.text()).slice(0, 400));
      return { ok: false, message: ECHEC };
    }

    return { ok: true, message: SUCCES };
  } catch (err) {
    console.error("[newsletter] echec reseau", err);
    return { ok: false, message: ECHEC };
  }
}
