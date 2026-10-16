// Single source of truth for the site and the CV, in English and French.
// scripts/gen.mjs turns this into /, /fr/, /cv/ and /cv/fr/.

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
      ],
      stack: ['JHipster', 'Spring Boot', 'WebSockets', 'PostgreSQL', 'Redis', 'Twilio', 'Google Maps API', 'Flutter', 'Next.js'],
    },
    {
      id: 'galaxytest', figure: 'laptop', org: 'CBX Conseil', years: '2023–2025',
      title: 'GalaxyTest',
      lede: 'A coding-game platform in the spirit of CodinGame, used to assess developers before hiring them.',
      points: [
        'Test campaigns per technology, with candidates invited by email',
        'Timed tests mixing multiple choice, written answers and code in an in-browser editor',
        'Practice runs, automatic scoring and results dashboards',
        'Question banks imported straight from PDF files',
      ],
      stack: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'Redis', 'Monaco Editor', 'Jenkins'],
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
      ],
      stack: ['JHipster', 'Spring Boot', 'WebSockets', 'PostgreSQL', 'Redis', 'Twilio', 'Google Maps API', 'Flutter', 'Next.js'],
    },
    {
      id: 'galaxytest', figure: 'laptop', org: 'CBX Conseil', years: '2023–2025',
      title: 'GalaxyTest',
      lede: 'Une plateforme de coding game dans l’esprit de CodinGame, pour évaluer les développeurs avant de les recruter.',
      points: [
        'Campagnes de tests par technologie, candidats invités par email',
        'Tests chronométrés mêlant QCM, réponses écrites et code dans un éditeur en ligne',
        'Entraînements, notation automatique et tableaux de bord des résultats',
        'Banques de questions importées directement depuis des PDF',
      ],
      stack: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'Redis', 'Monaco Editor', 'Jenkins'],
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

const more = {
  en: [
    { title: 'inventory', tag: 'In progress', when: 'Personal', text: 'Inventory and sales for small shops: the real cost of each product, margins, payments in installments and customer debts. .NET 8, WPF, PostgreSQL.' },
    { title: 'Consulting and self-hosting for clients', when: 'SplinEdge · 2025–2026', text: 'Wrote specifications (cahiers des charges) and found bottlenecks before building, and replaced paid tools like DocuSign with self-hosted alternatives to cut client costs.' },
    { title: 'CBX Academy', when: 'CBX Conseil · 2024', text: 'Training website rebuilt with Next.js 15: pages became about 40% faster.' },
    { title: 'Drone inspection of solar panels', when: 'Green Energy Park · 2022', text: 'Computer vision on drone images to find dirty solar panels that need cleaning. Instance segmentation with Detectron2, trained on AWS, about 95% accuracy.' },
    { title: 'Hybrid energy system control', when: 'Engineering school · 2022', text: 'Control algorithms that run a solar, wind and diesel system at the lowest cost, using the generator as little as possible. Simulink models, MPPT and fuzzy logic.' },
  ],
  fr: [
    { title: 'inventory', tag: 'En cours', when: 'Personnel', text: 'Stock et ventes pour petits commerces : coût réel de chaque produit, marges, paiements échelonnés et dettes clients. .NET 8, WPF, PostgreSQL.' },
    { title: 'Conseil et auto-hébergement pour les clients', when: 'SplinEdge · 2025–2026', text: 'Rédigé des cahiers des charges et identifié les goulots d’étranglement avant de développer, et remplacé des outils payants comme DocuSign par des alternatives auto-hébergées pour réduire les coûts.' },
    { title: 'CBX Academy', when: 'CBX Conseil · 2024', text: 'Site de formation refait en Next.js 15 : des pages environ 40 % plus rapides.' },
    { title: 'Inspection de panneaux solaires par drone', when: 'Green Energy Park · 2022', text: 'Vision par ordinateur sur des images de drone pour repérer les panneaux sales à nettoyer. Segmentation d’instances avec Detectron2, entraînée sur AWS, environ 95 % de précision.' },
    { title: 'Pilotage d’un système énergétique hybride', when: 'École d’ingénieurs · 2022', text: 'Algorithmes de contrôle qui font tourner un système solaire, éolien et diesel au coût le plus bas, en sollicitant le moins possible le générateur. Modèles Simulink, MPPT et logique floue.' },
  ],
};

