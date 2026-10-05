// English is the only supported language.
import type { PersonalityCategory, ProfileDimension } from '../types/quiz';

export type Lang = 'en';
export const LANG: Lang = 'en';

interface QuizFormatStrings {
  label: string;
  questionCount: string;
  description: string;
  duration: string;
  action: string;
}

interface Strings {
  htmlLang: string;
  docTitle: string;
  loadingAnalysis: string;
  loadingQuiz: string;
  loadingResult: string;
  tryAgain: string;
  crashTitle: string;
  crashBody: string;
  crashBodyWithProgress: string;
  crashReload: string;
  resumeEyebrow: string;
  resumeTitle: string;
  resumeBody: (answered: number, total: number) => string;
  resumeContinue: string;
  resumeDiscard: string;
  resumeUnavailable: string;
  skipToContent: string;
  backToStartAria: string;
  mainNavAria: string;
  navHow: string;
  navAxes: string;
  navSpectrum: string;
  navFaq: string;
  navIdeologies: string;
  navPersonalities: string;
  navCountries: string;
  navSupport: string;
  redoQuiz: string;
  religionLabel: string;
  religionQuestion: string;
  religionNone: string;
  religionNames: Record<'christianity' | 'judaism' | 'islam' | 'buddhism', string>;
  denominationLabel: string;
  denominationQuestion: string;
  denominationNames: Record<'catholic' | 'protestant' | 'orthodox', string>;
  restartQuiz: string;
  heroEyebrow: string;
  h1Pre: string;
  h1Em: string;
  h1Post: string;
  introLead: string;
  startQuiz: string;
  seeAxes: string;
  heroLabels: string[];
  heroTeaserLabel: string;
  heroTeaserTag: string;
  formats: { short: QuizFormatStrings; extended: QuizFormatStrings; extreme: QuizFormatStrings };
  axisExplanations: Record<string, string>;
  axisInfoAria: (label: string) => string;
  closeLabel: string;
  personalityInfoAria: (name: string) => string;
  closenessTitle: string;
  closenessYou: string;
  compareEyebrow: string;
  compareTitle: string;
  compareLead: string;
  compareSearchLabel: string;
  compareSearchPlaceholder: string;
  compareView: string;
  compareAxesTitle: string;
  compareNoResults: string;
  compareLoading: string;
  compareLoadError: string;
  compareTypeLabels: Record<'personality' | 'country' | 'ideology', string>;
  compareAxisAdverbs: Partial<Record<string, string>>;
  compareClosestLine: (adverb: string, name: string) => string;
  compareFarthestLine: (adverb: string, name: string) => string;
  compareClosestFallback: (axis: string, name: string) => string;
  compareFarthestFallback: (axis: string, name: string) => string;
  compareIdentical: (name: string) => string;
  compareNearestLine: (axis: string, name: string) => string;
  compareNoFarLine: (name: string) => string;
  compareValues: (pole: string, you: number, them: number, name: string) => string;
  compareOptionAria: (name: string, type: string) => string;
  homeAxes: Record<string, { label: string; leftPole: string; rightPole: string }>;
  spectrumItems: { id: string; label: string; tone: string; description: string }[];
  faqItems: { question: string; answer: string }[];
  howEyebrow: string;
  howTitle: string;
  howLead: string;
  steps: { title: string; text: string }[];
  axesGuideEyebrow: string;
  axesGuideTitle: string;
  axesGuideLead: string;
  discoveryEyebrow: string;
  discoveryTitle: string;
  discoveryLead: string;
  discoveryItems: { icon: string; title: string; text: string }[];
  exampleEyebrow: string;
  exampleTitle: string;
  exampleCaption: string;
  exampleCta: string;
  spectrumEyebrow: string;
  spectrumTitle: string;
  spectrumLead: string;
  faqTitle: string;
  faqLead: string;
  navStart: string;
  menuAria: string;
  roseAria: string;
  spectrumBarAria: string;
  versionsEyebrow: string;
  versionsTitle: string;
  versionsLead: string;
  variantEyebrow: string;
  variantTitlePre: string;
  variantTitleEm: string;
  backToStart: string;
  depthLabel: string;
  depthAria: (level: number) => string;
  recommended: string;
  formatNotes: string[];
  variantLead: string;
  quizNavAria: string;
  autoAdvance: string;
  back: string;
  next: string;
  calculating: string;
  seeResult: string;
  archetypeSkip: string;
  errMissingAnswer: string;
  errLoadQuiz: string;
  errApiUnavailable: string;
  errCalc: string;
  errImage: string;
  errHttp: (status: number) => string;
  resultsEyebrow: string;
  resultsH1Pre: string;
  resultsH1Em: string;
  resultsLead: (count: number) => string;
  resultsLeadShared: string;
  resultsSummaryAria: string;
  metaAnswered: string;
  metaAxes: string;
  metaTop: string;
  axesSectionEyebrow: string;
  axesSectionTitle: string;
  proximityEyebrow: string;
  otherMatches: string;
  navOnThisPage: string;
  resultsNavAxes: string;
  resultsNavSignature: string;
  resultsNavCountries: string;
  resultsNavPersonalities: string;
  resultsNavAreas: string;
  resultsNavBooks: string;
  resultsNavIdeologies: string;
  countriesSectionTitle: string;
  countryCurrentTab: string;
  countryHistoricalTab: string;
  countriesDistantTitle: string;
  personalitiesSectionTitle: string;
  personalitiesByAreaTitle: string;
  dimensionsTitle: string;
  dimensionLabels: Record<ProfileDimension, string>;
  areasGeneralTitle: string;
  booksEyebrow: string;
  booksTitle: string;
  booksTopLabel: string;
  booksAuthorLabel: string;
  booksLead: string;
  booksWhy: (pct: number) => string;
  booksYearBc: (year: number) => string;
  booksCta: string;
  areasSectionTitle: string;
  areasTabsAria: string;
  areasGeneralTab: string;
  areasByAreaTab: string;
  personalitiesDistantTitle: string;
  ideologyDistantTitle: string;
  phraseTitle: string;
  phraseNote: (ideology: string) => string;
  signatureTitle: string;
  signatureUnusualLabel: string;
  signatureCommonLabel: string;
  signatureUnusualLead: (pole: string, percent: number) => string;
  signatureUnusualLeadMax: (pole: string) => string;
  signatureUnusualLeadBalanced: (axis: string, pole: string, percent: number) => string;
  signatureUnusualNote: (axis: string) => string;
  signatureCommonLead: (axis: string) => string;
  signatureCommonNote: (pole: string) => string;
  signatureCommonNoteBalanced: (axis: string) => string;
  tensionLabel: string;
  tensionCombo: (firstPole: string, secondPole: string) => string;
  tensionRare: (count: number, total: number) => string;
  tensionUnique: string;
  tensionExamples: (names: string) => string;
  tensionNote: (firstAxis: string, secondAxis: string) => string;
  signatureMedian: string;
  signatureYou: string;
  personalityCategories: Record<PersonalityCategory, string>;
  redoAnalysis: string;
  share: string;
  saveOrShare: string;
  generatingPng: string;
  downloadPdf: string;
  generatingPdf: string;
  report: {
    fileName: string;
    docLabel: string;
    profileEyebrow: string;
    headerLabel: (ideology: string) => string;
    kpiCountry: string;
    kpiPersonality: string;
    kpiAxes: string;
    kpiAnswered: (count: number) => string;
    tocTitle: string;
    generatedOn: (date: string) => string;
    axesIntro: string;
    intensityLegend: string;
    intensityLevels: [string, string, string, string];
    alsoClose: string;
    continued: string;
    areasIntro: string;
    booksIntro: string;
    aboutTitle: string;
    aboutText: string;
    ctaTitle: string;
  };
  shareFilePrefix: string;
  shareMessage: (
    ideology: string,
    ideologyPct: number,
    country: string,
    countryPct: number,
    personality: string,
    personalityPct: number
  ) => string;
  progress: (current: number, total: number) => string;
  progressDone: (percent: number) => string;
  archetypeHeader: string;
  archetypeStep: (current: number, total: number) => string;
  progressAria: (percent: number) => string;
  answersAria: string;
  countryKicker: string;
  flagLabel: string;
  flagHistoricLabel: string;
  flagAlt: (label: string, name: string) => string;
  flagUnavailable: string;
  flagUnavailableAria: (name: string) => string;
  personalityKicker: string;
  portraitAlt: (name: string) => string;
  portraitUnavailableAria: (name: string) => string;
  compatibilityAria: (pct: string) => string;
  matchWord: string;
  shareTitle: string;
  shareTopMatch: string;
  shareCountry: string;
  sharePersonality: string;
  shareResultLabel: string;
  shareMostCompatible: string;
  shareYourAxes: string;
  shareOtherPersonalities: string;
  shareNearbyCountries: string;
  shareFooterCta: string;
  shareFooterUrl: string;
  supportEyebrow: string;
  supportTitle: string;
  ossEyebrow: string;
  ossTitle: string;
  ossLead: string;
  ossCards: { title: string; text: string }[];
  ossBarText: string;
  ossGithubCta: string;
  ossIssueCta: string;
  feedbackTitle: string;
  feedbackReport: string;
  feedbackSuggest: string;
  supportTitleEm: string;
  supportLead: string;
  supportPrivacyNote: string;
  supportCopy: string;
  supportCopied: string;
  supportCopyAria: (label: string) => string;
  supportCoins: {
    id: string;
    name: string;
    network: string;
    address: string;
  }[];
}

