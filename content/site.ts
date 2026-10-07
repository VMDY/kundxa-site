/**
 * Toute la copy du site, en un seul endroit. Les composants ne contiennent aucun
 * texte : pour changer un mot, on edite ici.
 *
 * Source : agentic-os/projects/briefs/kundxa-site/2026-10-06_copy-site.md
 * (mkt-copywriting + tool-humanizer deep, 2026-10-07). Angle « Ce qui merite un
 * dirigeant » (brand_context/positioning.md). Voix : vouvoiement, « nous » pour
 * Kundxa (le parcours du fondateur à la troisième personne), zero promesse gourou, zero cadrage par la peur, aucun chiffre invente.
 *
 * Typographie francaise : `fr()` pose les espaces insecables (U+00A0) avant
 * « ? ! : ; » et a l'interieur des guillemets. Ecrire ici avec des espaces normales.
 */

function fr<T>(valeur: T): T {
  if (typeof valeur === "string") {
    return valeur
      .replace(/ ([?!:;»])/g, " $1")
      .replace(/« /g, "« ")
      .replace(/(\d) (%|h\b)/g, "$1 $2") as T;
  }
  if (Array.isArray(valeur)) return valeur.map(fr) as T;
  if (valeur && typeof valeur === "object") {
    return Object.fromEntries(Object.entries(valeur).map(([k, v]) => [k, fr(v)])) as T;
  }
  return valeur;
}

export const site = {
  nom: "Kundxa",
  signature: "Ce qui mérite un dirigeant.",
  description:
    "Nous construisons les systèmes qui prennent en charge vos tâches répétitives et la recherche qui prépare vos décisions. Ils tournent en production. Les décisions restent les vôtres.",
  url: "https://kundxa.com",
  email: "contact@kundxa.com",
  // Espaces insécables : le numéro ne se coupe jamais en fin de ligne.
  telephone: "09 74 06 47 40",
  telephoneUrl: "tel:+33974064740",
  calcom: "kundxa/appel-de-cadrage",
  calcomUrl: "https://cal.com/kundxa/appel-de-cadrage",
  photo: "/photos/valdo.png",
  videoRelance: "https://youtu.be/9ZJqZRpblBs",
} as const;

export const liens = {
  youtube: "https://www.youtube.com/@Kundxa-ai",
  linkedin: "https://www.linkedin.com/in/valdomendy",
  x: "https://x.com/Mendy_Valdo_58",
  tiktok: "https://www.tiktok.com/@kundxa_ai",
  instagram: "https://www.instagram.com/valdo_kundxa/",
  newsletter: "https://newsletter.kundxa.com",
} as const;

export const nav = [
  { libelle: "Réalisations", href: "/realisations" },
  { libelle: "Méthode", href: "/methode" },
  { libelle: "Offres", href: "/offres" },
  { libelle: "À propos", href: "/a-propos" },
  { libelle: "Contact", href: "/contact" },
] as const;

export const cta = fr({
  court: "Réserver un appel",
  principal: "Réserver un appel de cadrage",
  final: "Réserver mon appel de cadrage",
  ecrire: "Ou nous écrire en deux lignes",
  realisations: "Voir les réalisations",
} as const);

/* ------------------------------------------------------------------ PREUVES */

export const preuves = fr([
  { avant: "Construit avec", fort: "n8n · Claude · Retell", apres: "" },
  { avant: "Certifié", fort: "Claude Code", apres: "(Anthropic)" },
  { avant: "", fort: "n8n", apres: "niveaux 1 et 2" },
  { avant: "Coulisses sur", fort: "YouTube", apres: ", ratés compris" },
] as const);

/* -------------------------------------------------------------------- ACCUEIL */

