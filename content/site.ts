/**
 * Toute la copy du site, en un seul endroit.
 * Les composants ne contiennent aucun texte : pour changer un mot, on edite ici.
 * Voix : brand_context/voice-profile.md — vouvoiement, zero trope gourou,
 * zero cadrage victimaire. Passe par tool-humanizer (deep) le 2026-07-21.
 */

export const site = {
  nom: "KUNDXA",
  tagline: "Faites tourner votre business, pas vos journées.",
  description:
    "Des systèmes agentiques éprouvés en production. On installe les systèmes qui livrent à votre place, et on les maintient.",
  url: "https://kundxa.com",
  email: "contact@kundxa.com",
  calcom: "kundxa/appel-de-cadrage",
  calcomUrl: "https://cal.com/kundxa/appel-de-cadrage",
  photo: "/photos/valdo.png",
} as const;

export const liens = {
  youtube: "https://www.youtube.com/@Kundxa-ai",
  x: "https://x.com/Mendy_Valdo_58",
  linkedin: "https://www.linkedin.com/in/valdo-mendy-2a3304377",
  newsletter: "https://newsletter.kundxa.com",
} as const;

export const nav = [
  { libelle: "Le problème", href: "#probleme" },
  { libelle: "La solution", href: "#solution" },
  { libelle: "Les offres", href: "#offres" },
] as const;

export const cta = {
  principal: "Réserver un appel",
  secondaire: "Voir comment ça marche",
} as const;

/* ------------------------------------------------------------------ HERO */

export const hero = {
  eyebrow: "Systèmes agentiques · Éprouvés en production",
  titreDebut: "Faites tourner votre business, pas ",
  titreAccent: "vos journées",
  sousTitre:
    "Je ne vous vends pas un outil. Je vous sors de la production. On installe les systèmes qui livrent à votre place, et on les maintient.",
  stack: ["Claude Code", "n8n", "Hermes Agent", "Agents vocaux"],
  certifications: "Certifié Claude Code (Anthropic) · n8n niveau 1 et 2 · Retell",
} as const;

/* -------------------------------------------------------------- PROBLÈME */

export const probleme = {
  eyebrow: "Le vrai problème",
  titreDebut: "Votre boîte tient debout tant que ",
  titreAccent: "vous",
  titreFin: " tenez debout.",
  recit: [
    "Dimanche, 22 h. Vous rouvrez l'ordinateur « juste pour prendre un peu d'avance ». Vous le faites chaque semaine. Ce n'est plus de l'avance, c'est de la survie.",
    "Rien ne sort de votre boîte sans passer par vous. Vous validez chaque livrable. Vous êtes le seul à connaître les accès et la logique de ce qui tourne.",
    "Vous aviez monté cette boîte pour être libre.",
  ],
  frictions: [
    {
      titre: "« Je fais trop de choses moi-même. »",
      texte:
        "Chaque livrable attend votre validation. Votre agenda est devenu la file d'attente de votre boîte.",
    },
    {
      titre: "« Ça ne tiendra pas comme ça. »",
      texte:
        "Vous savez que le modèle casse si le volume double. Alors vous ralentissez, et la croissance attend.",
    },
    {
      titre: "« Je veux du concret, pas des prompts. »",
      texte: "Vous avez assez lu sur l'IA. Vous voulez quelque chose qui tourne, sur votre vrai flux.",
    },
    {
      titre: "Le client que vous avez refusé.",
      texte:
        "Le gros. Celui que vous attendiez depuis le début. Vous avez dit non parce que vous saviez ne pas pouvoir livrer.",
    },
  ],
  essaye: {
    intro:
      "Vous avez déjà essayé. Plusieurs fois. On vous a vendu des outils quand il vous fallait un système.",
    lignes: [
      { quoi: "ChatGPT", pourquoi: "Règle le ponctuel, jamais le systémique." },
      { quoi: "Make, Zapier", pourquoi: "Casse dès que la logique se complexifie." },
      {
        quoi: "Un freelance à la tâche",
        pourquoi: "Vous repartez avec un livrable que personne ne maintient.",
      },
      { quoi: "Une formation", pourquoi: "Du contenu. Personne pour le mettre en production." },
      { quoi: "Embaucher", pourquoi: "Cher, lent, et le fond reste le même." },
    ],
  },
  punchlineDebut: "Vous n'avez pas un problème d'outil. Vous avez un problème de ",
  punchlineAccent: "place",
} as const;

/* -------------------------------------------------------------- SOLUTION */

