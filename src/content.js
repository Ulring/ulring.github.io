// Single source of truth for the site, in English and French.
// scripts/gen.mjs turns this into / and /fr/.

export const person = {
  name: 'Anass Soulimani',
  email: 'anasssoulimani@gmail.com',
  linkedin: 'https://linkedin.com/in/anasssoulimani',
  github: 'https://github.com/Ulring',
  site: 'https://ulring.github.io',
};

// figure: which sand figure appears next to the project (see scripts/bake.mjs)
const projects = {
  en: [
    {
      id: 'fleet', figure: 'truck', org: 'SplinEdge', years: '2025–2026',
      title: 'Fleet management ERP',
      lede: 'Runs the transport operation of a large company: every mission, vehicle and driver, from planning to the fuel receipt.',
      points: [
        'Mission planning with stops, pick-ups and per-city pricing, and replanning on the fly',
        'Vehicle papers with expiry alerts, maintenance work orders, fuel and motorway toll tracking',
        'Separate access for fleet managers, data-entry agents and drivers',
        'Driver mobile app API, with forced app updates',
        'Built for security and performance from the start: per-role data visibility, and queries that stay fast as the data grows',
      ],
      stack: ['Java 25', 'Spring Boot 4', 'PostgreSQL', 'Redis', 'Flyway', 'Next.js', 'Docker'],
    },
    {
      id: 'delivery', figure: 'scooter', org: 'SplinEdge', years: '2025',
      title: 'Food delivery platform',
      lede: 'Five apps on one backend: a customer app, a driver app, a dashboard for restaurants, an admin console and the API behind them.',
      points: [
        'Orders tracked live on every screen, from the kitchen to the door',
        'SMS updates and map-based delivery routing',
        'Restaurant menus, product search and order management',
        'Lower running costs: fewer paid third-party API calls, Google Maps included',
        'Security and performance kept in mind across all five apps',
      ],
      stack: ['JHipster', 'Spring Boot', 'WebSockets', 'PostgreSQL', 'Redis', 'Twilio', 'Google Maps API', 'Flutter', 'Next.js'],
    },
    {
      id: 'galaxytest', figure: 'laptop', org: 'CBX Conseil', years: '2023–2025',
      title: 'GalaxyTest',
      lede: 'A coding-game platform in the spirit of CodinGame, used to assess developers before hiring them.',
      points: [
        'Test campaigns per technology, with candidates invited by email',
        'Timed tests mixing multiple choice, written answers and code',
        'Practice runs, automatic scoring and results dashboards',
      ],
      stack: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'Redis', 'Jenkins'],
    },
    {
      id: 'timesheet', figure: 'calendar', org: 'CBX Conseil', years: '2023–2025',
      title: 'Timesheet',
      lede: 'The back office of a consulting firm: consultants fill in their monthly activity report (CRA), and billing follows from it.',
      points: [
        'Worked days computed with each country’s public holidays, leave and on-call duty',
        'Client invoices generated as PDF from validated reports, plus supplier invoices',
        'Reminders for late invoices, bank details read from PDF, bulk CSV import',
        'Single sign-on and dashboards for management',
      ],
      stack: ['Java 17', 'Spring Boot 3', 'Angular', 'PostgreSQL', 'Keycloak', 'OpenAPI', 'iText'],
    },
  ],
  fr: [
    {
      id: 'fleet', figure: 'truck', org: 'SplinEdge', years: '2025–2026',
      title: 'ERP de gestion de flotte',
      lede: 'Gère l’activité transport d’une grande entreprise : chaque mission, véhicule et chauffeur, de la planification au ticket carburant.',
      points: [
        'Planification des missions avec arrêts, prises en charge et tarifs par ville, et replanification à la volée',
        'Documents des véhicules avec alertes d’expiration, ordres de maintenance, suivi carburant et péage',
        'Accès séparés pour gestionnaires de parc, agents de saisie et chauffeurs',
        'API de l’app mobile chauffeurs, avec mises à jour obligatoires',
        'Pensé dès le départ pour la sécurité et la performance : visibilité des données par rôle, et requêtes qui restent rapides quand les données grossissent',
      ],
      stack: ['Java 25', 'Spring Boot 4', 'PostgreSQL', 'Redis', 'Flyway', 'Next.js', 'Docker'],
    },
    {
      id: 'delivery', figure: 'scooter', org: 'SplinEdge', years: '2025',
      title: 'Plateforme de livraison de repas',
      lede: 'Cinq apps sur un seul backend : une app client, une app livreur, un tableau de bord pour les restaurants, une console d’administration et l’API derrière.',
      points: [
        'Commandes suivies en direct sur chaque écran, de la cuisine à la porte',
        'Notifications SMS et itinéraires de livraison sur carte',
        'Menus des restaurants, recherche de produits et gestion des commandes',
        'Coûts réduits : moins d’appels aux API payantes, Google Maps compris',
        'Sécurité et performance prises en compte dans les cinq applications',
      ],
      stack: ['JHipster', 'Spring Boot', 'WebSockets', 'PostgreSQL', 'Redis', 'Twilio', 'Google Maps API', 'Flutter', 'Next.js'],
    },
    {
      id: 'galaxytest', figure: 'laptop', org: 'CBX Conseil', years: '2023–2025',
      title: 'GalaxyTest',
      lede: 'Une plateforme de coding game dans l’esprit de CodinGame, pour évaluer les développeurs avant de les recruter.',
      points: [
        'Campagnes de tests par technologie, candidats invités par email',
        'Tests chronométrés mêlant QCM, réponses écrites et code',
        'Entraînements, notation automatique et tableaux de bord des résultats',
      ],
      stack: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'Redis', 'Jenkins'],
    },
    {
      id: 'timesheet', figure: 'calendar', org: 'CBX Conseil', years: '2023–2025',
      title: 'Timesheet',
      lede: 'Le back-office d’une ESN : les consultants saisissent leur compte rendu d’activité (CRA) mensuel, et la facturation en découle.',
      points: [
        'Jours travaillés calculés avec les jours fériés de chaque pays, les congés et les astreintes',
        'Factures clients générées en PDF à partir des CRA validés, plus les factures fournisseurs',
        'Relances des factures en retard, RIB lus depuis un PDF, import CSV en masse',
        'Authentification unique et tableaux de bord pour la direction',
      ],
      stack: ['Java 17', 'Spring Boot 3', 'Angular', 'PostgreSQL', 'Keycloak', 'OpenAPI', 'iText'],
    },
  ],
};