export const accueil = fr({
  meta: {
    titre: "Kundxa · Systèmes IA pour dirigeants de TPE et PME",
    description:
      "Nous construisons les systèmes qui prennent en charge vos tâches répétitives et la recherche qui prépare vos décisions. Ils tournent en production. Les décisions restent les vôtres.",
  },
  hero: {
    surtitre: "Agents IA et automatisations · En production",
    titre: ["Gardez votre énergie pour ce qui mérite un ", "dirigeant", "."],
    sousTitre:
      "Nous construisons les systèmes qui prennent en charge vos tâches répétitives et la recherche qui prépare vos décisions. Ils tournent chaque jour, sans vous. Les décisions, elles, restent les vôtres.",
    micro: "Soixante minutes en visio · votre goulot numéro un nommé",
    photoAlt: "Valdo Mendy, fondateur de Kundxa",
    // Cartes d'interface du hero : illustration d'une matinee type, pas un rapport client.
    cartes: {
      resume: {
        titre: "Résumé du matin",
        heure: "08:00",
        lignes: [
          ["Relances envoyées", "3"],
          ["Paiements reçus", "1"],
          ["Décisions pour vous", "1"],
        ],
      },
      relance: {
        titre: "Palier 2 · J+10",
        etat: "Envoyée",
        texte: "Facture n° 2026-114 · « Quelle date de règlement ? »",
      },
      decision: {
        titre: "Décision de dirigeant",
        etat: "Maintenant",
        texte: ["Dossier complet à J+45. ", "Mise en demeure, ou échéancier", " pour ce client fidèle ?"],
        boutons: ["Échéancier", "Je l'appelle"],
      },
    },
  },
  ouverture: {
    surtitre: "Ce que fait un système",
    titre: ["Votre boîte peut aller plus ", "loin", "."],
    texte:
      "Ce qui la retient, c'est le temps que vous passez sur des tâches qui ne méritent pas un dirigeant. Un système bien construit prend ce travail en charge, chaque jour, à l'heure.",
    colonnes: [
      {
        icone: "repeat",
        surtitre: "Le répétitif",
        titre: "Ce qui revient chaque semaine tourne tout seul.",
        texte:
          "Relances de factures, suivi des commandes, reporting, saisie. Sans attendre que vous y pensiez.",
      },
      {
        icone: "search",
        surtitre: "La recherche",
        titre: "Vos soirées de recherche, prêtes quand il faut.",
        texte:
          "Veille sur votre marché, analyse de vos chiffres, comparaison des options avant une grande décision.",
      },
      {
        icone: "decision",
        surtitre: "Ce qui vous revient",
        titre: "Un résumé chaque matin. Les décisions, à vous.",
        texte:
          "Ce qui s'est passé, l'état de votre trésorerie, et seulement ce qui mérite un dirigeant.",
      },
    ],
  },
  systeme: {
    surtitre: "En production",
    titre: ["Le système qui relance vos factures ", "impayées", "."],
    texte:
      "Seules 26 % des entreprises françaises automatisent leurs relances de factures. Les autres relancent à la main, par e-mail ou par téléphone. Ce système suit cinq paliers et s'arrête dès que le paiement arrive.",
    source: {
      libelle: "Baromètre Payt × Ipsos, avril 2026",
      href: "https://finyear.com/impayes-53-des-entreprises-francaises-ont-vu-leur-perennite-financiere-menacee-selon-le-premier-barometre-payt-x-ipsos",
    },
    faits: [
      { cle: "Coût", texte: "1 centime par facture, tout au plus." },
      { cle: "Règle", texte: "Un paiement reçu arrête tout." },
      { cle: "Garde-fou", texte: "Il ne devine jamais une adresse." },
      { cle: "Limite", texte: "Il n'appelle pas vos clients. En tout cas, pas le nôtre." },
    ],
    video: "Voir le système tourner, en vidéo",
    // Les cinq paliers tels que decrits dans la video « Factures impayees ».
    schema: {
      fenetre: "relance-factures · en production",
      noeuds: [
        { id: "lecture", cle: "Chaque matin, 8 h", texte: "Lit les factures à payer" },
        { id: "p1", cle: "Palier 1 · J+3", texte: "Rappel simple, facture jointe" },
        { id: "p2", cle: "Palier 2 · J+10", texte: "« Quelle date de règlement ? »" },
        { id: "p3", cle: "Palier 3 · J+20", texte: "Récapitulatif, pénalités annoncées" },
        { id: "p4", cle: "Palier 4 · J+30", texte: "Appel : c'est vous qui décrochez" },
        { id: "p5", cle: "Palier 5 · J+45", texte: "Le dossier complet vous revient" },
        { id: "stop", cle: "Règle", texte: "Paiement reçu : tout s'arrête" },
        { id: "garde", cle: "Garde-fou", texte: "Adresse absente : on vous demande" },
      ],
    },
  },
  realisations: {
    surtitre: "Réalisations",
    titre: ["Ce qui tourne déjà chez d'autres ", "dirigeants", "."],
    texte: "Des cas réels. Les noms des clients restent confidentiels.",
    lien: "Toutes les réalisations",
  },
  methode: {
    surtitre: "Méthode",
    titre: ["Automatiser une mauvaise relance, c'est relancer mal plus ", "vite", "."],
    texte: "Nous commençons donc par votre vraie semaine, jamais par un catalogue d'outils.",
    lien: "La méthode en détail",
  },
  limites: {
    surtitre: "Limites",
    titre: ["Ce que nos systèmes ne feront pas, et c'est ", "voulu", "."],
    items: [
      {
        titre: "Décider à votre place",
        texte:
          "Les choix de dirigeant vous reviennent, avec une alerte claire et les éléments pour trancher.",
      },
      {
        titre: "Deviner",
        texte: "Quand une information manque, le système s'arrête et vous pose la question.",
      },
      {
        titre: "Remplacer votre expert-comptable",
        texte: "Les questions juridiques, fiscales et financières se règlent avec votre conseil.",
      },
    ],
  },
  offres: {
    surtitre: "Offres",
    titre: ["Quatre façons de travailler ", "ensemble", "."],
    lien: "Le détail des offres",
  },
  fondateur: {
    surtitre: "Le fondateur",
    citation: [
      "« Les dirigeants ne manquaient pas d'ambition. Il leur manquait quelqu'un pour leur montrer comment faire, ",
      "concrètement",
      ". »",
    ],
    texte: [
      "En 2024, Valdo faisait tourner seul sa boutique en ligne. Il a automatisé ce qui l'empêchait d'avancer, par nécessité, pas par curiosité.",
      "Ce que nous vous installons tourne d'abord chez nous. Les coulisses sont sur YouTube, ratés compris.",
    ],
    badgeNom: "Valdo Mendy",
    badgeRole: "fondateur de Kundxa",
    badgeCertifs: "Claude Code (Anthropic) · n8n niveaux 1 et 2 · Retell",
    lien: "Son parcours",
  },
  faq: {
    surtitre: "Questions",
    titre: ["Ce qu'on nous demande avant de ", "commencer", "."],
  },
} as const);