const en: Strings = {
  htmlLang: 'en',
  docTitle: 'Politest — Political Quiz and Ideology Test across 12 axes',
  loadingAnalysis: 'Loading political analysis...',
  loadingQuiz: 'Loading quiz...',
  loadingResult: 'Loading results...',
  tryAgain: 'Try again',
  crashTitle: 'Something went wrong',
  crashBody: 'The page hit an unexpected error. Reload to try again.',
  crashBodyWithProgress: 'The page hit an unexpected error, but your answers are saved. Reload and choose to continue where you left off.',
  crashReload: 'Reload the page',
  resumeEyebrow: 'Quiz in progress',
  resumeTitle: 'Pick up where you left off',
  resumeBody: (answered, total) => `You have answered ${answered} of ${total} questions. Your answers are saved in this browser.`,
  resumeContinue: 'Continue',
  resumeDiscard: 'Start over',
  resumeUnavailable: 'The previous quiz could not be resumed. Please start a new one.',
  skipToContent: 'Skip to content',
  backToStartAria: 'Back to start',
  mainNavAria: 'Main navigation',
  navHow: 'How it works',
  navAxes: '12 axes',
  navSpectrum: 'Spectrum',
  navFaq: 'FAQ',
  navIdeologies: 'Ideologies',
  navPersonalities: 'Personalities',
  navCountries: 'Countries',
  navSupport: 'Support',
  redoQuiz: 'Retake quiz',
  religionLabel: 'Religion',
  religionQuestion: 'Do you follow a religion? We only use this to tailor your recommendations.',
  religionNone: 'No religion',
  religionNames: { christianity: 'Christianity', judaism: 'Judaism', islam: 'Islam', buddhism: 'Buddhism' },
  denominationLabel: 'Christian tradition',
  denominationQuestion: 'Which Christian tradition do you follow?',
  denominationNames: { catholic: 'Catholic', protestant: 'Protestant', orthodox: 'Orthodox' },
  restartQuiz: 'Restart quiz',
  heroEyebrow: 'Political discovery',
  h1Pre: 'Do you really know your ',
  h1Em: 'political ideology',
  h1Post: '?',
  introLead:
    'You might be labeling yourself wrong. In a few minutes, discover your real ideology, the country that thinks most like you, and the political leader closest to your ideas.',
  startQuiz: 'Discover my profile',
  seeAxes: 'See the 12 axes',
  heroLabels: ['Free', 'Anonymous', 'Fast', 'Instant result'],
  heroTeaserLabel: 'match',
  heroTeaserTag: 'Example result',
  formats: {
    short: {
      label: 'Short',
      questionCount: '36 questions',
      description: 'A quick result, ideal for a first reading of your profile',
      duration: 'About 5 min',
      action: 'Start short version'
    },
    extended: {
      label: 'Full',
      questionCount: '60 questions',
      description: 'More precision to bring your result closer to the ideological profiles.',
      duration: 'About 9 min',
      action: 'Start full version'
    },
    extreme: {
      label: 'Extreme',
      questionCount: '240 questions',
      description: 'Know the exact synthesis of your thinking with 100% precision.',
      duration: 'About 30 min',
      action: 'Start extreme version'
    }
  },
  axisInfoAria: (label) => `What does the ${label} axis mean?`,
  closeLabel: 'Close',
  personalityInfoAria: (name) => `See details about ${name}`,
  closenessTitle: 'What brings you closer',
  closenessYou: 'You',
  compareEyebrow: 'Comparative analysis',
  compareTitle: 'Compare yourself with any profile',
  compareLead: 'Pick a personality, country or ideology and see, axis by axis, where you are close or far apart.',
  compareSearchLabel: 'Search a profile to compare',
  compareSearchPlaceholder: 'Search a personality, country or ideology',
  compareView: 'View',
  compareAxesTitle: 'Your 12 axes',
  compareNoResults: 'No profiles found.',
  compareLoading: 'Comparing…',
  compareLoadError: 'Could not load the comparison. Please try again.',
  compareTypeLabels: { personality: 'Personality', country: 'Country', ideology: 'Ideology' },
  compareAxisAdverbs: {
    estrutura: 'structurally',
    economia: 'economically',
    moral: 'morally',
    tecnologia: 'technologically',
    diplomacia: 'diplomatically'
  },
  compareClosestLine: (adverb, name) => `You are ${adverb} compatible with ${name}.`,
  compareFarthestLine: (adverb, name) => `You are ${adverb} distant from ${name}.`,
  compareClosestFallback: (axis, name) => `In ${axis}, you are compatible with ${name}.`,
  compareFarthestFallback: (axis, name) => `In ${axis}, you are distant from ${name}.`,
  compareIdentical: (name) => `You and ${name} have practically identical positions on every axis.`,
  compareNearestLine: (axis, name) => `Your closest axis to ${name} is ${axis}.`,
  compareNoFarLine: (name) => `No axis is far from ${name}.`,
  compareValues: (pole, you, them, name) => `${pole}: you ${you}% · ${name} ${them}%.`,
  compareOptionAria: (name, type) => `${name}, ${type}`,
  axisExplanations: {
    estrutura:
      'Measures whether you prefer power distributed among states, cities, and local communities or a unitary national state with more uniform laws and command.',
    representacao:
      'Compares trust in elections, opposition, and democratic institutions with a preference for strong leadership, technocracy, monarchy, or authoritarian regimes.',
    poder:
      'Evaluates the balance between order, surveillance, punishment, and state control versus privacy, individual freedom, and civil autonomy.',
    imigracao:
      'Looks at whether you value cultural assimilation, language, and national identity or multiculturalism, open migration, and plurality of customs.',
    diplomacia:
      'Analyzes your position on armed forces, weapons, deterrence, and military intervention in contrast with negotiation, pacifism, and international organizations.',
    intervencao:
      'Measures the leaning between external non-interventionism and more assertive national sovereignty, geopolitical nationalism, and active defense of national interests.',
    economia:
      'Compares a preference for public ownership, state companies, and collective services with private property, privatization, and business leadership.',
    controle:
      'Evaluates state planning, regulation, and active economic policy against free markets, low interference, monetary autonomy, and competition.',
    comercio:
      'Measures protectionism, productive sovereignty, and defense of national industry against globalism, free trade, and international economic integration.',
    religiao:
      'Compares secularism, separation of religion and state, and criticism of religious privileges with the public influence of faith and religious values.',
    moral:
      'Evaluates cultural progressivism, civil rights, and social change in contrast with tradition, family, customs, and moral conservatism.',
    tecnologia:
      'Measures enthusiasm for technology, AI, genetic engineering, and technical development against biological, environmental, and preservationist caution.'
  },
  homeAxes: {
    estrutura: { label: 'Structure', leftPole: 'Federal', rightPole: 'Unitary' },
    representacao: { label: 'Representation', leftPole: 'Democracy', rightPole: 'Autocracy' },
    poder: { label: 'Power', leftPole: 'Security', rightPole: 'Liberty' },
    imigracao: { label: 'Immigration', leftPole: 'Assimilation', rightPole: 'Multiculturalism' },
    diplomacia: { label: 'Diplomacy', leftPole: 'Militarist', rightPole: 'Pacifist' },
    intervencao: { label: 'Intervention', leftPole: 'Non-interventionist', rightPole: 'Nationalist' },
    economia: { label: 'Economy', leftPole: 'Public', rightPole: 'Private' },
    controle: { label: 'Control', leftPole: 'Planning', rightPole: 'Free market' },
    comercio: { label: 'Trade', leftPole: 'Protectionism', rightPole: 'Globalism' },
    religiao: { label: 'Religion', leftPole: 'Irreligious', rightPole: 'Religious' },
    moral: { label: 'Morality', leftPole: 'Progressive', rightPole: 'Traditionalist' },
    tecnologia: { label: 'Technology', leftPole: 'Technology', rightPole: 'Biology' }
  },
  spectrumItems: [
    {
      id: 'left-radical',
      label: 'Radical left',
      tone: 'darkred',
      description:
        'Revolutionary or totalitarian single-party communism, with a planned economy, strong centralization, and concentrated state power.'
    },
    {
      id: 'left',
      label: 'Left',
      tone: 'green',
      description:
        'Advocates social democracy, progressivism, and greater state intervention in the economy within liberal democracy.'
    },
    {
      id: 'center',
      label: 'Center',
      tone: 'gray',
      description:
        'Seeks balance between left and right, market and state, reform and stability, with a moderate or pragmatic political stance.'
    },
    {
      id: 'right',
      label: 'Right',
      tone: 'blue',
      description:
        'Advocates conservatism, economic liberalism, and moderate nationalism within liberal democracy.'
    },
    {
      id: 'right-extreme',
      label: 'Far-right',
      tone: 'navy',
      description:
        'Fascism, racial nationalism, and oppressive theocracies, with explicit rejection of democracy and authoritarian concentration of power.'
    },
    {
      id: 'third-position',
      label: 'Third position',
      tone: 'purple',
      description:
        'A nationalist, corporatist synthesis that rejects both liberal capitalism and Marxism, outside the traditional left-right axis.'
    },
    {
      id: 'libertarian',
      label: 'Libertarian',
      tone: 'amber',
      description:
        'Advocates a minimal state, free markets, private property, and individual liberties, without proposing the total abolition of the state.'
    },
    {
      id: 'anarchist',
      label: 'Anarchist',
      tone: 'charcoal',
      description:
        'Rejects the state and all coercive authority, advocating free, voluntary, and self-managed social organization, from the left or the right.'
    }
  ],
  faqItems: [
    {
      question: 'Is the test reliable?',
      answer:
        'The Politest political test is reliable as a tool for reading and comparing political positions. It uses questions spread across 12 axes to reduce single-topic bias, but it does not replace study, debate, or academic analysis.'
    },
    {
      question: 'How long does it take?',
      answer:
        'The short version takes about 5 minutes. The full version takes roughly 9 minutes. The extreme version, with 240 questions, can take about 30 minutes.'
    },
    {
      question: 'Can I retake it?',
      answer:
        'Yes. You can retake the political quiz as many times as you like, including choosing another depth to compare whether your result changes.'
    },
    {
      question: 'Is there a right answer?',
      answer:
        'There is no right answer. The ideology test measures preferences about democracy, monarchy, federalism, immigration, religion in politics, economic policy, international trade, liberalism, conservatism, progressivism, and other topics.'
    },
    {
      question: 'How does the algorithm calculate?',
      answer:
        'Each answer adds points to a specific pole. The algorithm calculates percentages per axis, compares your ideological vector with the profiles of political currents, countries, and personalities, and returns the highest compatibilities.'
    },
    {
      question: 'Does the result change?',
      answer:
        'It can change if your opinions change, if you answer with more nuance, or if you take a longer version. The extreme version tends to reduce fluctuations by using more questions.'
    },
    {
      question: 'Is the test scientific?',
      answer:
        'Politest is not a clinically validated scientific instrument. It is an educational political test, inspired by political spectrum models and ideology quizzes, useful for reflection and comparison.'
    },
    {
      question: 'Can I share it?',
      answer:
        'Yes. When you finish, you can share your result to discuss political ideology, the political spectrum, left, right, center, and the 12 axes with other people.'
    },
    {
      question: 'Does the test collect data?',
      answer:
        'The test is anonymous and requires no sign-up. Answers are used to calculate the result at quiz time, without asking for your name, email, or personal identification.'
    },
    {
      question: 'Can I take it on my phone?',
      answer:
        'Yes. The interface was designed for mobile and desktop, so you can take the political test in your smartphone browser.'
    }
  ],
  howEyebrow: 'How it works',
  howTitle: 'How the Politest political quiz works',
  howLead:
    'A simple, visual political ideology test: you respond to statements, Politest calculates your percentages, and shows where you stand on the political spectrum in each dimension.',
  steps: [
    {
      title: 'Answer the questions',
      text: 'Agree or disagree with statements about the economy, the state, civil liberties, values, religion, foreign policy, and technology.'
    },
    {
      title: 'Analysis across 12 axes',
      text: 'Each answer positions you on 12 independent ideological axes - from free markets to planning, from nationalism to globalism.'
    },
    {
      title: 'Discover your profile',
      text: 'Receive your ideological profile, most compatible ideologies, closest country, related personality, and per-axis results.'
    }
  ],
  axesGuideEyebrow: '12 axes',
  axesGuideTitle: 'What does each axis mean?',
  axesGuideLead:
    'The Politest ideology test analyzes federalism, political representation, democracy, elections, immigration, international trade, religion in politics, economic policy, morality, and technology in separate dimensions.',
  discoveryEyebrow: 'What you will discover',
  discoveryTitle: 'A complete portrait of your political convictions',
  discoveryLead:
    'More than left or right: your result shows who, where, and how strongly your ideas actually align.',
  discoveryItems: [
    { icon: 'ideology', title: 'Your ideology', text: 'Which political current matches you' },
    { icon: 'country', title: 'Your country', text: 'Which nation thinks most like you' },
    { icon: 'personality', title: 'Your political leader', text: 'Which historical figure is your ideological match' },
    { icon: 'spectrum', title: 'Your spectrum', text: 'Where you fall between left and right' },
    { icon: 'profile', title: 'Your profile', text: 'A complete portrait of your convictions' },
    { icon: 'compatibility', title: 'Compatibility', text: 'How much you truly agree with your own ideology' }
  ],
  exampleEyebrow: 'Real example',
  exampleTitle: "Here's what your result looks like",
  exampleCaption: 'Illustrative example using real data from the Politest catalog.',
  exampleCta: 'I want to see my result',
  spectrumEyebrow: 'Political spectrum',
  spectrumTitle: 'Discover your political spectrum',
  spectrumLead:
    'The result helps you visualize your political position between left, right, and center, and also identifies more radical, authoritarian, or libertarian forms that fall outside that axis, such as far-right, radical left, third position, libertarianism, and anarchism.',
  faqTitle: 'Frequently asked questions',
  faqLead: 'Everything people usually ask before taking the test.',
  navStart: 'Start',
  menuAria: 'Open menu',
  roseAria: 'Rose of the 12 axes',
  spectrumBarAria: 'Political spectrum bar with the eight categories',
  versionsEyebrow: 'Versions',
  versionsTitle: 'Choose the depth',
  versionsLead:
    'Start with the quick quiz or go deeper for a more precise portrait of your ideological profile. All versions use the same 12 axes and return the result immediately.',
  variantEyebrow: 'Choose the format',
  variantTitlePre: 'Do you want speed or ',
  variantTitleEm: 'precision?',
  backToStart: 'Back to start',
  depthLabel: 'Depth',
  depthAria: (level) => `Depth ${level} of 3`,
  recommended: 'Recommended',
  formatNotes: ['All versions use the same 12 axes', 'Anonymous, no sign-up', 'Instant result'],
  variantLead:
    'The short version reveals the result quickly. The full version increases precision to bring your result closer to the ideological profiles.',
  quizNavAria: 'Quiz navigation',
  autoAdvance: 'Advance on answer',
  back: 'Back',
  next: 'Next',
  calculating: 'Calculating…',
  seeResult: 'See results',
  archetypeSkip: 'Skip',
  errMissingAnswer: 'You still need to answer this question before seeing the result.',
  errLoadQuiz: 'Could not load the quiz.',
  errApiUnavailable: 'The quiz service is unavailable. Please try again later.',
  errCalc: 'Could not calculate the result.',
  errImage: 'Could not generate the result image.',
  errHttp: (status) => `HTTP error ${status}`,
  resultsEyebrow: 'Analysis complete',
  resultsH1Pre: 'Your ideological ',
  resultsH1Em: 'profile',
  resultsLead: (count) =>
    `Analysis based on ${count} answers distributed across 12 fundamental dimensions of political ideology. Check your position on each axis and your ideological matches.`,
  resultsLeadShared:
    'Shared result: the position on each of the 12 political axes and the ideological matches calculated from it. Take the test to discover yours.',
  resultsSummaryAria: 'Analysis summary',
  metaAnswered: 'Questions answered',
  metaAxes: 'Axes analyzed',
  metaTop: 'Top match',
  axesSectionEyebrow: 'Political axes',
  axesSectionTitle: 'Percentage result per axis',
  proximityEyebrow: 'Ideological proximity',
  otherMatches: 'Other matches',
  navOnThisPage: 'On this page',
  resultsNavAxes: 'The 12 axes',
  resultsNavSignature: 'What sets you apart',
  resultsNavCountries: 'Countries',
  resultsNavPersonalities: 'Figures',
  resultsNavAreas: 'Fields',
  resultsNavBooks: 'Further reading',
  resultsNavIdeologies: 'Other ideologies',
  countriesSectionTitle: 'Countries closest to you',
  countryCurrentTab: 'Present-day',
  countryHistoricalTab: 'Historical',
  countriesDistantTitle: 'Furthest from you',
  personalitiesSectionTitle: 'Figures closest to you',
  personalitiesByAreaTitle: 'Also close to you, by field',
  dimensionsTitle: 'Also close to you, by dimension of your profile',
  dimensionLabels: {
    political: 'Politically',
    social: 'Socially',
    economic: 'Economically',
  },
  booksEyebrow: 'Go further',
  booksTitle: 'Further reading',
  booksTopLabel: 'Closest to you',
  booksAuthorLabel: 'Author',
  booksLead: 'One work by each of the figures closest to your results.',
  booksWhy: (pct) => `${pct}% compatible`,
  booksYearBc: (year) => `${year} BC`,
  booksCta: 'See on Amazon',
  areasGeneralTitle: 'The closest figures to your results',
  areasSectionTitle: 'The closest figures by field',
  areasTabsAria: 'How figures are grouped',
  areasGeneralTab: 'Overall compatibility',
  areasByAreaTab: 'Field',
  personalitiesDistantTitle: 'Furthest from you',
  ideologyDistantTitle: 'The ideology furthest from you',
  phraseTitle: 'A sentence that describes you',
  phraseNote: (ideology) => `This is how someone from ${ideology} would sum up the society they want.`,
  signatureTitle: 'What sets you apart',
  signatureUnusualLabel: 'Your most unusual position',
  signatureCommonLabel: 'Your most typical position',
  signatureUnusualLead: (pole, percent) => `You lean further toward ${pole.toLowerCase()} than ${Math.round(percent)}% of the ideologies in the catalog.`,
  signatureUnusualLeadMax: (pole) => `No ideology in the catalog leans as far toward ${pole.toLowerCase()} as you do.`,
  signatureUnusualLeadBalanced: (axis, pole, percent) =>
    `Your position on ${axis} is middle of the road. Even so, that puts you further toward ${pole.toLowerCase()} than ${Math.round(percent)}% of the ideologies in the catalog.`,
  signatureUnusualNote: (axis) => `Of all 12 axes, ${axis} is where you depart most from the field. It is the trait that sets you apart.`,
  signatureCommonLead: (axis) => `Your position on ${axis} sits almost exactly at the catalog median.`,
  signatureCommonNote: (pole) => `This is common ground. You lean neither toward ${pole.toLowerCase()} nor to the opposite pole.`,
  signatureCommonNoteBalanced: (axis) => `You sit at the centre on ${axis}, and so does the catalog. This is where your profile stands out least.`,
  tensionLabel: 'Your internal tension',
  tensionCombo: (firstPole, secondPole) => `${firstPole} and ${secondPole} at the same time`,
  tensionRare: (count, total) => `Only ${count} of the ${total} ideologies in the catalog hold both of these positions.`,
  tensionUnique: 'No ideology in the catalog holds both of these positions.',
  tensionExamples: (names) => `Closest matches: ${names}.`,
  tensionNote: (firstAxis, secondAxis) => `In the catalog, ${firstAxis} and ${secondAxis} usually move together. You reverse that pattern.`,
  signatureMedian: 'Ideology median',
  signatureYou: 'You',
  personalityCategories: {
    politico: 'Politics',
    religioso: 'Religion',
    economista: 'Economics',
    filosofo: 'Philosophy',
    teorico: 'Political theory',
    empresario: 'Business',
    intelectual: 'Intellectual life',
    ativista: 'Activism',
  },
  redoAnalysis: 'Retake analysis',
  share: 'Share',
  saveOrShare: 'Share result',
  generatingPng: 'Generating PNG...',
  generatingPdf: 'Generating PDF...',
  downloadPdf: 'Download PDF',
  report: {
    fileName: 'politest-report',
    docLabel: 'Full report',
    profileEyebrow: 'Your ideological profile',
    headerLabel: (ideology) => `Political profile report · ${ideology}`,
    kpiCountry: 'Closest country',
    kpiPersonality: 'Figure',
    kpiAxes: 'Axes analyzed',
    kpiAnswered: (count) => `${count} questions answered`,
    tocTitle: 'In this report',
    generatedOn: (date) => `Generated on ${date}`,
    axesIntro: 'Your position on each of the 12 axes. The bar starts at the center (50%) and extends toward the pole you lean to; the badge shows the intensity.',
    intensityLegend: 'Intensity',
    intensityLevels: ['Balanced · up to 57%', 'Leaning · 58 to 72%', 'Strong · 73 to 87%', 'Very strong · 88% or more'],
    alsoClose: 'Also close, by dimension of your profile',
    continued: 'continued',
    areasIntro: 'The figures in the catalog whose profile across the 12 axes most resembles yours.',
    booksIntro: 'One work by each of the figures closest to your results. Links in the online version of the result.',
    aboutTitle: 'About this report',
    aboutText: 'Politest compares your answers with profiles of ideologies, countries and figures on the same 12 axes. Compatibility measures closeness between profiles; it is not a scientific diagnosis or a definitive label. Your answers are not stored.',
    ctaTitle: 'Retake the quiz or share it'
  },
  shareFilePrefix: 'politest-profile',
  shareMessage: (ideology, ideologyPct, country, countryPct, personality, personalityPct) =>
    `I discovered my ideological profile on the Politest Political Quiz!\n\n` +
    `💡 Most compatible ideology:\n` +
    `${ideology} - ${ideologyPct}% compatibility\n\n` +
    `🌎 Most compatible country/nation:\n` +
    `${country} - ${countryPct}% compatibility\n\n` +
    `👤 Most compatible personality:\n` +
    `${personality} - ${personalityPct}% compatibility\n\n` +
    `👉 Take the test and share your result:\nhttps://politest.anatole.co`,
  progress: (current, total) => `Question ${current} of ${total}`,
  progressDone: (percent) => `${percent}% complete`,
  archetypeHeader: 'Identifying your archetype',
  archetypeStep: (current, total) => `${current} of ${total}`,
  progressAria: (percent) => `Quiz progress: ${percent}%`,
  answersAria: 'Answer options',
  countryKicker: 'Most compatible country',
  flagLabel: 'Flag',
  flagHistoricLabel: 'Flag / historical symbol',
  flagAlt: (label, name) => `${label} of ${name}`,
  flagUnavailable: 'Flag unavailable',
  flagUnavailableAria: (name) => `Flag unavailable for ${name}`,
  personalityKicker: 'Most compatible personality',
  portraitAlt: (name) => `Portrait of ${name}`,
  portraitUnavailableAria: (name) => `Portrait unavailable for ${name}`,
  compatibilityAria: (pct) => `Compatibility: ${pct} percent`,
  matchWord: 'match',
  shareTitle: 'My ideological profile | politest.anatole.co',
  shareTopMatch: 'Top match',
  shareCountry: 'Most compatible country',
  sharePersonality: 'Personality',
  shareResultLabel: 'MY RESULT',
  shareMostCompatible: 'MOST COMPATIBLE',
  shareYourAxes: 'YOUR 12 AXES',
  shareOtherPersonalities: 'OTHER PERSONALITIES',
  shareNearbyCountries: 'NEARBY COUNTRIES',
  shareFooterCta: 'DISCOVER YOUR PROFILE',
  shareFooterUrl: 'POLITEST.ANATOLE.CO',
  supportEyebrow: 'Support the project',
  supportTitle: '',
  ossEyebrow: 'Open source',
  ossTitle: 'An independent, transparent project',
  ossLead: "You don't have to take our word for it. The Politest code is public: you can see how every answer is scored, how compatibility is calculated and where the profiles come from.",
  ossCards: [
    { title: 'Independent', text: 'No ties to parties, governments or campaigns. Nobody pays to appear in your result.' },
    { title: 'Auditable', text: 'Answer scoring and the compatibility calculation live in the code, with no black box.' },
    { title: 'Verifiable', text: 'Questions, ideologies, countries and personalities are stored in versioned files with a public history.' },
    { title: 'Collaborative', text: 'Found a biased question or an inaccurate profile? Open an issue or send a pull request.' }
  ],
  ossBarText: 'Read the code, audit the data and contribute on GitHub.',
  ossGithubCta: 'View on GitHub',
  ossIssueCta: 'Suggest an improvement',
  feedbackTitle: 'Found a problem or have an idea?',
  feedbackReport: 'Report a problem',
  feedbackSuggest: 'Suggest improvements',
  supportTitleEm: 'Support',
  supportLead:
    'Politest is independent and free. If the quiz helped you better understand your political ideology, consider donating via Pix or crypto to help keep the project running.',
  supportPrivacyNote: "We don't collect data. To donate without identifying yourself, use crypto.",
  supportCopy: 'Copy',
  supportCopied: 'Copied!',
  supportCopyAria: (label) => `Copy ${label} address`,
  supportCoins: [
    {
      id: 'pix',
      name: 'Pix',
      network: 'Random key',
      address: 'bf3e8e0b-27fe-4845-b5e2-358ca0281847'
    },
    {
      id: 'btc',
      name: 'Bitcoin',
      network: 'On-chain',
      address: 'bc1qsuy8r8gvl39apjykqzlgh7hku79ecarezhz2zj'
    },
    {
      id: 'lightning',
      name: 'Bitcoin',
      network: 'Lightning',
      address: 'lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhk2ctnw3jhymnsv96kcwfsa0gczg'
    },
    {
      id: 'eth',
      name: 'Ethereum',
      network: 'ERC-20',
      address: '0xDe821e55D6101AA42D05DBf2C07ad0BB866C23a5'
    },
    {
      id: 'xmr',
      name: 'Monero',
      network: 'XMR',
      address:
        '85Du1EuRPkybMVXTVptC6z31dsGPpTthsiMKM3yjY7YE24BUCkyNMd9Q82kwe5CvE7BegtDTNxaG8VwYdVvTgbjDU6DpuN1'
    }
  ]
};

export const t: Strings = en;