const experience = {
  en: [
    { role: 'Co-founder & backend engineer', org: 'SplinEdge', where: 'Remote', when: 'Mar 2025 – 2026', points: ['Built the backends of the fleet ERP and the food delivery platform', 'Scoped projects with clients and led delivery', 'Ran hosting and CI/CD for client projects; replaced paid SaaS with self-hosted tools'] },
    { role: 'Full-stack developer', org: 'BMA Conseil IT / CBX Conseil', where: 'Casablanca & remote', when: 'Nov 2022 – Mar 2025', points: ['Built GalaxyTest and Timesheet with Spring Boot and Angular', 'Cut API development time by about 30% with OpenAPI Generator', 'Kept 95% test coverage under SonarQube; pipelines with Docker, Jenkins, Helm and ArgoCD', 'Rebuilt CBX Academy in Next.js 15, about 40% faster'] },
    { role: 'Software engineer intern', org: 'Green Energy Park', where: 'Ben Guerir', when: 'Jul – Sep 2022', points: ['Detectron2 model that finds dirty solar panels on drone images, trained on AWS'] },
  ],
  fr: [
    { role: 'Cofondateur & ingénieur backend', org: 'SplinEdge', where: 'Remote', when: 'mars 2025 – 2026', points: ['Développé les backends de l’ERP de flotte et de la plateforme de livraison', 'Cadré les projets avec les clients et piloté la livraison', 'Géré l’hébergement et la CI/CD des projets clients ; remplacé des SaaS payants par des outils auto-hébergés'] },
    { role: 'Développeur full-stack', org: 'BMA Conseil IT / CBX Conseil', where: 'Casablanca & remote', when: 'nov. 2022 – mars 2025', points: ['Développé GalaxyTest et Timesheet avec Spring Boot et Angular', 'Réduit d’environ 30 % le temps de développement des API avec OpenAPI Generator', 'Maintenu 95 % de couverture de tests sous SonarQube ; pipelines Docker, Jenkins, Helm et ArgoCD', 'Refait CBX Academy en Next.js 15, environ 40 % plus rapide'] },
    { role: 'Stagiaire ingénieur logiciel', org: 'Green Energy Park', where: 'Ben Guerir', when: 'juil. – sept. 2022', points: ['Modèle Detectron2 qui repère les panneaux solaires sales sur des images de drone, entraîné sur AWS'] },
  ],
};

const skills = {
  en: [['Backend', 'Java, Spring Boot, Hibernate, JHipster, REST, OpenAPI, WebSockets'], ['Frontend', 'TypeScript, Angular, React, Next.js'], ['Data', 'PostgreSQL, Flyway, Redis, MySQL, MongoDB'], ['DevOps', 'Docker, GitHub Actions, Jenkins, Helm, ArgoCD, Traefik, Linux, Keycloak'], ['Also', 'Python, C, C++, AWS, computer vision, Agile/Scrum']],
  fr: [['Backend', 'Java, Spring Boot, Hibernate, JHipster, REST, OpenAPI, WebSockets'], ['Frontend', 'TypeScript, Angular, React, Next.js'], ['Données', 'PostgreSQL, Flyway, Redis, MySQL, MongoDB'], ['DevOps', 'Docker, GitHub Actions, Jenkins, Helm, ArgoCD, Traefik, Linux, Keycloak'], ['Aussi', 'Python, C, C++, AWS, vision par ordinateur, Agile/Scrum']],
};

const education = {
  en: [['Master’s in Computer Science', 'École des Hautes Études d’Ingénierie, Oujda', '2020 – 2023'], ['BTS (Higher National Diploma)', 'Maghreb Arabi Technical High School, Oujda', '2018 – 2020'], ['Coding bootcamp', '1337, Ben Guerir', '2022']],
  fr: [['Master en informatique', 'École des Hautes Études d’Ingénierie, Oujda', '2020 – 2023'], ['BTS', 'Lycée technique Maghreb Arabi, Oujda', '2018 – 2020'], ['Bootcamp de programmation', '1337, Ben Guerir', '2022']],
};