export const faq = fr([
  {
    q: "Je ne suis pas technique. Est-ce que je saurai m'en servir ?",
    r: "Vous n'avez rien à configurer. Le système vous écrit en français clair, par e-mail ou sur votre téléphone. La maintenance fait partie de notre travail.",
  },
  {
    q: "Et si l'IA se trompe avec mes clients ?",
    r: "Chaque étape sensible a un garde-fou. Le système ne devine jamais. Quand une information manque, il s'arrête et vous pose la question.",
  },
  {
    q: "J'ai déjà essayé des outils, ça n'a rien changé.",
    r: "Un outil posé sur une organisation ne la change pas. Nous partons de votre semaine réelle, nous construisons le système autour, et nous restons pour le maintenir.",
  },
  {
    q: "Pourquoi pas une embauche ?",
    r: "Une embauche se paie à l'heure et s'arrête le soir. Un système tourne en continu, et son coût de fonctionnement se compte souvent en centimes : 1 centime par facture pour le système de relance. Gardez l'humain pour ce qui demande un humain.",
  },
  {
    q: "Combien de temps ça me demande ?",
    r: "Environ une heure par semaine pendant la construction. Ensuite, le temps de lire votre résumé du matin.",
  },
] as const);

/* -------------------------------------------------------------- APPEL FINAL */

