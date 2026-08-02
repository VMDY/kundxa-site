/**
 * Toute la copy du site, en un seul endroit.
 * Les composants ne contiennent aucun texte : pour changer un mot, on edite ici.
 * Voix : brand_context/voice-profile.md — vouvoiement, zero trope gourou,
 * zero cadrage victimaire. Passe par tool-humanizer (deep) le 2026-07-21.
 *
 * Personne : « je » pour le prestataire (decision 2026-08-02). Le site melangeait
 * « je » et « on » ; le « je » a ete retenu — la garantie et la preuve reposent sur
 * un engagement personnel, que le « on » affaiblit.
 * Trois « on » subsistent volontairement, et ne sont PAS des oublis :
 *   1. inclusif — « on regarde votre boite », « on ne travaille pas ensemble » :
 *      designe le client et moi pendant l'appel. L'inverser sonnerait directif.
 *   2. impersonnel — « On vous a vendu des outils » : designe le marche, pas moi.
 *   3. maxime — « un systeme qu'on repare vite » : verite generale.
 */

export const site = {
  nom: "KUNDXA",
  tagline: "Faites tourner votre business, pas vos journées.",
  description:
    "Des systèmes agentiques éprouvés en production. J'installe les systèmes qui livrent à votre place, et je les maintiens.",
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

// Ancres prefixees par « / » : le header est affiche sur TOUTES les pages. Une
// ancre nue (#probleme) pointe vers la page courante — depuis /contact elle
// visait /contact#probleme, qui n'existe pas, et le clic ne faisait rien.
// Avec « /#probleme », le navigateur revient a l'accueil puis descend ; depuis
// l'accueil il scrolle sans recharger.
export const nav = [
  { libelle: "Le problème", href: "/#probleme" },
  { libelle: "La solution", href: "/#solution" },
  { libelle: "Les offres", href: "/#offres" },
  { libelle: "Contact", href: "/contact" },
  { libelle: "Notre newsletter", href: liens.newsletter },
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
  // Le titre porte la promesse, ce sous-titre porte le resultat mesure : delai
  // annonce (quatorze jours, aligne sur la garantie) + ce que le client garde.
  sousTitre:
    "Vos tâches répétitives sortent de vos mains en quatorze jours. Vous gardez la décision, la machine fait le reste.",
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
    // « On » impersonnel : le marche, les vendeurs d'outils. Pas moi.
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
    "Il vous manque un système conçu pour tenir sans vous. C'est ce que j'installe.",
  ],
  etapes: [
    {
      numero: "01",
      titre: "Diagnostic",
      texte:
        "Je cartographie où votre temps part et ce qui se répète. Vous repartez avec vos goulots classés par ce que chacun vous coûte.",
    },
    {
      numero: "02",
      titre: "Build",
      texte:
        "Je construis le système : n8n, Claude Code, Hermes Agent, agents vocaux quand ça s'y prête. Vous ne touchez pas au technique. Comptez une heure de votre temps par semaine.",
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
        "Je surveille, je répare, je fais évoluer. Un système qui tient, ce n'est pas un système qui ne casse jamais : c'est un système qu'on répare vite.",
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
  // « quand on sait » : inclusif — apres l'appel, vous et moi savons.
  sousTitre: "Tout est sur devis. Le prix se décide après l'appel, quand on sait ce qu'on répare.",
  principale: {
    badge: "Le cœur de l'offre",
    titre: "Build agentique sur-mesure",
    accroche: "Je construis votre système. Vous ne touchez pas au technique.",
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
        "Je construis à côté de vous, et je vous laisse capables de faire évoluer le système sans moi.",
    },
    {
      titre: "Maintenance et évolution",
      accroche: "Le système tourne. Il doit continuer.",
      texte: "Je surveille, je répare vite, je fais évoluer au rythme de votre boîte.",
    },
  ],
  mention: "Sur devis",
} as const;

/* ------------------------------------------------------------ CTA FINAL */

export const appel = {
  eyebrow: "Prochaine étape",
  titreDebut: "Un appel de cadrage. ",
  titreAccent: "Soixante minutes.",
  // Les « on » de cette section sont inclusifs : ce qui se passe pendant l'appel,
  // vous et moi. Le « je » revient des qu'il s'agit de mon engagement.
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
  ctaPage: "Voir les trois façons de me joindre",
} as const;

/* --------------------------------------------------------------- CONTACT */
/* L'appel de soixante minutes est l'engagement le plus lourd du site. Ce bloc
   est la marche du dessous : ecrire, sans bloquer de creneau. */

export const contact = {
  eyebrow: "Vous préférez écrire",
  titre: "Dites-moi en deux lignes ce qui vous bloque.",
  // Espaces insecables (U+00A0) avant « ? » et dans « 24 h » : sans elles, le
  // navigateur rejette le point d'interrogation seul en debut de ligne.
  texte:
    "Pas envie de bloquer soixante minutes tout de suite ? Écrivez. Je lis tout, et je réponds sous 24 h ouvrées.",
  champs: {
    nom: "Votre nom",
    email: "Votre e-mail",
    message: "Ce qui vous bloque",
    messagePlaceholder: "En deux lignes : ce qui vous prend le plus de temps aujourd'hui.",
  },
  bouton: "Envoyer",
  envoi: "Envoi…",
  succes: "Message reçu. Je vous réponds sous 24 h ouvrées.",
  erreur: "L'envoi n'a pas abouti. Réessayez, ou écrivez-moi directement à contact@kundxa.com.",
  ouEmail: "Ou directement :",
} as const;

/* ----------------------------------------------------------- PAGE CONTACT */
/* Les trois canaux sont ordonnes par engagement croissant : ecrire un message,
   puis bloquer un creneau. L'e-mail direct ferme la marche — c'est la sortie de
   secours de ceux qui ne veulent ni formulaire ni agenda. */

export const pageContact = {
  titre: "Trois façons de me joindre.",
  intro:
    "Choisissez celle qui vous arrange. Les trois arrivent au même endroit, et c'est moi qui réponds.",
  canaux: [
    {
      ancre: "ecrire",
      eyebrow: "Le plus simple",
      titre: "Le formulaire",
      pourQui: "Vous voulez poser le décor à votre rythme, sans bloquer de créneau.",
      repere: "Réponse sous 24 h ouvrées",
    },
    {
      ancre: "appeler",
      eyebrow: "Le plus direct",
      titre: "L'appel de cadrage",
      pourQui: "Vous voulez qu'on nomme votre goulot, et qu'on chiffre ce que coûte de le régler.",
      repere: "Soixante minutes, en visio",
    },
    {
      ancre: "email",
      eyebrow: "Sans intermédiaire",
      titre: "L'e-mail",
      pourQui: "Vous préférez votre messagerie, ou vous avez des documents à joindre.",
      repere: "contact@kundxa.com",
    },
  ],
  ecrire: {
    eyebrow: "Écrire",
    titre: "Dites-moi en deux lignes ce qui vous bloque.",
    texte:
      "Pas besoin d'un dossier complet. Ce qui vous prend le plus de temps aujourd'hui suffit à démarrer la conversation.",
  },
  appeler: {
    eyebrow: "Parler",
    titre: "Un appel de cadrage. Soixante minutes.",
    texte:
      "On regarde votre boîte, on nomme le goulot qui vous coûte le plus cher, et on décide si un système règle le problème. Si ce n'est pas le cas, je vous le dis.",
  },
  email: {
    eyebrow: "En direct",
    titre: "Ou simplement un e-mail.",
    texte:
      "Pas de formulaire, pas d'agenda. J'y réponds moi-même, dans les mêmes délais.",
    bouton: "Écrire à contact@kundxa.com",
  },
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