// More work: an index of rows that expand to problem → what I did → result
const more = {
  en: [
    { id: 'inventory', title: 'inventory', what: 'Inventory & sales', year: 'In progress', problem: 'Small shops lose track of what each product really costs and who still owes them money.', did: 'A desktop app for products, sales, installments and customer debts, computing the real cost and margin of every product.', result: 'Core data model and inventory screens built; sales and payment tracking next.', stack: ['.NET 8', 'WPF', 'PostgreSQL'] },
    { id: 'discovery', title: 'Discovery & hosting for clients', what: 'Client consulting', year: '2025–2026', problem: 'Clients paid for software they barely used and did by hand work that a system could do.', did: 'Mapped how each business actually runs, found what could be automated and where fees were hiding, then set up and hosted the replacements.', result: 'Lower monthly costs, less manual work, and one place to see everything running.', stack: ['Linux', 'Docker', 'Traefik', 'GitHub Actions'] },
    { id: 'cbxacademy', title: 'CBX Academy', what: 'Front-end support', year: '2024', problem: 'The training website needed its new versions connected to the company’s backend.', did: 'Helped the front-end developer on v1 and v2, mostly wiring the frontend to the backend.', result: 'Both versions shipped.', stack: ['Next.js', 'Spring Boot'] },
    { id: 'drone', title: 'Drone solar inspection', what: 'Computer vision', year: '2022', problem: 'Dirty solar panels lose output, and checking a solar field by hand is slow.', did: 'Trained an instance-segmentation model on drone images to find the panels that need cleaning.', result: 'About 95% accuracy on panel detection.', stack: ['Python', 'Detectron2', 'AWS'] },
    { id: 'hybrid', title: 'Hybrid energy control', what: 'Micro-grid simulation', year: '2022', problem: 'Demand changes between day and night, wind can drop or exceed what a turbine can take, and solar gives nothing at night.', did: 'Simulated a solar, wind and diesel micro-grid and the control logic that decides when the generator must start and how the grid absorbs it.', result: 'The generator runs as little as possible while the grid stays stable.', stack: ['Simulink', 'MATLAB'] },
  ],
  fr: [
    { id: 'inventory', title: 'inventory', what: 'Stock & ventes', year: 'En cours', problem: 'Les petits commerces perdent de vue le coût réel de chaque produit et qui leur doit encore de l’argent.', did: 'Une application de bureau pour les produits, les ventes, les paiements échelonnés et les dettes clients, qui calcule le coût réel et la marge de chaque produit.', result: 'Modèle de données et écrans de stock en place ; suivi des ventes et des paiements à venir.', stack: ['.NET 8', 'WPF', 'PostgreSQL'] },
    { id: 'discovery', title: 'Audit & hébergement pour les clients', what: 'Conseil', year: '2025–2026', problem: 'Les clients payaient des logiciels à peine utilisés et faisaient à la main un travail qu’un système peut faire.', did: 'Analysé le fonctionnement réel de chaque entreprise, repéré ce qui pouvait être automatisé et les frais cachés, puis mis en place et hébergé les remplacements.', result: 'Moins de frais mensuels, moins de travail manuel, et une vue unique sur tout ce qui tourne.', stack: ['Linux', 'Docker', 'Traefik', 'GitHub Actions'] },
    { id: 'cbxacademy', title: 'CBX Academy', what: 'Appui front-end', year: '2024', problem: 'Les nouvelles versions du site de formation devaient être reliées au backend de l’entreprise.', did: 'Aidé le développeur front-end sur la v1 et la v2, surtout pour relier le frontend au backend.', result: 'Les deux versions ont été livrées.', stack: ['Next.js', 'Spring Boot'] },
    { id: 'drone', title: 'Inspection de panneaux solaires par drone', what: 'Vision par ordinateur', year: '2022', problem: 'Les panneaux sales produisent moins, et inspecter un champ solaire à la main prend du temps.', did: 'Entraîné un modèle de segmentation d’instances sur des images de drone pour repérer les panneaux à nettoyer.', result: 'Environ 95 % de précision sur la détection des panneaux.', stack: ['Python', 'Detectron2', 'AWS'] },
    { id: 'hybrid', title: 'Pilotage d’énergie hybride', what: 'Simulation de micro-réseau', year: '2022', problem: 'La demande change entre le jour et la nuit, le vent peut tomber ou dépasser ce qu’une éolienne supporte, et le solaire ne produit rien la nuit.', did: 'Simulé un micro-réseau solaire, éolien et diesel, et la logique de contrôle qui décide quand le générateur doit démarrer et comment le réseau l’absorbe.', result: 'Le générateur tourne le moins possible et le réseau reste stable.', stack: ['Simulink', 'MATLAB'] },
  ],
};