export const appel = fr({
  surtitre: "Prochaine étape",
  titre: ["Un appel de cadrage. Soixante ", "minutes", "."],
  texte:
    "On regarde votre boîte, on nomme le goulot qui vous coûte le plus cher, et on décide si un système règle le problème. Si ce n'est pas le cas, nous vous le disons.",
  puces: [
    { titre: "Ce qu'on fait", texte: "On cartographie où passe votre temps et ce qui peut sortir de vos mains." },
    { titre: "Ce que vous repartez avec", texte: "Votre goulot numéro un nommé, et ce que coûterait de le régler." },
    { titre: "Ce que ça ne sera pas", texte: "Une démo, ni un argumentaire de vente déguisé." },
  ],
  closer: "Vous pouvez regarder ça de loin, ou construire avec.",
  carte: {
    titre: "Appel de cadrage",
    sousTitre: "60 min · visio · avec Valdo",
    jours: ["LUN", "MAR", "MER", "JEU", "VEN"],
    creneaux: ["09:00", "10:30", "14:00", "15:30", "17:00", "18:00"],
    note: "Ou écrivez-nous en deux lignes · contact@kundxa.com",
  },
} as const);

/* --------------------------------------------------------------- MÉTHODE */

export const etapes = fr([
  {
    numero: "01",
    titre: "Diagnostic",
    court: "Nous cartographions où part votre temps. Vous repartez avec vos goulots classés par coût.",
    nousFaisons: "Un entretien sur votre semaine réelle, la cartographie de ce qui se répète, le coût de chaque goulot.",
    vousFaites: "Vous nous montrez comment ça se passe aujourd'hui.",
    vousRecevez: "Vos goulots classés par coût, et l'ordre dans lequel les régler.",
  },
  {
    numero: "02",
    titre: "Construction",
    court: "Brique par brique, testé sur vos vrais cas. Une heure de votre temps par semaine.",
    nousFaisons: "Nous construisons le système brique par brique et nous le testons sur vos vrais cas.",
    vousFaites: "Une heure par semaine pour valider ce qui part en production.",
    vousRecevez: "Un système testé avant de toucher à vos clients.",
  },
  {
    numero: "03",
    titre: "Mise en production",
    court: "Sur votre vrai flux, avec un garde-fou à chaque étape sensible.",
    nousFaisons: "Nous branchons le système sur votre vrai flux, avec un garde-fou à chaque étape sensible.",
    vousFaites: "Vous suivez une courte formation pour piloter.",
    vousRecevez: "Un résumé chaque matin, et une alerte quand une décision vous revient.",
  },
  {
    numero: "04",
    titre: "Suivi",
    court: "Tout système casse un jour. Celui-ci est surveillé, et nous le réparons vite.",
    nousFaisons: "Nous surveillons, nous réparons, nous faisons évoluer le système avec votre boîte.",
    vousFaites: "Vous nous dites ce qui change chez vous.",
    vousRecevez: "Un système qui tient dans la durée. Tout système casse un jour. Celui-ci est surveillé, et nous le réparons vite.",
  },
] as const);

