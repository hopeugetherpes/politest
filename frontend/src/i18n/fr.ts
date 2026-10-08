import type { Strings } from './index';

export const fr: Strings = {
  htmlLang: 'fr',
  docTitle: "Politest — Test politique et idéologique sur 12 axes",
  loadingAnalysis: "Chargement de l'analyse politique...",
  loadingQuiz: "Chargement du quiz...",
  loadingResult: "Chargement des résultats...",
  tryAgain: "Réessayer",
  crashTitle: "Une erreur est survenue",
  crashBody: "Une erreur inattendue est survenue. Rechargez la page pour réessayer.",
  crashBodyWithProgress: "Une erreur inattendue est survenue, mais vos réponses sont enregistrées. Rechargez la page et choisissez de reprendre le test.",
  crashReload: "Recharger la page",
  resumeEyebrow: "Test en cours",
  resumeTitle: "Reprenez là où vous vous êtes arrêté",
  resumeBody: (answered, total) => `Vous avez répondu à ${answered} questions sur ${total}. Vos réponses sont enregistrées dans ce navigateur.`,
  resumeContinue: "Continuer",
  resumeDiscard: "Recommencer",
  resumeUnavailable: "Le test précédent ne peut pas être repris. Veuillez en commencer un nouveau.",
  skipToContent: "Passer au contenu",
  backToStartAria: "Retour au début",
  mainNavAria: "Navigation principale",
  navHow: "Comment ça marche",
  navAxes: "12 axes",
  navSpectrum: "Spectre",
  navFaq: "FAQ",
  navIdeologies: "Idéologies",
  navPersonalities: "Personnalités",
  navCountries: "Pays",
  redoQuiz: "Refaire le test",
  religionLabel: "Religion",
  religionQuestion: "Pratiquez-vous une religion ? Cette réponse sert uniquement à adapter vos recommandations.",
  religionNone: "Aucune religion",
  religionNames: { christianity: "Christianisme", judaism: "Judaïsme", islam: "Islam", buddhism: "Bouddhisme" },
  denominationLabel: "Tradition chrétienne",
  denominationQuestion: "À quelle tradition chrétienne appartenez-vous ?",
  denominationNames: { catholic: "Catholique", protestant: "Protestant", orthodox: "Orthodoxe" },
  restartQuiz: "Recommencer le test",
  heroEyebrow: "À la découverte de vos convictions",
  h1Pre: "Connaissez-vous vraiment votre ",
  h1Em: "idéologie politique",
  h1Post: " ?",
  introLead:
    "L’étiquette politique que vous vous donnez ne vous correspond peut-être pas. En quelques minutes, découvrez votre idéologie, le pays dont le profil est le plus proche du vôtre et la personnalité politique qui partage le plus vos idées.",
  startQuiz: "Découvrir mon profil",
  seeAxes: "Voir les 12 axes",
  heroLabels: ["Gratuit", "Anonyme", "Rapide", "Résultat immédiat"],
  heroTeaserLabel: "compatibilité",
  heroTeaserTag: "Exemple de résultat",
  formats: {
    short: {
      label: "Court",
      questionCount: "36 questions",
      description: "Un résultat rapide, idéal pour une première lecture de votre profil.",
      duration: "Environ 5 min",
      action: "Commencer la version courte"
    },
    extended: {
      label: "Complet",
      questionCount: "60 questions",
      description: "Davantage de précision pour comparer votre résultat aux profils idéologiques.",
      duration: "Environ 9 min",
      action: "Commencer la version complète"
    },
    extreme: {
      label: "Approfondi",
      questionCount: "240 questions",
      description: "Découvrez la synthèse exacte de votre pensée avec une précision de 100 %.",
      duration: "Environ 30 min",
      action: "Commencer la version approfondie"
    }
  },
  axisInfoAria: (label) => `Que signifie l’axe ${label} ?`,
  closeLabel: "Fermer",
  personalityInfoAria: (name) => `Voir les détails de ${name}`,
  closenessTitle: "Ce qui vous rapproche",
  closenessYou: "Vous",
  compareEyebrow: "Analyse comparative",
  compareTitle: "Comparez-vous à n’importe quel profil",
  compareLead: "Choisissez une personnalité, un pays ou une idéologie et voyez, axe par axe, où vous êtes proches ou éloignés.",
  compareSearchLabel: "Rechercher un profil à comparer",
  compareSearchPlaceholder: "Chercher une personnalité, un pays ou une idéologie",
  compareView: "Voir",
  compareAxesTitle: "Vos 12 axes",
  compareNoResults: "Aucun profil trouvé.",
  compareLoading: "Comparaison...",
  compareLoadError: "Impossible de charger la comparaison. Veuillez réessayer.",
  compareTypeLabels: { personality: "Personnalité", country: "Pays", ideology: "Idéologie" },
  compareAxisAdverbs: {
    estrutura: "structurellement",
    economia: "économiquement",
    moral: "moralement",
    tecnologia: "technologiquement",
    diplomacia: "diplomatiquement"
  },
  compareClosestLine: (adverb, name) => `Vous êtes ${adverb} proche de ${name}.`,
  compareFarthestLine: (adverb, name) => `Vous êtes ${adverb} éloigné de ${name}.`,
  compareClosestFallback: (axis, name) => `Sur l’axe ${axis}, vous êtes proche de ${name}.`,
  compareFarthestFallback: (axis, name) => `Sur l’axe ${axis}, vous êtes éloigné de ${name}.`,
  compareIdentical: (name) => `Vous et ${name} avez des positions pratiquement identiques sur chaque axe.`,
  compareNearestLine: (axis, name) => `Votre axe le plus proche de ${name} est ${axis}.`,
  compareNoFarLine: (name) => `Aucun axe n'est loin de ${name}.`,
  compareValues: (pole, you, them, name) => `${pole}: vous ${you}% · ${name} ${them}%.`,
  compareOptionAria: (name, type) => `${name}, ${type}`,
  axisExplanations: {
  "estrutura": "Mesure votre préférence pour un pouvoir réparti entre les États, les villes et les communautés locales, ou pour un État national unitaire avec des lois et une direction plus uniformes.",
  "representacao": "Compare la confiance dans les élections, l’opposition et les institutions démocratiques avec la préférence pour un dirigeant fort, la technocratie, la monarchie ou des régimes autoritaires.",
  "poder": "Évalue l’équilibre entre l’ordre, la surveillance, les sanctions et le contrôle de l’État, d’une part, et la vie privée, les libertés individuelles et l’autonomie des citoyens, d’autre part.",
  "imigracao": "Mesure votre préférence pour l’assimilation culturelle, la langue et l’identité nationale, ou pour le multiculturalisme, l’ouverture aux migrations et la diversité des coutumes.",
  "diplomacia": "Analyse votre position sur les forces armées, l’armement, la dissuasion et l’intervention militaire, par rapport à la négociation, au pacifisme et aux organisations internationales.",
  "intervencao": "Mesure votre préférence pour le non-interventionnisme à l’étranger, ou pour une souveraineté nationale plus affirmée, le nationalisme géopolitique et la défense active des intérêts nationaux.",
  "economia": "Compare la propriété publique, les entreprises d’État et les services collectifs avec la propriété privée, la privatisation et le rôle moteur des entreprises.",
  "controle": "Compare la planification, la réglementation et une politique économique active de l’État avec le libre marché, une faible intervention, l’autonomie monétaire et la concurrence.",
  "comercio": "Compare le protectionnisme, la souveraineté productive et la défense de l’industrie nationale avec le mondialisme, le libre-échange et l’intégration économique internationale.",
  "religiao": "Compare la laïcité, la séparation de la religion et de l’État et la critique des privilèges religieux avec l’influence publique de la foi et des valeurs religieuses.",
  "moral": "Compare le progressisme culturel, les droits civils et le changement social avec la tradition, la famille, les coutumes et le conservatisme moral.",
  "tecnologia": "Compare l’enthousiasme pour la technologie, l’IA, le génie génétique et le développement technique avec la prudence biologique et environnementale et la préservation de la nature."
},
  homeAxes: {
    estrutura: { label: "Structure", leftPole: "Fédéral", rightPole: "Unitaire" },
    representacao: { label: "Représentation", leftPole: "Démocratie", rightPole: "Autocratie" },
    poder: { label: "Pouvoir", leftPole: "Sécurité", rightPole: "Liberté" },
    imigracao: { label: "Immigration", leftPole: "Assimilation", rightPole: "Multiculturalisme" },
    diplomacia: { label: "Diplomatie", leftPole: "Militariste", rightPole: "Pacifiste" },
    intervencao: { label: "Intervention", leftPole: "Non-interventionniste", rightPole: "Nationaliste" },
    economia: { label: "Économie", leftPole: "Public", rightPole: "Privé" },
    controle: { label: "Contrôle", leftPole: "Planification", rightPole: "Libre marché" },
    comercio: { label: "Commerce", leftPole: "Protectionnisme", rightPole: "Mondialisme" },
    religiao: { label: "Religion", leftPole: "Non religieux", rightPole: "Religieux" },
    moral: { label: "Morale", leftPole: "Progressiste", rightPole: "Traditionaliste" },
    tecnologia: { label: "Technologie", leftPole: "Technologie", rightPole: "Biologie" }
  },
  spectrumItems: [
  {
    "id": "left-radical",
    "label": "Gauche radicale",
    "tone": "darkred",
    "description": "Communisme révolutionnaire ou totalitaire à parti unique, avec une économie planifiée, une forte centralisation et un pouvoir d’État concentré."
  },
  {
    "id": "left",
    "label": "Gauche",
    "tone": "green",
    "description": "Défend la social-démocratie, le progressisme et une plus grande intervention de l’État dans l’économie, dans le cadre de la démocratie libérale."
  },
  {
    "id": "center",
    "label": "Centre",
    "tone": "gray",
    "description": "Recherche un équilibre entre gauche et droite, marché et État, réforme et stabilité, avec une position modérée ou pragmatique."
  },
  {
    "id": "right",
    "label": "Droite",
    "tone": "blue",
    "description": "Défend le conservatisme, le libéralisme économique et un nationalisme modéré, dans le cadre de la démocratie libérale."
  },
  {
    "id": "right-extreme",
    "label": "Extrême droite",
    "tone": "navy",
    "description": "Fascisme, nationalisme racial et théocraties oppressives, avec un rejet explicite de la démocratie et une concentration autoritaire du pouvoir."
  },
  {
    "id": "third-position",
    "label": "Troisième position",
    "tone": "purple",
    "description": "Synthèse nationaliste et corporatiste qui rejette le capitalisme libéral et le marxisme, en dehors de l’axe traditionnel gauche-droite."
  },
  {
    "id": "libertarian",
    "label": "Libertarien",
    "tone": "amber",
    "description": "Défend un État minimal, le libre marché, la propriété privée et les libertés individuelles, sans proposer l’abolition totale de l’État."
  },
  {
    "id": "anarchist",
    "label": "Anarchiste",
    "tone": "charcoal",
    "description": "Rejette l’État et toute autorité coercitive, et défend une organisation sociale libre, volontaire et autogérée, à gauche comme à droite."
  }
],
  faqItems: [
  {
    "question": "Le test est-il fiable ?",
    "answer": "Le test politique Politest permet de lire et de comparer des positions politiques. Ses questions sont réparties sur 12 axes pour réduire le biais lié à un seul sujet. Il ne remplace toutefois ni l’étude, ni le débat, ni une analyse universitaire."
  },
  {
    "question": "Combien de temps dure le test ?",
    "answer": "La version courte prend environ 5 minutes, la version complète environ 9 minutes et la version approfondie, avec 240 questions, environ 30 minutes."
  },
  {
    "question": "Puis-je refaire le test ?",
    "answer": "Oui. Vous pouvez refaire le test politique autant de fois que vous le souhaitez, et choisir une autre longueur pour voir si votre résultat change."
  },
  {
    "question": "Y a-t-il une bonne réponse ?",
    "answer": "Il n’y a pas de bonne réponse. Le test mesure vos préférences sur la démocratie, la monarchie, le fédéralisme, l’immigration, la religion en politique, l’économie, le commerce international, le libéralisme, le conservatisme, le progressisme et d’autres sujets."
  },
  {
    "question": "Comment l’algorithme calcule-t-il le résultat ?",
    "answer": "Chaque réponse ajoute des points à un pôle précis. L’algorithme calcule des pourcentages par axe, compare votre vecteur idéologique aux profils des courants politiques, des pays et des personnalités, puis présente les compatibilités les plus élevées."
  },
  {
    "question": "Le résultat peut-il changer ?",
    "answer": "Oui, si vos opinions évoluent, si vous répondez avec plus de nuances ou si vous choisissez une version plus longue. La version approfondie tend à réduire les fluctuations en utilisant davantage de questions."
  },
  {
    "question": "Le test est-il scientifique ?",
    "answer": "Politest n’est pas un instrument scientifique validé cliniquement. C’est un test politique pédagogique, inspiré des modèles du spectre politique et des questionnaires idéologiques, qui permet de réfléchir et de comparer des positions."
  },
  {
    "question": "Puis-je partager mon résultat ?",
    "answer": "Oui. Une fois le test terminé, vous pouvez partager votre résultat pour discuter de vos idées, du spectre politique et des 12 axes avec d’autres personnes."
  },
  {
    "question": "Le test collecte-t-il des données ?",
    "answer": "Le test est anonyme et ne nécessite aucune inscription. Vos réponses servent à calculer votre résultat directement dans votre navigateur. Votre progression y est enregistrée pour vous permettre de reprendre le test, sans demander votre nom, votre adresse e-mail ou votre identité."
  },
  {
    "question": "Puis-je passer le test sur mon téléphone ?",
    "answer": "Oui. L’interface est conçue pour les téléphones et les ordinateurs. Vous pouvez passer le test dans le navigateur de votre smartphone."
  }
],
  howEyebrow: "Comment ça marche",
  howTitle: "Comment fonctionne le test politique Politest",
  howLead:
    "Un test d’idéologie politique simple et visuel : répondez à des affirmations, puis Politest calcule vos pourcentages et montre votre position sur le spectre politique dans chaque dimension.",
  steps: [
  {
    "title": "Répondez aux questions",
    "text": "Indiquez votre accord ou votre désaccord avec des affirmations sur l’économie, l’État, les libertés civiles, les valeurs, la religion, la politique étrangère et la technologie."
  },
  {
    "title": "Une analyse sur 12 axes",
    "text": "Chaque réponse vous situe sur 12 axes idéologiques indépendants, du libre marché à la planification et du nationalisme au mondialisme."
  },
  {
    "title": "Découvrez votre profil",
    "text": "Obtenez votre profil idéologique, les idéologies les plus compatibles, le pays et la personnalité les plus proches, ainsi que vos résultats par axe."
  }
],
  axesGuideEyebrow: "12 axes",
  axesGuideTitle: "Que signifie chaque axe ?",
  axesGuideLead:
    "Le test idéologique Politest analyse le fédéralisme, la représentation politique, la démocratie, les élections, l'immigration, le commerce international, la religion en politique, la politique économique, la morale et la technologie dans des dimensions distinctes.",
  discoveryEyebrow: "Ce que vous découvrirez",
  discoveryTitle: "Un portrait complet de vos convictions politiques",
  discoveryLead:
    "Au-delà de la gauche et de la droite : votre résultat montre avec qui, où et à quel point vos idées concordent.",
  discoveryItems: [
  {
    "icon": "ideology",
    "title": "Votre idéologie",
    "text": "Le courant politique qui vous correspond"
  },
  {
    "icon": "country",
    "title": "Votre pays",
    "text": "La nation dont le profil est le plus proche du vôtre"
  },
  {
    "icon": "personality",
    "title": "Votre personnalité politique",
    "text": "La figure historique qui partage le plus vos idées"
  },
  {
    "icon": "spectrum",
    "title": "Votre spectre",
    "text": "Votre position entre gauche et droite"
  },
  {
    "icon": "profile",
    "title": "Votre profil",
    "text": "Un portrait complet de vos convictions"
  },
  {
    "icon": "compatibility",
    "title": "Compatibilité",
    "text": "Votre degré d’accord avec votre propre idéologie"
  }
],
  exampleEyebrow: "Exemple réel",
  exampleTitle: "Voici à quoi ressemble votre résultat",
  exampleCaption: "Exemple illustré en utilisant des données réelles du catalogue Politest.",
  exampleCta: "Je veux voir mon résultat",
  spectrumEyebrow: "Spectre politique",
  spectrumTitle: "Découvrez votre spectre politique",
  spectrumLead:
    "Le résultat permet de visualiser votre position entre gauche, droite et centre. Il identifie aussi les courants plus radicaux, autoritaires ou libertariens qui sortent de cet axe, comme l’extrême droite, la gauche radicale, la troisième position, le libertarianisme et l’anarchisme.",
  faqTitle: "Foire aux questions",
  faqLead: "Les réponses aux questions les plus fréquentes avant de passer le test.",
  navStart: "Démarrer",
  menuAria: "Ouvrir le menu",
  roseAria: "Rose des 12 axes",
  spectrumBarAria: "Barre de spectre politique avec les huit catégories",
  versionsEyebrow: "Versions",
  versionsTitle: "Choisissez le niveau de détail",
  versionsLead:
    "Commencez par le test rapide ou allez plus loin pour obtenir un portrait plus précis de votre profil idéologique. Toutes les versions utilisent les mêmes 12 axes et donnent un résultat immédiat.",
  variantEyebrow: "Choisir le format",
  variantTitlePre: "Vous préférez la rapidité ou ",
  variantTitleEm: "la précision ?",
  backToStart: "Retour au début",
  depthLabel: "Profondeur",
  depthAria: (level) => `Niveau de détail : ${level} sur 3`,
  recommended: "Recommandé",
  formatNotes: ["Toutes les versions utilisent les mêmes 12 axes", "Anonyme, aucune inscription", "Résultat immédiat"],
  variantLead:
    "La version courte donne rapidement un résultat. La version complète affine la comparaison avec les profils idéologiques.",
  quizNavAria: "Navigation du test",
  autoAdvance: "Passer automatiquement à la question suivante",
  back: "Précédent",
  next: "Suivant",
  calculating: "Calcul...",
  seeResult: "Voir les résultats",
  archetypeSkip: "Passer",
  errMissingAnswer: "Vous devez encore répondre à cette question avant de voir le résultat.",
  errLoadQuiz: "Impossible de charger le test.",
  errApiUnavailable: "Impossible de charger le test. Veuillez réessayer.",
  errCalc: "Impossible de calculer le résultat.",
  errImage: "Impossible de générer l'image de résultat.",
  errHttp: (status) => `Erreur HTTP ${status}`,
  resultsEyebrow: "Analyse terminée",
  resultsH1Pre: "Votre profil ",
  resultsH1Em: "idéologique",
  resultsLead: (count) => `Analyse fondée sur ${count} réponses réparties sur 12 dimensions de l’idéologie politique. Découvrez votre position sur chaque axe et vos correspondances idéologiques.`,
  resultsLeadShared:
    "Résultat partagé : voici les positions sur les 12 axes politiques et les profils idéologiques qui en découlent. Passez le test pour découvrir les vôtres.",
  resultsSummaryAria: "Résumé de l'analyse",
  metaAnswered: "Questions répondues",
  metaAxes: "Axes analysés",
  metaTop: "Profil le plus proche",
  axesSectionEyebrow: "Axes politiques",
  axesSectionTitle: "Votre position sur chaque axe",
  proximityEyebrow: "Proximité idéologique",
  otherMatches: "Autres correspondances",
  navOnThisPage: "Sur cette page",
  resultsNavAxes: "Les 12 axes",
  resultsNavSignature: "Ce qui vous distingue",
  resultsNavCountries: "Pays",
  resultsNavPersonalities: "Personnalités",
  resultsNavAreas: "Domaines",
  resultsNavBooks: "Lectures",
  resultsNavIdeologies: "Autres idéologies",
  countriesSectionTitle: "Pays les plus proches de vous",
  countryCurrentTab: "Pays actuels",
  countryHistoricalTab: "Régimes historiques",
  countriesDistantTitle: "Les pays les plus éloignés de vous",
  personalitiesSectionTitle: "Les personnalités les plus proches de vous",
  personalitiesByAreaTitle: "D’autres personnalités proches, par domaine",
  dimensionsTitle: "D’autres profils proches, par dimension",
  dimensionLabels: {
    political: "Sur le plan politique",
    social: "Sur le plan social",
    economic: "Sur le plan économique",
  },
  booksEyebrow: "Pour aller plus loin",
  booksTitle: "Lectures conseillées",
  booksTopLabel: "Le plus proche de vous",
  booksAuthorLabel: "Auteur",
  booksLead: "Une œuvre de chacune des personnalités les plus proches de vos résultats.",
  booksWhy: (pct) => `${pct} % de compatibilité`,
  booksYearBc: (year) => `${year} av. J.-C.`,
  booksCta: "Voir sur Amazon",
  areasGeneralTitle: "Les personnalités les plus proches de vos résultats",
  areasSectionTitle: "Les personnalités les plus proches, par domaine",
  areasTabsAria: "Regroupement des personnalités",
  areasGeneralTab: "Compatibilité générale",
  areasByAreaTab: "Domaine",
  personalitiesDistantTitle: "Les personnalités les plus éloignées de vous",
  ideologyDistantTitle: "L’idéologie la plus éloignée de vous",
  phraseTitle: "Une phrase qui vous décrit",
  phraseNote: (ideology) => `Cette phrase résume le type de société souhaité par une personne qui adhère à l’idéologie « ${ideology} ».`,
  signatureTitle: "Ce qui vous distingue",
  signatureUnusualLabel: "Votre position la plus inhabituelle",
  signatureCommonLabel: "Votre position la plus typique",
  signatureUnusualLead: (pole, percent) => `Vous tendez davantage vers le pôle « ${pole.toLowerCase()} » que ${Math.round(percent)} % des idéologies du catalogue.`,
  signatureUnusualLeadMax: (pole) => `Aucune idéologie du catalogue ne tend autant que vous vers le pôle « ${pole.toLowerCase()} ».`,
  signatureUnusualLeadBalanced: (axis, pole, percent) => `Votre position sur l’axe ${axis} est modérée. Elle vous situe néanmoins davantage vers le pôle « ${pole.toLowerCase()} » que ${Math.round(percent)} % des idéologies du catalogue.`,
  signatureUnusualNote: (axis) => `Parmi les 12 axes, ${axis} est celui sur lequel vous vous écartez le plus du catalogue. C’est le trait qui vous distingue.`,
  signatureCommonLead: (axis) => `Votre position sur l’axe ${axis} se situe presque exactement à la médiane du catalogue.`,
  signatureCommonNote: (pole) => `C’est un point d’équilibre : vous ne tendez ni vers le pôle « ${pole.toLowerCase()} » ni vers le pôle opposé.`,
  signatureCommonNoteBalanced: (axis) => `Vous vous situez au centre sur l’axe ${axis}, tout comme le catalogue. C’est là que votre profil se distingue le moins.`,
  tensionLabel: "Votre tension interne",
  tensionCombo: (firstPole, secondPole) => `${firstPole} et ${secondPole} en même temps`,
  tensionRare: (count, total) => `Seules ${count} des ${total} idéologies du catalogue combinent ces deux positions.`,
  tensionUnique: "Aucune idéologie dans le catalogue ne détient ces deux positions.",
  tensionExamples: (names) => `Les profils les plus proches : ${names}.`,
  tensionNote: (firstAxis, secondAxis) => `Dans le catalogue, ${firstAxis} et ${secondAxis} évoluent généralement dans le même sens. Votre profil inverse cette tendance.`,
  signatureMedian: "Médiane du catalogue",
  signatureYou: "Vous",
  personalityCategories: {
    politico: "Politique",
    religioso: "Religion",
    economista: "Économie",
    filosofo: "Philosophie",
    teorico: "Théorie politique",
    empresario: "Entreprise",
    intelectual: "Vie intellectuelle",
    ativista: "Militantisme",
  },
  redoAnalysis: "Refaire l’analyse",
  share: "Partager",
  saveOrShare: "Partager mon résultat",
  generatingPng: "Génération du PNG…",
  generatingPdf: "Génération du PDF…",
  downloadPdf: "Télécharger le PDF",
  report: {
    fileName: 'politest-rapport',
    docLabel: "Rapport complet",
    profileEyebrow: "Votre profil idéologique",
    headerLabel: (ideology) => `Rapport de profil politique · ${ideology}`,
    kpiCountry: "Pays le plus proche",
    kpiPersonality: "Personnalité",
    kpiAxes: "Axes analysés",
    kpiAnswered: (count) => `${count} questions répondues`,
    tocTitle: "Dans ce rapport",
    generatedOn: (date) => `Généré le ${date}`,
    axesIntro: "Votre position sur chacun des 12 axes. La barre part du centre (50 %) et s’étend vers le pôle auquel vous tendez. Le badge indique l’intensité.",
    intensityLegend: "Intensité",
    intensityLevels: [
  "Équilibré · jusqu’à 57 %",
  "Tendance · de 58 à 72 %",
  "Forte · de 73 à 87 %",
  "Très forte · 88 % ou plus"
],
    alsoClose: "D’autres profils proches, par dimension",
    continued: "suite",
    areasIntro: "Les personnalités du catalogue dont le profil sur les 12 axes ressemble le plus au vôtre.",
    booksIntro: "Une œuvre de chacune des personnalités les plus proches de vos résultats. Les liens sont disponibles dans la version en ligne.",
    aboutTitle: "À propos de ce rapport",
    aboutText: "Politest compare vos réponses aux profils d’idéologies, de pays et de personnalités sur les mêmes 12 axes. La compatibilité mesure la proximité entre profils ; ce n’est ni un diagnostic scientifique ni une étiquette définitive. Le calcul s’effectue dans votre navigateur.",
    ctaTitle: "Refaire le test ou le partager"
  },
  shareFilePrefix: 'politest-profil',
  shareMessage: (ideology, ideologyPct, country, countryPct, personality, personalityPct) => `J’ai découvert mon profil idéologique avec Politest !\n\n💡 Idéologie la plus compatible :\n${ideology} — ${ideologyPct} % de compatibilité\n\n🌎 Pays le plus compatible :\n${country} — ${countryPct} % de compatibilité\n\n👤 Personnalité la plus compatible :\n${personality} — ${personalityPct} % de compatibilité\n\n👉 Passez le test et partagez votre résultat :\nhttps://politest.anatole.co/fr`,
  progress: (current, total) => `Question ${current} sur ${total}`,
  progressDone: (percent) => `${percent}% terminé`,
  archetypeHeader: "Définissez votre archétype",
  archetypeStep: (current, total) => `${current} sur ${total}`,
  progressAria: (percent) => `Progression du test : ${percent} %`,
  answersAria: "Options de réponse",
  countryKicker: "Pays le plus compatible",
  flagLabel: "Drapeau",
  flagHistoricLabel: "Drapeau / symbole historique",
  flagAlt: (label, name) => `${label} de ${name}`,
  flagUnavailable: "Drapeau non disponible",
  flagUnavailableAria: (name) => `Drapeau non disponible pour ${name}`,
  personalityKicker: "Personnalité la plus compatible",
  portraitAlt: (name) => `Portrait de ${name}`,
  portraitUnavailableAria: (name) => `Portrait non disponible pour ${name}`,
  compatibilityAria: (pct) => `Compatibilité: ${pct} pour cent`,
  matchWord: "compatibilité",
  shareTitle: "Mon profil idéologique | politest.anatole.co",
  shareTopMatch: "Profil le plus proche",
  shareCountry: "Pays le plus compatible",
  sharePersonality: "Personnalité",
  shareResultLabel: "MES RÉSULTATS",
  shareMostCompatible: "LE PLUS COMPATIBLE",
  shareYourAxes: "VOS 12 AXES",
  shareOtherPersonalities: "AUTRES PERSONNALITÉS",
  shareNearbyCountries: "PAYS PROCHES",
  shareFooterCta: "DÉCOUVREZ VOTRE PROFIL",
  shareFooterUrl: 'POLITEST.ANATOLE.CO',
  ossEyebrow: "Code source ouvert",
  ossTitle: "Un projet indépendant et transparent",
  ossLead: "Le code de Politest est public : vous pouvez vérifier comment chaque réponse est notée, comment la compatibilité est calculée et d’où viennent les profils.",
  ossCards: [
  {
    "title": "Indépendant",
    "text": "Aucun lien avec un parti, un gouvernement ou une campagne. Personne ne paie pour apparaître dans votre résultat."
  },
  {
    "title": "Auditable",
    "text": "La notation des réponses et le calcul de compatibilité sont visibles dans le code, sans boîte noire."
  },
  {
    "title": "Vérifiable",
    "text": "Les questions et les profils sont stockés dans des fichiers versionnés avec un historique public."
  },
  {
    "title": "Collaboratif",
    "text": "Une question biaisée ou un profil inexact ? Ouvrez un signalement ou proposez une modification sur GitHub."
  }
],
  ossBarText: "Lire le code, vérifier les données et contribuer sur GitHub.",
  ossGithubCta: "Voir sur GitHub",
  ossIssueCta: "Proposer une amélioration",
  feedbackTitle: "Un problème ou une idée ?",
  feedbackReport: "Signaler un problème",
  feedbackSuggest: "Proposer des améliorations"
};