// Services: numbered engagements. English never says "cahier des charges"; no tool names anywhere.
const services = {
  en: {
    title: 'What I can do for you',
    lede: 'Three ways to work together. Most clients start with a discovery.',
    items: [
      { n: '01', title: 'Discovery', meta: 'Fixed price · 1–2 weeks', quotes: ['We pay for software we barely use.', 'We do the same work by hand every day.', 'We’re not sure what’s even possible.'], text: 'I study how your business runs and where time and money leak: work that can be automated, hidden fees, tools you overpay for, and options you didn’t know you had. You get a written plan with priorities and costs, and it’s yours to keep. If we build it together, the discovery fee is credited.' },
      { n: '02', title: 'Build', meta: 'Scoped per project', quotes: ['We need an app built.', 'Our current system can’t keep up.'], text: 'Web applications end to end: backend, frontend and the infrastructure under them, deployed on your own server with HTTPS, automatic deployments, backups and monitoring.' },
      { n: '03', title: 'Run', meta: 'Monthly', quotes: ['It works, but nobody maintains it.', 'It’s slow, or it breaks now and then.'], text: 'Updates, fixes, monitoring and alerts, so your system keeps running and you hear about problems before your users do.' },
    ],
  },
  fr: {
    title: 'Ce que je peux faire pour vous',
    lede: 'Trois façons de travailler ensemble. La plupart des clients commencent par un audit.',
    items: [
      { n: '01', title: 'Audit & cadrage', meta: 'Prix fixe · 1 à 2 semaines', quotes: ['On paie des logiciels qu’on utilise à peine.', 'On refait le même travail à la main tous les jours.', 'On ne sait pas vraiment ce qui est possible.'], text: 'J’étudie le fonctionnement de votre activité et où partent le temps et l’argent : tâches automatisables, frais cachés, outils trop chers et possibilités que vous ne soupçonniez pas. Vous recevez un cahier des charges et un plan chiffré, qui vous appartiennent. Si nous le réalisons ensemble, le prix de l’audit est déduit.' },
      { n: '02', title: 'Réalisation', meta: 'Chiffré par projet', quotes: ['Il nous faut une application.', 'Notre système actuel ne suit plus.'], text: 'Des applications web de bout en bout : backend, frontend et l’infrastructure en dessous, déployés sur votre propre serveur avec HTTPS, déploiements automatiques, sauvegardes et monitoring.' },
      { n: '03', title: 'Suivi', meta: 'Mensuel', quotes: ['Ça marche, mais personne ne le maintient.', 'C’est lent, ou ça plante de temps en temps.'], text: 'Mises à jour, corrections, monitoring et alertes, pour que votre système tourne et que vous soyez prévenu des problèmes avant vos utilisateurs.' },
    ],
  },
};