export const methode = fr({
  meta: {
    titre: "Méthode",
    description:
      "Diagnostic, construction, mise en production, suivi. Comment nous construisons des systèmes qui tiennent, et ce qu'ils vous rendent.",
  },
  hero: {
    surtitre: "Méthode",
    titre: ["Nous commençons par votre ", "semaine", "."],
    texte:
      "Automatiser une mauvaise relance, c'est relancer mal plus vite. Avant de choisir un outil, nous regardons comment le travail circule chez vous, où il bloque et ce que chaque blocage vous coûte.",
  },
  colonnes: { nousFaisons: "Nous faisons", vousFaites: "Vous faites", vousRecevez: "Vous recevez" },
  principes: {
    surtitre: "Principes",
    titre: ["Quatre règles, sur chaque ", "système", "."],
    items: [
      { titre: "Le processus avant l'outil", texte: "Un mauvais processus automatisé produit des erreurs plus vite." },
      { titre: "Un garde-fou à chaque étape sensible", texte: "Le système ne devine jamais. Il s'arrête et demande." },
      { titre: "Les décisions restent les vôtres", texte: "Le système prépare, vous tranchez." },
      { titre: "Tout est montré", texte: "Ce qui marche et ce qui casse, sur YouTube." },
    ],
  },
  outils: {
    surtitre: "Les outils",
    titre: ["Chaque outil, en une ", "ligne", "."],
    items: [
      { nom: "n8n", texte: "relie vos logiciels entre eux et déclenche les actions au bon moment." },
      { nom: "Claude", texte: "l'IA d'Anthropic, lit, rédige et analyse vos documents." },
      { nom: "Retell", texte: "fait tourner des agents vocaux qui répondent au téléphone selon un script que vous avez validé." },
      {
        nom: "Hermes Agent",
        texte:
          "un assistant IA open source qui tourne en continu sur votre propre serveur, répond sur Telegram ou WhatsApp et exécute vos tâches récurrentes à heure fixe.",
      },
    ],
  },
} as const);

/* ----------------------------------------------------------- ENGAGEMENTS */

export const engagements = fr({
  surtitre: "Engagements",
  titre: ["Ce qui est écrit dans le ", "devis", "."],
  items: [
    {
      titre: "Ça tient en production, ou nous continuons gratuitement jusqu'à ce que ça tienne.",
      note: "Le périmètre est défini ensemble à l'avance : un cas d'usage, un critère de réussite.",
    },
    {
      titre: "La date de mise en production est écrite dans le devis.",
      note: "Si elle glisse de notre fait, la phase en cours ne vous est pas facturée.",
    },
  ],
} as const);

/* ---------------------------------------------------------------- OFFRES */

export const offres = fr({
  meta: {
    titre: "Offres",
    description:
      "Build sur-mesure, audit, accompagnement, maintenance. Quatre façons de travailler avec Kundxa, chiffrées après un appel de cadrage.",
  },
  hero: {
    surtitre: "Offres",
    titre: ["Quatre façons de travailler ", "ensemble", "."],
    texte: "Chaque projet est chiffré sur devis, après l'appel de cadrage, quand on sait ce qu'on construit.",
  },
  principale: {
    badge: "Le cœur de l'offre",
    titre: "Build sur-mesure",
    accroche: "Nous construisons votre système et nous le maintenons. Vous ne touchez pas au technique.",
    pourQui: "Vous savez ce qui vous bloque, et vous voulez que ce soit réglé, pas appris.",
    livre: [
      "Audit de friction",
      "Système en production sur votre flux réel",
      "Intégration à vos outils",
      "Maintenance incluse",
      "Courte formation pour piloter",
    ],
    duree: "Premier système en production en 2 à 6 semaines selon le périmètre.",
  },
  secondaires: [
    {
      surtitre: "Pour commencer",
      titre: "Audit et diagnostic",
      accroche: "Vous ne savez pas par où commencer.",
      texte:
        "La cartographie de ce qui peut être automatisé, vos goulots classés par coût, un plan chiffré. Le plan est à vous, même si on ne travaille pas ensemble ensuite.",
      duree: "1 à 2 semaines",
    },
    {
      surtitre: "Pour votre équipe",
      titre: "Accompagnement et formation",
      accroche: "Vous voulez que votre équipe sache faire.",
      texte: "Nous construisons à côté de vous, et nous vous laissons capables de faire évoluer le système sans nous.",
      duree: "1 à 3 mois, une séance par semaine",
    },
    {
      surtitre: "Pour durer",
      titre: "Maintenance et évolution",
      accroche: "Le système tourne. Il doit continuer.",
      texte: "Surveillance, réparations rapides, évolutions au rythme de votre boîte.",
      duree: "Abonnement mensuel, résiliable chaque mois",
    },
  ],
  livreLibelle: "Ce qui est livré",
  pourQuiLibelle: "Pour qui",
  dureeLibelle: "Durée type",
  mention: "Chaque projet est chiffré sur devis, après l'appel de cadrage.",
  choisir: {
    surtitre: "Comment choisir",
    titre: ["Partez de votre ", "situation", "."],
    lignes: [
      ["Vous ne savez pas par où commencer", "Audit et diagnostic"],
      ["Vous savez ce qui bloque et voulez que ce soit réglé", "Build sur-mesure"],
      ["Vous voulez que votre équipe sache construire", "Accompagnement et formation"],
      ["Vous avez déjà un système qui doit tenir", "Maintenance et évolution"],
    ],
  },
} as const);