export const content = {
  en: {
    lang: 'en', other: 'fr', home: '/', otherHome: '/fr/', cv: '/cv/',
    title: 'Anass Soulimani · Backend engineer',
    description: 'Backend engineer: Java and Spring Boot systems, and the infrastructure they run on. Available for full-time roles and freelance projects.',
    nav: { work: 'Work', services: 'Services', blog: 'Blog', contact: 'Contact', cv: 'CV' },
    lede: 'Backend engineer. I build <em>Java and Spring</em> systems for real businesses, and run the infrastructure underneath them.',
    facts: [['Status', '<span class="dot"></span>Available now'], ['Experience', '3+ years, backend-focused'], ['Main stack', 'Java · Spring Boot · PostgreSQL'], ['Location', 'Morocco (GMT+1) · remote or relocation'], ['Open to', 'Full-time roles · freelance projects'], ['Languages', 'English · French · Arabic']],
    cta: { talk: 'Start a conversation', cv: 'View CV' },
    ask: 'Ask about this project',
    askMsg: 'Hi, I’d like to know more about: ',
    projects: projects.en,
    services: { title: 'What I can do for you', lede: 'Fixed scope and a clear price, in English or French.', items: [['Build your backend', 'APIs, data models and integrations for web and mobile apps, from the first schema to production.'], ['Cut your software bills', 'Replace paid tools like DocuSign with self-hosted open-source equivalents that you own.'], ['Host it properly', 'A secure server with HTTPS, automatic deployments, monitoring, alerts and backups.'], ['Specify and audit', 'Write the specification (cahier des charges) before you build, or find what’s slowing your system down.']] },
    moreTitle: 'More work', more: more.en,
    expTitle: 'Experience', experience: experience.en,
    skillsTitle: 'Skills', skills: skills.en,
    eduTitle: 'Education', education: education.en,
    languagesTitle: 'Languages', languages: 'Arabic (native) · English (fluent) · French (fluent, DELF B2) · German (basic)',
    contact: { title: 'Let’s talk', lede: 'A role, a project or a question about my work: tell me what you need and I’ll answer within a day.', name: 'Name', email: 'Email', company: 'Company (optional)', about: 'About', options: [['job', 'A job opportunity'], ['project', 'A freelance project'], ['question', 'A question about a project'], ['other', 'Something else']], message: 'Message', note: 'Goes straight to my inbox.', send: 'Send', sent: 'Thanks, message sent. I’ll get back to you soon.' },
    credits: 'Scooter model “Vespa” by Jasmine Roberts (CC BY 3.0) · truck from Kenney’s Car Kit (CC0)',
    hint: 'Move your cursor through the sand.',
    cvPage: { title: 'CV · Anass Soulimani', role: 'Backend-oriented full-stack engineer', profile: 'Backend-oriented full-stack engineer with 3+ years building enterprise applications and client platforms in Java, Spring Boot and TypeScript. Strong on REST APIs, real-time systems, PostgreSQL and delivery automation, from specification to production.', projectsTitle: 'Selected projects', pdf: 'Download PDF', back: 'Back to the site', other: 'Version française' },
  },
  fr: {
    lang: 'fr', other: 'en', home: '/fr/', otherHome: '/', cv: '/cv/fr/',
    title: 'Anass Soulimani · Ingénieur backend',
    description: 'Ingénieur backend : systèmes Java et Spring Boot, et l’infrastructure qui les fait tourner. Disponible en CDI et en freelance.',
    nav: { work: 'Projets', services: 'Services', blog: 'Blog', contact: 'Contact', cv: 'CV' },
    lede: 'Ingénieur backend. Je construis des systèmes <em>Java et Spring</em> pour de vraies entreprises, et je fais tourner l’infrastructure en dessous.',
    facts: [['Statut', '<span class="dot"></span>Disponible maintenant'], ['Expérience', '3+ ans, orienté backend'], ['Stack principale', 'Java · Spring Boot · PostgreSQL'], ['Localisation', 'Maroc (GMT+1) · remote ou relocalisation'], ['Ouvert à', 'CDI · missions freelance'], ['Langues', 'Anglais · français · arabe']],
    cta: { talk: 'Discutons', cv: 'Voir le CV' },
    ask: 'Poser une question sur ce projet',
    askMsg: 'Bonjour, j’aimerais en savoir plus sur : ',
    projects: projects.fr,
    services: { title: 'Ce que je peux faire pour vous', lede: 'Un périmètre défini et un prix clair, en français ou en anglais.', items: [['Construire votre backend', 'API, modèles de données et intégrations pour apps web et mobiles, du premier schéma à la production.'], ['Réduire vos abonnements', 'Remplacer des outils payants comme DocuSign par des équivalents open source auto-hébergés qui vous appartiennent.'], ['L’héberger correctement', 'Un serveur sécurisé avec HTTPS, déploiements automatiques, monitoring, alertes et sauvegardes.'], ['Cadrer et auditer', 'Rédiger le cahier des charges avant de construire, ou trouver ce qui ralentit votre système.']] },
    moreTitle: 'Autres réalisations', more: more.fr,
    expTitle: 'Expérience', experience: experience.fr,
    skillsTitle: 'Compétences', skills: skills.fr,
    eduTitle: 'Formation', education: education.fr,
    languagesTitle: 'Langues', languages: 'Arabe (natif) · anglais (courant) · français (courant, DELF B2) · allemand (notions)',
    contact: { title: 'Parlons-en', lede: 'Un poste, un projet ou une question sur mon travail : dites-moi ce dont vous avez besoin, je réponds sous 24 h.', name: 'Nom', email: 'Email', company: 'Entreprise (optionnel)', about: 'Sujet', options: [['job', 'Une offre d’emploi'], ['project', 'Un projet freelance'], ['question', 'Une question sur un projet'], ['other', 'Autre chose']], message: 'Message', note: 'Arrive directement dans ma boîte mail.', send: 'Envoyer', sent: 'Merci, message envoyé. Je reviens vers vous vite.' },
    credits: 'Modèle de scooter « Vespa » par Jasmine Roberts (CC BY 3.0) · camion du Car Kit de Kenney (CC0)',
    hint: 'Passez le curseur dans le sable.',
    cvPage: { title: 'CV · Anass Soulimani', role: 'Ingénieur full-stack orienté backend', profile: 'Ingénieur full-stack orienté backend, 3+ ans à construire des applications d’entreprise et des plateformes clients en Java, Spring Boot et TypeScript. Solide en API REST, systèmes temps réel, PostgreSQL et automatisation des livraisons, du cahier des charges à la production.', projectsTitle: 'Projets choisis', pdf: 'Télécharger le PDF', back: 'Retour au site', other: 'English version' },
  },
};