// Skills: tiers instead of bars. "match" links a skill to projects whose stack contains it; "extra" adds others by id.
const skillTiers = [
  { key: 'core', skills: [{ name: 'Java', extra: ['delivery', 'splinedge', 'cbx'] }, { name: 'Spring Boot' }, { name: 'SQL', match: 'PostgreSQL' }, { name: 'PostgreSQL' }, { name: 'Docker', extra: ['discovery'] }, { name: 'CI/CD', extra: ['splinedge', 'cbx', 'discovery', 'galaxytest', 'timesheet'] }] },
  { key: 'comfortable', skills: [{ name: 'Angular', extra: ['splinedge'] }, { name: 'TypeScript', extra: ['galaxytest', 'timesheet', 'fleet', 'splinedge'] }, { name: 'Next.js' }, { name: 'Hibernate', extra: ['fleet', 'galaxytest', 'timesheet'] }, { name: 'JHipster' }, { name: 'REST & OpenAPI', match: 'OpenAPI', extra: ['fleet', 'delivery', 'galaxytest'] }, { name: 'WebSockets' }, { name: 'Redis' }, { name: 'Flyway', extra: ['timesheet'] }, { name: 'Keycloak' }, { name: 'Jenkins', extra: ['cbx'] }, { name: 'GitHub Actions', extra: ['splinedge'] }, { name: 'Linux' }] },
  { key: 'also', skills: [{ name: 'Flutter' }, { name: 'Python', extra: ['gep'] }, { name: 'C & C++', extra: ['school'] }, { name: 'AWS', extra: ['gep'] }, { name: 'Detectron2', extra: ['gep'] }, { name: 'Simulink' }] },
];