/* ----------------------------------------------------------- RÉALISATIONS */

export const cas = fr([
  {
    slug: "video-produit",
    surtitre: "Marque de produits · Application web",
    titre: "Une photo produit en entrée, une vidéo promotionnelle en sortie.",
    image: "/images/3d/cas-video.webp",
    situation:
      "Chaque produit avait besoin d'une vidéo pour être vendu en ligne, et chaque vidéo demandait un tournage, un montage ou un prestataire.",
    systeme:
      "Une application web construite pour elle. Elle y dépose la photo d'un produit (une robe, un parfum, des chaussures, n'importe quel article), choisit le format voulu (récit de marque, contenu façon UGC, c'est-à-dire tourné comme par un client, ou un autre format), et récupère une vidéo promotionnelle prête à publier.",
    revient: "Choisir les vidéos qui partent, et où elles partent.",
  },
  {
    slug: "tri-emails",
    surtitre: "Tri des e-mails · Alertes",
    titre: "Les e-mails urgents ne restent plus sans réponse.",
    image: "/images/3d/cas-emails.webp",
    situation:
      "Les messages importants se perdaient au milieu du reste de la boîte de réception, et certains attendaient trop longtemps une réponse.",
    systeme:
      "Chaque e-mail entrant est trié. Quand un message est important ou urgent, le dirigeant reçoit une alerte sur WhatsApp ou Telegram. S'il n'a pas répondu dans l'heure, un agent vocal (Retell, un outil qui passe des appels avec une voix de synthèse) l'appelle pour le lui rappeler.",
    revient: "La réponse. Le système trie et insiste, c'est lui qui répond.",
  },
  {
    slug: "agent-vocal-logistique",
    surtitre: "Logistique · Agent vocal",
    titre: "Un agent vocal répond quand le dirigeant ne peut pas.",
    image: "/images/3d/cas-vocal.webp",
    situation:
      "Un entrepreneur de la logistique, souvent sur le terrain, ne peut pas toujours décrocher. Chaque appel manqué était un client qui attendait.",
    systeme:
      "Un agent vocal construit sur Retell et entraîné sur ses données. Il répond aux clients, et il planifie des rendez-vous en son nom dans son agenda.",
    revient: "Les demandes qui sortent du cadre lui sont transmises.",
  },
] as const);

