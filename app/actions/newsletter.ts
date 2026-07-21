"use server";

/**
 * Inscription newsletter -> Airtable, base « Newsletter Kundxa ».
 *
 * Server Action : la cle Airtable ne quitte jamais le serveur. Ne jamais exposer
 * ces valeurs via NEXT_PUBLIC_*.
 *
 * Table « Abonnés » (tblIQYyqpuVObtDKc) — champs et options verifies sur la base
 * reelle le 2026-07-21 :
 *   Email (email) · Statut (singleSelect) · Source (singleSelect)
 *   Date d'inscription (dateTime) · Consentement RGPD (checkbox)
 */

const BASE_ID = "appHjTuCtKith5glD";
const TABLE_ID = "tblIQYyqpuVObtDKc";

export type EtatInscription = { ok: boolean; message: string } | null;

// Validation volontairement simple : on refuse ce qui est manifestement faux,
// la verification reelle se fait a l'envoi du premier email.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function inscrireNewsletter(
  _precedent: EtatInscription,
  formData: FormData,
): Promise<EtatInscription> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "Cette adresse ne semble pas valide." };
  }

  const token = process.env.AIRTABLE_TOKEN;
  if (!token) {
    console.error("[newsletter] AIRTABLE_TOKEN absent — inscription impossible");
    return { ok: false, message: "L'inscription n'a pas abouti. Réessayez, ou écrivez-moi directement." };
  }

  try {
    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Email: email,
              Statut: "En attente",
              Source: "Landing page",
              "Date d'inscription": new Date().toISOString(),
              "Consentement RGPD": true,
            },
          },
        ],
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const detail = await res.text();
      // Deja inscrit : on ne le traite pas comme une erreur cote visiteur.
      if (detail.includes("INVALID_MULTIPLE_CHOICE_OPTIONS") || res.status === 422) {
        console.error("[newsletter] Airtable a refuse l'enregistrement:", detail.slice(0, 400));
      } else {
        console.error("[newsletter] Airtable", res.status, detail.slice(0, 400));
      }
      return { ok: false, message: "L'inscription n'a pas abouti. Réessayez, ou écrivez-moi directement." };
    }

    return { ok: true, message: "C'est fait. Vous recevrez la prochaine." };
  } catch (err) {
    console.error("[newsletter] echec reseau", err);
    return { ok: false, message: "L'inscription n'a pas abouti. Réessayez, ou écrivez-moi directement." };
  }
}