const experience = {
  en: [
    { id: 'splinedge', years: '2025–26', org: 'SplinEdge', role: 'Co-founder & full-stack engineer', text: 'Client applications (Spring backends, Angular frontends), discovery, hosting and CI/CD.' },
    { id: 'cbx', years: '2022–25', org: 'BMA Conseil IT / CBX Conseil', role: 'Full-stack developer', text: 'GalaxyTest and Timesheet with Spring Boot and Angular; 95% test coverage under SonarQube.' },
    { id: 'gep', years: '2022', org: 'Green Energy Park', role: 'Software engineer intern', text: 'Drone solar inspection with computer vision.' },
    { id: 'school', years: '2020–23', org: 'EHEI Oujda · 1337', role: 'State engineering degree in computer science', text: 'Plus the 1337 coding school bootcamp, taught in C.' },
  ],
  fr: [
    { id: 'splinedge', years: '2025–26', org: 'SplinEdge', role: 'Cofondateur & ingénieur full-stack', text: 'Applications clients (backends Spring, frontends Angular), audits, hébergement et CI/CD.' },
    { id: 'cbx', years: '2022–25', org: 'BMA Conseil IT / CBX Conseil', role: 'Développeur full-stack', text: 'GalaxyTest et Timesheet avec Spring Boot et Angular ; 95 % de couverture de tests sous SonarQube.' },
    { id: 'gep', years: '2022', org: 'Green Energy Park', role: 'Stagiaire ingénieur logiciel', text: 'Inspection de panneaux solaires par drone avec la vision par ordinateur.' },
    { id: 'school', years: '2020–23', org: 'EHEI Oujda · 1337', role: 'Diplôme d’ingénieur d’État en informatique', text: 'Et le bootcamp de l’école 1337, enseigné en C.' },
  ],
};

// Blog posts: the Writing section and its nav link only appear once this has an entry.
// { title, date: 'YYYY-MM-DD', url, minutes }
// slug = content/posts/<slug>.html; minutes and the page itself come from scripts/gen.mjs
const postList = [
  { slug: 'agents-inside-the-rules', title: 'Letting AI agents operate a server, inside the rules', date: '2026-10-15', topics: 'AI agents · Guardrails · DevOps', summary: 'A rulebook, a tested pre-execution guard and a CI backstop that let coding agents do real work on a server safely.' },
  { slug: 'portable-hosting-platform', title: 'A portable hosting platform, built at home first', date: '2026-10-15', topics: 'Self-hosting · Docker · Traefik', summary: 'One machine run like a small platform: one entry point, isolated tenants, three environments per project and rules checked in CI.' },
];
const posts = { en: postList, fr: postList.map(p => ({ ...p, note: 'en anglais' })) };