export const realisations = fr({
  meta: {
    titre: "Réalisations",
    description:
      "Des systèmes en production chez des dirigeants de TPE et PME : la situation de départ, le système construit, et ce qui revient au dirigeant.",
  },
  hero: {
    surtitre: "Réalisations",
    titre: ["Ce qui tourne en ", "production", "."],
    texte:
      "Chaque cas suit le même ordre : la situation de départ, le système construit, et ce qui revient au dirigeant. Les noms des clients restent confidentiels.",
  },
  libelles: { situation: "La situation", systeme: "Le système", revient: "Ce qui revient au dirigeant" },
  chezNous: {
    surtitre: "Chez nous d'abord",
    titre: ["Ce qui tourne chez nous avant de tourner chez ", "vous", "."],
    items: [
      {
        titre: "Relance des factures impayées",
        texte: "Cinq paliers de J+3 à J+45, s'arrête au paiement, 1 centime par facture tout au plus.",
        lien: "Voir la vidéo",
      },
      { titre: "Kundxa OS", texte: "L'assistant qui pilote notre marketing, nos projets et notre mémoire de travail." },
      { titre: "L'Atelier Kundxa", texte: "Notre newsletter, automatisée de la recherche à l'envoi." },
      { titre: "Hermes Agent", texte: "Notre agent IA, en ligne en permanence." },
    ],
  },
  suite: { titre: ["Le prochain cas peut être le ", "vôtre", "."] },
} as const);

/* --------------------------------------------------------------- À PROPOS */

export const aPropos = fr({
  meta: {
    titre: "À propos",
    description:
      "Kundxa construit des systèmes IA pour dirigeants de TPE et PME. Son fondateur, Valdo Mendy, est venu à l'automatisation par nécessité. Nous montrons ce qui tourne et ce qui casse.",
  },
  hero: {
    surtitre: "À propos",
    titre: ["Les dirigeants ne manquent pas d'", "ambition", "."],
    texte: "Il leur manque quelqu'un pour leur montrer comment faire, concrètement. C'est notre travail.",
  },
  parcours: {
    surtitre: "Le parcours du fondateur",
    titre: ["Par nécessité, pas par ", "curiosité", "."],
    texte: [
      "En 2024, Valdo Mendy faisait tourner seul sa boutique en ligne. Il est venu à l'automatisation par nécessité : c'était ça ou ne plus avancer.",
      "Il a appris à construire des systèmes qui tiennent en production, avec n8n, Claude et des agents vocaux. Ils doivent tourner un lundi matin sans que personne n'y touche. Une démo qui marche une fois ne suffit pas.",
      "Aujourd'hui, Kundxa construit ces systèmes pour des dirigeants de TPE et PME. Nous montrons notre travail sur YouTube, y compris ce qui casse, parce qu'un système qui tient, ça se prouve.",
    ],
  },
  valeurs: {
    surtitre: "Ce qui guide notre travail",
    titre: ["Cinq principes, tenus sur chaque ", "projet", "."],
    items: [
      { numero: "01", titre: "Diagnostiquer avant de construire", texte: "Nous partons de votre vraie semaine, jamais d'un catalogue d'outils." },
      { numero: "02", titre: "Construit pour tenir, montré ouvertement", texte: "Ça part quand ça tourne en production. Nous montrons où ça a cassé." },
      { numero: "03", titre: "Honnête sur les limites", texte: "Nous disons ce que le système ne fera pas, et pourquoi." },
      { numero: "04", titre: "Les décisions restent au dirigeant", texte: "Chaque système vous rend ce qui mérite un dirigeant." },
      { numero: "05", titre: "L'ambition, jamais la peur", texte: "Nous parlons de ce que votre boîte peut devenir." },
    ],
  },
  enBref: {
    surtitre: "En bref",
    lignes: [
      ["Où", "Partout en France, en visio."],
      ["Certifications", "Claude Code (Anthropic), n8n niveaux 1 et 2, Retell."],
      ["Chaîne YouTube", "@Kundxa-ai"],
      ["Newsletter", "L'Atelier Kundxa"],
    ],
  },
  suite: { titre: ["On regarde votre semaine ", "ensemble", " ?"] },
} as const);

/* ---------------------------------------------------------------- CONTACT */

export const contact = fr({
  titre: "Dites-nous en deux lignes ce qui vous bloque.",
  champs: {
    nom: "Votre nom",
    email: "Votre e-mail",
    message: "Ce qui vous bloque",
    messagePlaceholder: "En deux lignes : ce qui vous prend le plus de temps aujourd'hui.",
  },
  bouton: "Envoyer",
  envoi: "Envoi…",
  succes: "Message reçu. Nous vous répondons sous 24 h ouvrées.",
  erreur: "L'envoi n'a pas abouti. Réessayez, ou écrivez-nous directement à contact@kundxa.com.",
  ouEmail: "Ou directement :",
} as const);

