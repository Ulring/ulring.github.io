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
        'Fuel refills checked against distance driven, so theft and abuse get flagged',
        'Maintenance predicted from mileage, and about twenty alerts for papers, inspections and toll cards',
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
      lede: 'A complete hiring flow for developers: from the apply button on the company’s website, through a coding-game test in the spirit of CodinGame, to the job offer.',
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
      lede: 'Built around how a French consulting firm really works, where global tools like Clockify fall short: monthly activity reports (CRA) in days, and billing that follows from them.',
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
        'Pleins de carburant comparés aux kilomètres parcourus, pour repérer vols et abus',
        'Entretien prévu selon le kilométrage, et une vingtaine d’alertes pour documents, visites et cartes Jawaz',
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
      lede: 'Un parcours de recrutement complet : du bouton « postuler » sur le site de l’entreprise, à un test de coding game dans l’esprit de CodinGame, jusqu’à l’offre d’emploi.',
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
      lede: 'Pensé pour le fonctionnement réel d’une ESN française, là où des outils globaux comme Clockify ne suffisent pas : CRA mensuels en jours, et facturation qui en découle.',
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


// Case studies (English only). Facts come from the code and from Anass; no client names, no screenshots.
const ul = items => `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
export const caseStudies = [
  {
    id: 'fleet', title: 'Fleet management ERP', summary: 'The system that runs a large company’s transport operation: missions, vehicles and drivers, built to catch waste and theft and to keep every vehicle legal and maintained.',
    facts: [['Role', 'Full-stack engineer, co-founder of the studio'], ['Team', 'Small team, 275+ commits'], ['Stack', 'Java 25, Spring Boot 4, PostgreSQL, Redis, Flyway, Next.js, Docker, GitHub Actions'], ['Users', 'Admins, fleet managers, data-entry agents, sales reps, drivers']],
    sections: [
      ['The problem', ['Running a big fleet leaks money in quiet ways: fuel that disappears, toll cards nobody tracks, vehicles driven until they break, insurance and inspections that lapse because a driver forgot. The company needed one system that plans the work and also notices when something is off.']],
      ['What we built', ['A back office for the office teams and an API for the drivers’ mobile app, on one Spring Boot backend.', ul(['<strong>Missions:</strong> planning with stops, pick-ups and per-city pricing with estimated distances, and replanning when the day changes.', '<strong>Money per trip:</strong> planned versus real duration, amounts owed and paid at every stop, and trips flagged when they are overcharged.', '<strong>Drivers:</strong> trip stops and statuses from the phone, an SOS alert, and forced app updates so nobody runs an old version.'])]],
      ['Catching waste and theft', [ul(['Every refuel is checked against the distance driven since the previous one. When a vehicle’s consumption drifts from its norm, it is flagged, which is how fuel theft and abuse show up.', 'Motorway toll cards are tracked per device: top-ups, deductions and history, so you know where the money went and when a card needs refilling before a driver gets stuck.', 'Every figure is attached to a vehicle and a driver, so patterns point to a person, not just a number.'])]],
      ['Maintenance before breakdowns', [ul(['The next oil change is predicted by kilometres and by date, and the interval is learned from the vehicle’s own history.', 'Tyres, work orders with estimated and real time in the workshop, and the cost of each intervention are tracked per vehicle.', 'Vehicles that are not looked after stand out, instead of failing on the road.'])]],
      ['Papers that never expire unnoticed', ['About twenty alert types cover what drivers and offices tend to forget: insurance, registration, technical inspection, road tax, tachograph, fire extinguisher, refrigeration unit, driver licence, medical check-ups and more. Alerts are scoped to the people who should act on them.']],
      ['Security', [ul(['Five roles, and a permission check on every endpoint (more than a hundred), not just on the menu.', 'Sign-in tokens can be revoked instantly: a stolen phone or a departing employee is cut off at once.', 'Vehicle papers and fuel receipts are only reachable through signed links that expire.', 'Optimistic locking on every record: if two people edit the same mission, the second save is refused with a clear message instead of silently overwriting the first.', 'Deleting a mission is audited.'])]],
      ['Performance', [ul(['Every list is paginated, so screens stay fast as years of missions pile up.', 'Queries load related data in one go instead of one query per row (the classic “N+1” problem).', 'Business figures such as consumption deviation, unpaid amounts and real durations are computed by the database itself, so dashboards read them ready-made.', 'Every schema change is a versioned migration (20 so far): the database evolves without manual fixes.'])]],
      ['Delivery pipeline', ['Every push runs the test suite against real PostgreSQL and Redis instances, builds a container image, and deploys it automatically to development, staging or production depending on the branch, with a health check that fails the deployment if the new version doesn’t come up.']],
    ],
  },
  {
    id: 'delivery', title: 'Food delivery platform', summary: 'Five apps on one backend for a local delivery service, built to stay fast, secure and cheap to run.',
    facts: [['Role', 'Backend engineer, co-founder of the studio'], ['Apps', 'Customer app, driver app, restaurant dashboard, admin console, API'], ['Stack', 'JHipster (Spring Boot), PostgreSQL, Redis, WebSockets, Twilio, Google Maps, Flutter, Next.js'], ['Focus', 'Real-time orders, security, running costs']],
    sections: [
      ['The problem', ['A local delivery service needed customers, restaurants and drivers on the same page in real time, on a startup budget where every paid API call counts.']],
      ['What we built', [ul(['<strong>Customer and driver apps</strong> (Flutter) and <strong>web dashboards</strong> for restaurants and admins (Next.js), all on one JHipster backend.', '<strong>Live orders:</strong> status changes are pushed over WebSockets to every screen, from the kitchen to the door.', '<strong>SMS updates</strong> through Twilio, and product search for restaurant menus.'])]],
      ['Keeping running costs down', ['Maps were the biggest variable cost, so the backend is careful with them:', ul(['The delivery fee is a base price plus a price per kilometre of real road distance.', 'The route is computed once and saved on the cart, instead of asking Google again each time the cart is shown.', 'Calls request only the three fields the app needs (distance, duration and the route line), which keeps them in Google’s cheapest billing tier.'])]],
      ['Security and performance', [ul(['Token-based authentication with separate roles for customers, drivers, restaurants and admins.', 'Frequent look-ups such as users are cached, so busy hours don’t hit the database for every request.'])]],
      ['Delivery pipeline', ['The Android app is built automatically on every push, and the backend deploys itself to the development server, so testers always have the latest version.']],
    ],
  },
  {
    id: 'galaxytest', title: 'GalaxyTest', summary: 'A complete hiring flow for developers, from the “apply” button on the company’s website to the job offer, with a coding-game test in the middle.',
    facts: [['Role', 'Full-stack developer'], ['Company', 'CBX Conseil (IT consulting)'], ['Stack', 'Java, Spring Boot, Angular, PostgreSQL, Redis, Jenkins'], ['Users', 'Recruiters, candidates, company admins']],
    sections: [
      ['The problem', ['Hiring developers on CVs alone is slow and unreliable. The company wanted to see what candidates can actually do, without recruiters running tests by hand.']],
      ['The full flow', [ul(['A candidate applies from the company’s website and gets an account, with single sign-on shared with the company’s job platform.', 'Recruiters run test campaigns per technology and invite candidates by email, with reminders and re-sends.', 'The candidate takes a timed test in the browser: multiple choice, written answers and code, at three difficulty levels.', 'Answers are scored automatically, and results land in dashboards per campaign and per technology.', 'Shortlisted candidates move on to the job offer, all in the same system.'])]],
      ['Good tests, not just quizzes', ['Questions are tagged by what they measure (design, language knowledge, modelling, problem solving and reliability), so a score says more than “right or wrong”. Candidates can take practice runs before the real test.']],
      ['Keeping it clean', ['Scheduled jobs close abandoned and expired tests automatically, so campaigns never fill up with half-finished attempts, and builds and deployments run through Jenkins.']],
    ],
  },
  {
    id: 'timesheet', title: 'Timesheet', summary: 'Time tracking and billing built around how a French IT consulting firm actually works, where global tools like Clockify fall short.',
    facts: [['Role', 'Full-stack developer'], ['Company', 'CBX Conseil (IT consulting)'], ['Stack', 'Java 17, Spring Boot 3, Angular, PostgreSQL, Keycloak, OpenAPI'], ['Users', 'Consultants, managers, finance']],
    sections: [
      ['The problem', ['Generic time trackers count hours. A French consulting firm (ESN) runs on the monthly activity report, the CRA: days, not hours, validated per mission, with public holidays, leave and on-call duty, and invoicing that follows from it. Off-the-shelf tools leave all of that to spreadsheets.']],
      ['What we built', [ul(['<strong>Monthly CRA</strong> per consultant and mission, with each country’s public holidays, leave and on-call duty counted correctly.', '<strong>Invoices</strong> generated as PDF from validated reports, plus supplier invoices for subcontractors, and reminders for invoices paid late.', '<strong>People as the firm sees them:</strong> employees and freelancers, internal and external missions, clients, suppliers and business finders.', '<strong>Less typing:</strong> bank details read straight from PDF files and validated, and bulk import from CSV.'])]],
      ['Security and integration', [ul(['Single sign-on with Keycloak and roles for consultants, managers and finance.', 'The API is described with OpenAPI and its code generated from that description, so frontend and backend stay in sync.', 'Scheduled jobs prepare each month’s reports and invoices and notify people by email.'])]],
    ],
  },
];

// "How I work", shown under the services
const howIWork = {
  en: { title: 'How I work', steps: [['Intro call', '20 minutes, free', 'You tell me what you need; I tell you honestly whether I’m the right person for it.'], ['Discovery', '1–2 weeks, fixed price', 'I study how things run today and write a plan with priorities and costs. It’s yours to keep.'], ['Build', 'Weekly demos', 'You see working software on a test server every week, not just at the end.'], ['Handover', 'Then optional support', 'Code, documentation and every access are yours. I can keep it running if you want.']], needs: 'What I need from you: one person who can decide, access to the systems involved, and feedback on each weekly demo.' },
  fr: { title: 'Comment je travaille', steps: [['Appel découverte', '20 minutes, gratuit', 'Vous m’expliquez votre besoin ; je vous dis honnêtement si je suis la bonne personne.'], ['Audit & cadrage', '1 à 2 semaines, prix fixe', 'J’étudie le fonctionnement actuel et rédige un cahier des charges chiffré et priorisé. Il vous appartient.'], ['Réalisation', 'Démo chaque semaine', 'Vous voyez un logiciel qui fonctionne sur un serveur de test chaque semaine, pas seulement à la fin.'], ['Livraison', 'Puis suivi en option', 'Code, documentation et tous les accès vous appartiennent. Je peux en assurer le suivi si vous le souhaitez.']], needs: 'Ce dont j’ai besoin : une personne qui décide, l’accès aux systèmes concernés, et un retour à chaque démo hebdomadaire.' },
};

// Testimonials stay anonymous: { quote, who: 'Operations manager, transport company' }. Hidden while empty.
const testimonials = {
  en: [
    { who: 'Founder, food delivery app', text: 'Backend work far beyond what was agreed, and a lower Google Maps bill.' },
    { who: 'Manager, fleet ERP', text: 'Every change they asked for, delivered.' },
    { who: 'Manager, fleet ERP', text: 'Professionalism and attention to detail.' },
  ],
  fr: [
    { who: 'Fondateur, application de livraison', text: 'Un travail backend bien au-delà de ce qui était prévu, et une facture Google Maps réduite.' },
    { who: 'Responsable, ERP de flotte', text: 'Chaque changement demandé, livré.' },
    { who: 'Responsable, ERP de flotte', text: 'Le professionnalisme et le souci du détail.' },
  ],
};

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
    services: services.en, howIWork: howIWork.en, testimonials: testimonials.en, testimonialsTitle: 'What clients valued', caseLabel: 'Read the case study',
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
    services: services.fr, howIWork: howIWork.fr, testimonials: testimonials.fr, testimonialsTitle: 'Ce que les clients ont apprécié', caseLabel: 'Lire l’étude de cas (en anglais)',
    moreTitle: 'Autres réalisations', more: more.fr, labels: { problem: 'Problème', did: 'Ce que j’ai fait', result: 'Résultat' },
    expTitle: 'Expérience', experience: experience.fr,
    skillsTitle: 'Compétences', tierNames: { core: 'Cœur', comfortable: 'À l’aise', also: 'Aussi utilisé' }, skillsHint: 'Survolez ou touchez une compétence pour voir où je l’ai utilisée.',
    writingTitle: 'Articles', posts: posts.fr, readLabel: 'min de lecture', allWriting: 'Tous les articles', linksLabel: 'Liens que j’ai rassemblés', linksPage: { title: 'Liens que j’ai rassemblés', lede: 'Outils, cours, articles et références auxquels je reviens souvent.', search: 'Rechercher', types: 'Type', tags: 'Tags', shown: 'affichés', clear: 'Effacer les filtres' },
    contact: { title: 'Travaillons ensemble.', copy: 'Copier', copied: 'Copié', available: 'Disponible maintenant', local: 'au Maroc', reply: 'Je réponds sous 24 h.', name: 'Nom', email: 'Email', about: 'Sujet', options: [['project', 'Un projet'], ['job', 'Une offre d’emploi'], ['question', 'Une question'], ['other', 'Autre chose']], message: 'Message', send: 'Envoyer', sent: 'Merci, message envoyé. Je reviens vers vous vite.' },
    credits: 'Scooter : « Vespa » par Jasmine Roberts (CC BY 3.0) · camion : Car Kit de Kenney (CC0)',
  },
};
export { skillTiers };