export const content = {
  en: {
    lang: 'en', other: 'fr', home: '/', otherHome: '/fr/',
    title: 'Anass Soulimani · Full-stack engineer',
    description: 'Full-stack engineer, strongest on backend and DevOps: Java and Spring Boot, Angular, and the infrastructure it all runs on. Available for full-time roles and freelance projects.',
    nav: { work: 'Work', services: 'Services', writing: 'Writing', contact: 'Contact' },
    lede: 'Full-stack engineer, strongest on the backend and DevOps. I build <em>Java and Spring</em> systems with Angular and Next.js frontends, and run the infrastructure underneath them.',
    facts: [['Status', '<span class="dot"></span>Available now'], ['Experience', '3+ years, full-stack'], ['Main stack', 'Java · Spring Boot · Angular · SQL'], ['Location', 'Morocco (GMT) · remote or relocation'], ['Open to', 'Full-time roles · freelance projects'], ['Languages', 'English · French · Arabic']],
    cta: { talk: 'Start a conversation', cv: 'Download CV', cvBusy: 'Preparing…', cvFallback: 'Hi, could you send me your CV?' },
    ask: 'Ask about this project', askMsg: 'Hi, I’d like to know more about: ',
    projects: projects.en,
    services: services.en,
    moreTitle: 'More work', more: more.en, labels: { problem: 'Problem', did: 'What I did', result: 'Result' },
    expTitle: 'Experience', experience: experience.en,
    skillsTitle: 'Skills', tierNames: { core: 'Core', comfortable: 'Comfortable', also: 'Also used' }, skillsHint: 'Hover or tap a skill to see where I used it.',
    writingTitle: 'Writing', posts: posts.en, readLabel: 'min read', allWriting: 'All writing', linksLabel: 'Links I’ve collected', linksPage: { title: 'Links I’ve collected', lede: 'Tools, courses, papers and references I keep coming back to.', search: 'Search links', types: 'Type', tags: 'Tags', shown: 'shown', clear: 'Clear filters' },
    contact: { title: 'Let’s work together.', copy: 'Copy', copied: 'Copied', available: 'Available now', local: 'in Morocco', reply: 'I reply within a day.', name: 'Name', email: 'Email', about: 'About', options: [['project', 'A project'], ['job', 'A job opportunity'], ['question', 'A question'], ['other', 'Something else']], message: 'Message', send: 'Send', sent: 'Thanks, message sent. I’ll get back to you soon.' },
    credits: 'Scooter: “Vespa” by Jasmine Roberts (CC BY 3.0) · truck: Kenney Car Kit (CC0)',
  },
  fr: {
    lang: 'fr', other: 'en', home: '/fr/', otherHome: '/',
    title: 'Anass Soulimani · Ingénieur full-stack',
    description: 'Ingénieur full-stack, plus fort sur le backend et le DevOps : Java et Spring Boot, Angular, et l’infrastructure qui fait tout tourner. Disponible en CDI et en freelance.',
    nav: { work: 'Projets', services: 'Services', writing: 'Articles', contact: 'Contact' },
    lede: 'Ingénieur full-stack, plus fort sur le backend et le DevOps. Je construis des systèmes <em>Java et Spring</em> avec des frontends Angular et Next.js, et je fais tourner l’infrastructure en dessous.',
    facts: [['Statut', '<span class="dot"></span>Disponible maintenant'], ['Expérience', '3+ ans, full-stack'], ['Stack principale', 'Java · Spring Boot · Angular · SQL'], ['Localisation', 'Maroc (GMT) · remote ou relocalisation'], ['Ouvert à', 'CDI · missions freelance'], ['Langues', 'Anglais · français · arabe']],
    cta: { talk: 'Discutons', cv: 'Télécharger le CV', cvBusy: 'Préparation…', cvFallback: 'Bonjour, pourriez-vous m’envoyer votre CV ?' },
    ask: 'Poser une question sur ce projet', askMsg: 'Bonjour, j’aimerais en savoir plus sur : ',
    projects: projects.fr,
    services: services.fr,
    moreTitle: 'Autres réalisations', more: more.fr, labels: { problem: 'Problème', did: 'Ce que j’ai fait', result: 'Résultat' },
    expTitle: 'Expérience', experience: experience.fr,
    skillsTitle: 'Compétences', tierNames: { core: 'Cœur', comfortable: 'À l’aise', also: 'Aussi utilisé' }, skillsHint: 'Survolez ou touchez une compétence pour voir où je l’ai utilisée.',
    writingTitle: 'Articles', posts: posts.fr, readLabel: 'min de lecture', allWriting: 'Tous les articles', linksLabel: 'Liens que j’ai rassemblés', linksPage: { title: 'Liens que j’ai rassemblés', lede: 'Outils, cours, articles et références auxquels je reviens souvent.', search: 'Rechercher', types: 'Type', tags: 'Tags', shown: 'affichés', clear: 'Effacer les filtres' },
    contact: { title: 'Travaillons ensemble.', copy: 'Copier', copied: 'Copié', available: 'Disponible maintenant', local: 'au Maroc', reply: 'Je réponds sous 24 h.', name: 'Nom', email: 'Email', about: 'Sujet', options: [['project', 'Un projet'], ['job', 'Une offre d’emploi'], ['question', 'Une question'], ['other', 'Autre chose']], message: 'Message', send: 'Envoyer', sent: 'Merci, message envoyé. Je reviens vers vous vite.' },
    credits: 'Scooter : « Vespa » par Jasmine Roberts (CC BY 3.0) · camion : Car Kit de Kenney (CC0)',
  },
};
export { skillTiers };