export const pageContact = fr({
  meta: {
    titre: "Contact",
    description:
      "Réservez un appel de cadrage de soixante minutes, appelez, écrivez en deux lignes ou envoyez un e-mail. Réponse sous 24 h ouvrées.",
  },
  surtitre: "Contact",
  titre: ["Quatre façons de nous ", "joindre", "."],
  intro: "Choisissez celle qui vous arrange. Tout arrive au même endroit, et c'est nous qui donnons suite.",
  canaux: [
    {
      ancre: "appeler",
      surtitre: "Le plus direct",
      titre: "L'appel de cadrage",
      pourQui: "Vous voulez qu'on nomme votre goulot, et qu'on chiffre ce que coûte de le régler.",
      repere: "Soixante minutes, en visio",
    },
    {
      ancre: "ecrire",
      surtitre: "Le plus simple",
      titre: "Le formulaire",
      pourQui: "Vous voulez poser le décor à votre rythme, sans bloquer de créneau.",
      repere: "Réponse sous 24 h ouvrées",
    },
    {
      ancre: "email",
      surtitre: "Sans intermédiaire",
      titre: "L'e-mail",
      pourQui: "Vous préférez votre messagerie, ou vous avez des documents à joindre.",
      repere: "contact@kundxa.com",
    },
    {
      ancre: "telephone",
      href: site.telephoneUrl,
      surtitre: "À toute heure",
      titre: "Le téléphone",
      pourQui: "Vous préférez parler tout de suite. Notre assistante IA répond à vos questions et réserve votre appel de cadrage.",
      repere: site.telephone,
    },
  ],
  appeler: {
    surtitre: "Parler",
    titre: "Un appel de cadrage. Soixante minutes.",
    texte:
      "On regarde votre boîte, on nomme le goulot qui vous coûte le plus cher, et on décide si un système règle le problème. Si ce n'est pas le cas, nous vous le disons.",
  },
  ecrire: {
    surtitre: "Écrire",
    titre: "Dites-nous en deux lignes ce qui vous bloque.",
    texte:
      "Pas besoin d'un dossier complet. Ce qui vous prend le plus de temps aujourd'hui suffit à démarrer la conversation.",
  },
  email: {
    surtitre: "En direct",
    titre: "Ou simplement un e-mail.",
    texte: "Pas de formulaire, pas d'agenda. Nous y répondons nous-mêmes, dans les mêmes délais.",
    bouton: "Écrire à contact@kundxa.com",
  },
  coordonnees: `Kundxa · ${site.email} · ${site.telephone}`,
  cal: {
    surtitre: "Appel de cadrage",
    titre: "Soixante minutes, en visio.",
    texte:
      "Le calendrier s'ouvre ici même. Il est fourni par Cal.com, qui dépose ses propres cookies : il ne se charge donc qu'à votre demande.",
    bouton: "Voir les créneaux disponibles",
    lien: "ou ouvrir le calendrier dans un nouvel onglet",
  },
} as const);

/* ---------------------------------------------------------------- FOOTER */

export const footer = fr({
  newsletter: {
    titre: "L'Atelier Kundxa",
    texte: "Chaque semaine, ce que nous construisons vraiment. Ce qui marche, et ce qui a cassé.",
    placeholder: "vous@votreboite.fr",
    bouton: "S'abonner",
    mention: "Un e-mail de confirmation vous attend. Désinscription en un clic.",
    succes: "Vérifiez votre boîte : un e-mail de confirmation vient de partir.",
    erreur: "L'inscription n'a pas abouti. Réessayez, ou écrivez-nous directement.",
    emailInvalide: "Cette adresse ne semble pas valide.",
  },
  colonnes: { site: "Le site", suivre: "Suivre" },
} as const);

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