export const solution = {
  eyebrow: "Le retournement",
  titreDebut: "Arrêtez d'être le meilleur exécutant de votre boîte. Devenez son ",
  titreAccent: "architecte",
  corps: [
    "Tant que vous êtes la meilleure paire de mains de votre boîte, vous n'en serez jamais le cerveau.",
    "Il vous manque un système conçu pour tenir sans vous. C'est ce qu'on installe.",
  ],
  etapes: [
    {
      numero: "01",
      titre: "Diagnostic",
      texte:
        "On cartographie où votre temps part et ce qui se répète. Vous repartez avec vos goulots classés par ce que chacun vous coûte.",
    },
    {
      numero: "02",
      titre: "Build",
      texte:
        "On construit le système : n8n, Claude Code, Hermes Agent, agents vocaux quand ça s'y prête. Vous ne touchez pas au technique. Comptez une heure de votre temps par semaine.",
    },
    {
      numero: "03",
      titre: "Mise en production",
      texte:
        "Le système passe en prod sur votre vrai flux, avec vos vrais clients. Premier système en production sous quatorze jours.",
    },
    {
      numero: "04",
      titre: "Évolution",
      texte:
        "On surveille, on répare, on fait évoluer. Un système qui tient, ce n'est pas un système qui ne casse jamais : c'est un système qu'on répare vite.",
    },
  ],
  preuve: {
    titre: "Ce qui tourne chez moi avant de tourner chez vous.",
    intro:
      "J'ai monté ma boîte, je me suis retrouvé au même endroit que vous, et aucun outil n'a réglé ça. Alors j'ai construit. Ce que je vous installe, je le fais tourner d'abord chez moi :",
    items: [
      {
        titre: "Kundxa OS",
        texte: "L'assistant qui pilote mon marketing, mes projets et ma mémoire de travail.",
      },
      {
        titre: "Une newsletter entièrement automatisée",
        texte: "De la recherche à l'envoi, sans intervention.",
      },
      { titre: "Hermes Agent", texte: "Mon agent IA, en ligne en permanence." },
      { titre: "Des workflows n8n en production", texte: "Pas des démos." },
    ],
    closer: "Si ça ne tient pas en prod, je ne vous le vends pas. Les coulisses sont sur YouTube. Les ratés aussi.",
    lienLibelle: "Voir les coulisses",
  },
  garanties: [
    {
      titre: "Premier système sous quatorze jours, ou vous ne payez pas cette phase.",
      note: null,
    },
    {
      titre: "Ça tient en production, ou je continue gratuitement jusqu'à ce que ça tienne.",
      note: "Sur un périmètre défini ensemble à l'avance : un cas d'usage, un critère de réussite.",
    },
  ],
} as const;

/* ---------------------------------------------------------------- OFFRES */

export const offres = {
  eyebrow: "Les offres",
  titre: "Quatre façons de travailler ensemble.",
  sousTitre: "Tout est sur devis. Le prix se décide après l'appel, quand on sait ce qu'on répare.",
  principale: {
    badge: "Le cœur de l'offre",
    titre: "Build agentique sur-mesure",
    accroche: "On construit votre système. Vous ne touchez pas au technique.",
    pourQui: "Vous savez ce qui vous bloque, et vous voulez que ce soit réglé, pas appris.",
    livre: [
      "Audit de friction",
      "Système en production sur votre flux réel",
      "Intégration à vos outils",
      "Maintenance incluse",
      "Mini-formation pour piloter",
    ],
  },
  secondaires: [
    {
      titre: "Audit et diagnostic",
      accroche: "Vous ne savez pas par où commencer.",
      texte:
        "Cartographie de ce qui peut être automatisé, et plan chiffré. Vous repartez avec le plan, même si on ne travaille pas ensemble ensuite.",
    },
    {
      titre: "Accompagnement et formation",
      accroche: "Vous voulez que votre équipe sache faire.",
      texte:
        "On construit à côté de vous, et on vous laisse capables de faire évoluer le système sans moi.",
    },
    {
      titre: "Maintenance et évolution",
      accroche: "Le système tourne. Il doit continuer.",
      texte: "On surveille, on répare vite, on fait évoluer au rythme de votre boîte.",
    },
  ],
  mention: "Sur devis",
} as const;

/* ------------------------------------------------------------ CTA FINAL */

export const appel = {
  eyebrow: "Prochaine étape",
  titreDebut: "Un appel de cadrage. ",
  titreAccent: "Soixante minutes.",
  corps:
    "On regarde votre boîte, on nomme le goulot qui vous coûte le plus cher, et on décide si un système règle le problème. Si ce n'est pas le cas, je vous le dis.",
  puces: [
    {
      titre: "Ce qu'on fait",
      texte: "On cartographie où passe votre temps et ce qui peut sortir de vos mains.",
    },
    {
      titre: "Ce que vous repartez avec",
      texte: "Votre goulot numéro un nommé, et ce que coûterait de le régler.",
    },
    {
      titre: "Ce que ça ne sera pas",
      texte: "Une démo, ni un argumentaire de vente déguisé.",
    },
  ],
  closer:
    "Vous pouvez regarder ça de loin. Ou on regarde ensemble, ce mois-ci, ce qui peut sortir de vos mains.",
} as const;

/* ---------------------------------------------------------------- FOOTER */

export const footer = {
  newsletter: {
    titre: "La newsletter",
    texte: "Une fois par semaine, ce que je construis vraiment. Ce qui marche, et ce qui a cassé.",
    placeholder: "vous@votreboite.fr",
    bouton: "S'abonner",
    succes: "C'est fait. Vous recevrez la prochaine.",
    erreur: "L'inscription n'a pas abouti. Réessayez, ou écrivez-moi directement.",
    emailInvalide: "Cette adresse ne semble pas valide.",
  },
} as const;

/* ------------------------------------------------- IDENTITÉ LÉGALE (LCEN) */

export const legal = {
  editeur: "Valdo Mendy",
  formeJuridique: "Entrepreneur individuel",
  nomCommercial: "KUNDXA",
  siren: "845 116 532",
  siret: "845 116 532 00050",
  ape: "62.02A — Conseil en systèmes et logiciels informatiques",
  adresse: "48 rue de Brissac, 49000 Angers, France",
  tva: "TVA non applicable, article 293 B du CGI",
  hebergeur: "Netlify, Inc. — 2325 3rd Street, Suite 296, San Francisco, CA 94107, États-Unis",
  hebergeurSite: "https://www.netlify.com",
} as const;
