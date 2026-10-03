import type { AxisResult, CountryMatch, IdeologyMatch, PersonalityMatch } from '../types/quiz';

export interface ExampleResult {
  ideology: IdeologyMatch;
  country: CountryMatch;
  personality: PersonalityMatch;
  axes: AxisResult[];
}

const en: ExampleResult[] = [
  {
    ideology: {
      ideologyId: 'socialismo-stalinista',
      name: 'Stalinist Socialism',
      category: 'Radical Left',
      description:
        'Soviet model consolidated by Stalin, marked by forced industrialization, agrarian collectivization, rigid central planning, a cult of the leader, and mass repression against real or suspected opponents of the regime.',
      longDescription:
        'Soviet model consolidated by Stalin, marked by forced industrialization, agrarian collectivization, rigid central planning, a cult of the leader, and mass repression against real or suspected opponents of the regime.',
      phrase:
        'Quero uma sociedade sob líder forte e partido único, com coletivização agrária, planos quinquenais e industrialização acelerada.',
      compatibility: 92
    },
    country: {
      countryId: 'uniao-sovietica-urss',
      name: 'Soviet Union (USSR)',
      category: 'One-party planned socialism',
      description:
        "The world's first socialist state, the USSR was a single-party federation with a planned economy and centralized power, becoming a global superpower and the pole of communism during the Cold War.",
      flagPath: '/countries/flags/uniao-sovietica-urss.png',
      historical: true,
      period: '1922–1991',
      compatibility: 90
    },
    personality: {
      personalityId: 'stalin',
      name: 'Joseph Stalin',
      role: 'Dictator',
      category: 'politico',
      lifespan: '1878–1953',
      description:
        'At the head of the Soviet Union, Stalin imposed forced industrialization, agrarian collectivization, and central planning, consolidating a single-party regime marked by purges, terror, and mass repression.',
      imagePath: '/personalities/portraits/stalin.jpg',
      compatibility: 96
    },
    axes: [
      {
        axisId: 'representacao',
        label: 'Representation',
        leftPole: 'Democracy',
        rightPole: 'Autocracy',
        leftPercent: 11,
        rightPercent: 89,
        dominantPole: 'Autocracy',
        intensity: 'Very strong'
      },
      {
        axisId: 'economia',
        label: 'Economy',
        leftPole: 'Public',
        rightPole: 'Private',
        leftPercent: 94,
        rightPercent: 6,
        dominantPole: 'Public',
        intensity: 'Very strong'
      },
      {
        axisId: 'moral',
        label: 'Moral',
        leftPole: 'Progressive',
        rightPole: 'Traditionalist',
        leftPercent: 41,
        rightPercent: 59,
        dominantPole: 'Traditionalist',
        intensity: 'Leaning'
      }
    ]
  },
  {
    ideology: {
      ideologyId: 'socialismo',
      name: 'Socialism',
      category: 'Left',
      description:
        'Doctrine that advocates social or collective ownership of the means of production and a more egalitarian distribution of wealth, seeking to overcome capitalist exploitation through cooperation and economic planning.',
      longDescription:
        'Doctrine that advocates social or collective ownership of the means of production and a more egalitarian distribution of wealth, seeking to overcome capitalist exploitation through cooperation and economic planning.',
      phrase:
        'Quero uma sociedade sem exploração, com meios de produção coletivos e planejamento econômico substituindo o mercado capitalista.',
      compatibility: 89
    },
    country: {
      countryId: 'suecia',
      name: 'Sweden',
      category: 'Social-democratic monarchy',
      description:
        'A Nordic parliamentary monarchy, Sweden is a benchmark of social democracy, with a broad welfare state, high taxes, strong social equality, and an open, innovative market economy combined with progressive values.',
      flagPath: '/countries/flags/suecia.gif',
      historical: false,
      period: '',
      compatibility: 76
    },
    personality: {
      personalityId: 'karl-marx',
      name: 'Karl Marx',
      role: 'Philosopher and economist',
      category: 'teorico',
      lifespan: '1818–1883',
      description:
        'A German philosopher and economist, Marx created historical materialism and the critique of capitalism, analyzing class struggle and the exploitation of labor, and became the greatest reference of socialism and communism.',
      imagePath: '/personalities/portraits/karl-marx.jpg',
      compatibility: 94
    },
    axes: [
      {
        axisId: 'representacao',
        label: 'Representation',
        leftPole: 'Democracy',
        rightPole: 'Autocracy',
        leftPercent: 89,
        rightPercent: 11,
        dominantPole: 'Democracy',
        intensity: 'Very strong'
      },
      {
        axisId: 'economia',
        label: 'Economy',
        leftPole: 'Public',
        rightPole: 'Private',
        leftPercent: 96,
        rightPercent: 4,
        dominantPole: 'Public',
        intensity: 'Very strong'
      },
      {
        axisId: 'moral',
        label: 'Moral',
        leftPole: 'Progressive',
        rightPole: 'Traditionalist',
        leftPercent: 88,
        rightPercent: 12,
        dominantPole: 'Progressive',
        intensity: 'Strong'
      }
    ]
  },
  {
    ideology: {
      ideologyId: 'centrismo',
      name: 'Centrism',
      category: 'Center',
      description:
        'Political position that seeks balance between left and right, valuing moderation, pragmatism, and consensus, and combining elements of different currents to avoid extremes and favor gradual reforms.',
      longDescription:
        'Political position that seeks balance between left and right, valuing moderation, pragmatism, and consensus, and combining elements of different currents to avoid extremes and favor gradual reforms.',
      phrase:
        'Quero moderação e pragmatismo entre esquerda e direita, combinando o melhor de cada corrente em reformas graduais que evitam extremos.',
      compatibility: 85
    },
    country: {
      countryId: 'suica',
      name: 'Switzerland',
      category: 'Liberal direct democracy',
      description:
        'A European federal confederation, Switzerland is known for its direct democracy, strong cantonal autonomy, historic neutrality, and a prosperous economy based on finance, precision industry, and institutional stability.',
      flagPath: '/countries/flags/suica.gif',
      historical: false,
      period: '',
      compatibility: 81
    },
    personality: {
      personalityId: 'macron',
      name: 'Emmanuel Macron',
      role: 'Statesman',
      category: 'politico',
      lifespan: '1977–',
      description:
        "A French statesman, Macron reached France's presidency as a centrist, liberal reformer, defending markets, European integration, and economic reforms, seeking to overcome the traditional divide between left and right.",
      imagePath: '/personalities/portraits/macron.jpg',
      compatibility: 90
    },
    axes: [
      {
        axisId: 'representacao',
        label: 'Representation',
        leftPole: 'Democracy',
        rightPole: 'Autocracy',
        leftPercent: 70,
        rightPercent: 30,
        dominantPole: 'Democracy',
        intensity: 'Leaning'
      },
      {
        axisId: 'economia',
        label: 'Economy',
        leftPole: 'Public',
        rightPole: 'Private',
        leftPercent: 63,
        rightPercent: 37,
        dominantPole: 'Public',
        intensity: 'Leaning'
      },
      {
        axisId: 'moral',
        label: 'Moral',
        leftPole: 'Progressive',
        rightPole: 'Traditionalist',
        leftPercent: 65,
        rightPercent: 35,
        dominantPole: 'Progressive',
        intensity: 'Leaning'
      }
    ]
  },
  {
    ideology: {
      ideologyId: 'neoconservadorismo',
      name: 'Neoconservatism',
      category: 'Right',
      description:
        'Right-wing current that unites free markets, traditional values, and an interventionist foreign policy, advocating the promotion of democracy and national interests through military force and global leadership.',
      longDescription:
        'Right-wing current that unites free markets, traditional values, and an interventionist foreign policy, advocating the promotion of democracy and national interests through military force and global leadership.',
      phrase:
        'Quero exportar a democracia e defender os interesses da nação pela força militar, unindo livre mercado a valores tradicionais em casa.',
      compatibility: 86
    },
    country: {
      countryId: 'israel',
      name: 'Israel',
      category: 'National-technological republic',
      description:
        'A parliamentary republic in the Middle East, Israel combines a vibrant democracy, a strong Jewish national identity, an advanced technology economy, and a prolonged conflict with the Palestinians that dominates its politics and security.',
      flagPath: '/countries/flags/israel.gif',
      historical: false,
      period: '',
      compatibility: 82
    },
    personality: {
      personalityId: 'benjamin-netanyahu',
      name: 'Benjamin Netanyahu',
      role: 'Politician',
      category: 'politico',
      lifespan: '1949–',
      description:
        "An Israeli politician, Netanyahu became a central figure of Israel's nationalist, security-focused right, uniting economic liberalism, conservative Zionism, and a hard line against regional adversaries.",
      imagePath: '/personalities/portraits/benjamin-netanyahu.jpg',
      compatibility: 88
    },
    axes: [
      {
        axisId: 'representacao',
        label: 'Representation',
        leftPole: 'Democracy',
        rightPole: 'Autocracy',
        leftPercent: 61,
        rightPercent: 39,
        dominantPole: 'Democracy',
        intensity: 'Leaning'
      },
      {
        axisId: 'economia',
        label: 'Economy',
        leftPole: 'Public',
        rightPole: 'Private',
        leftPercent: 30,
        rightPercent: 70,
        dominantPole: 'Private',
        intensity: 'Leaning'
      },
      {
        axisId: 'moral',
        label: 'Moral',
        leftPole: 'Progressive',
        rightPole: 'Traditionalist',
        leftPercent: 15,
        rightPercent: 85,
        dominantPole: 'Traditionalist',
        intensity: 'Strong'
      }
    ]
  },
  {
    ideology: {
      ideologyId: 'fascismo',
      name: 'Fascism',
      category: 'Far-Right',
      description:
        'Totalitarian ideology of ultranationalism that exalts the strong state, the cult of the leader, militarism, and mass mobilization, suppressing opposition and subordinating the corporatist economy to national goals.',
      longDescription:
        'Totalitarian ideology of ultranationalism that exalts the strong state, the cult of the leader, militarism, and mass mobilization, suppressing opposition and subordinating the corporatist economy to national goals.',
      phrase:
        'Quero uma nação exaltada sob Estado forte e líder único, com militarismo, mobilização de massas e corporações a serviço da pátria.',
      compatibility: 81
    },
    country: {
      countryId: 'italia-fascista-mussolini',
      name: 'Fascist Italy (Mussolini)',
      category: 'Corporatist-nationalist dictatorship',
      description:
        "The birthplace of fascism, Mussolini's Italy was a totalitarian dictatorship that fused nationalism, a cult of the leader, a corporatist state, and militarism, suppressing opposition and seeking imperial expansion by force.",
      flagPath: '/countries/flags/italia-fascista-mussolini.png',
      historical: true,
      period: '1922–1943',
      compatibility: 92
    },
    personality: {
      personalityId: 'mussolini',
      name: 'Benito Mussolini',
      role: 'Dictator',
      category: 'politico',
      lifespan: '1883–1945',
      description:
        'The creator of fascism, Mussolini ruled Italy as a totalitarian dictatorship, fusing nationalism, a corporatist state, a cult of the leader, and expansionist militarism, serving as a model for European authoritarian regimes.',
      imagePath: '/personalities/portraits/mussolini.jpg',
      compatibility: 99
    },
    axes: [
      {
        axisId: 'representacao',
        label: 'Representation',
        leftPole: 'Democracy',
        rightPole: 'Autocracy',
        leftPercent: 10,
        rightPercent: 90,
        dominantPole: 'Autocracy',
        intensity: 'Very strong'
      },
      {
        axisId: 'economia',
        label: 'Economy',
        leftPole: 'Public',
        rightPole: 'Private',
        leftPercent: 68,
        rightPercent: 32,
        dominantPole: 'Public',
        intensity: 'Leaning'
      },
      {
        axisId: 'moral',
        label: 'Moral',
        leftPole: 'Progressive',
        rightPole: 'Traditionalist',
        leftPercent: 4,
        rightPercent: 96,
        dominantPole: 'Traditionalist',
        intensity: 'Very strong'
      }
    ]
  },
  {
    ideology: {
      ideologyId: 'integralismo-brasileiro',
      name: 'Brazilian Integralism',
      category: 'Third Position',
      description:
        'Authoritarian nationalist movement that emerged in 1930s Brazil, with a Christian and corporatist base, the motto God, Fatherland and Family, mass aesthetics, and frontal opposition to liberalism and communism.',
      longDescription:
        'Authoritarian nationalist movement that emerged in 1930s Brazil, with a Christian and corporatist base, the motto God, Fatherland and Family, mass aesthetics, and frontal opposition to liberalism and communism.',
      phrase:
        'Quero uma pátria sob Deus, Pátria e Família, comandada por um chefe autoritário e milícias fardadas contra liberais e comunistas.',
      compatibility: 88
    },
    country: {
      countryId: 'imperio-do-brasil',
      name: 'Empire of Brazil',
      category: 'Agrarian-slaveholding monarchy',
      description:
        'The only long-lasting empire in the Americas, imperial Brazil was a parliamentary monarchy under Pedro I and Pedro II, marked by political stability, a slave-based agrarian economy, and strong state centralization.',
      flagPath: '/countries/flags/imperio-do-brasil.png',
      historical: true,
      period: '1822–1889',
      compatibility: 62
    },
    personality: {
      personalityId: 'plinio-salgado',
      name: 'Plínio Salgado',
      role: 'Politician',
      category: 'politico',
      lifespan: '1895–1975',
      description:
        'Leader of Brazilian Integralism, Plínio Salgado created an authoritarian nationalist movement of Christian inspiration, with the motto God, Fatherland and Family and mass aesthetics inspired by the European fascisms of the 1930s.',
      imagePath: '/personalities/portraits/plinio-salgado.jpg',
      compatibility: 97
    },
    axes: [
      {
        axisId: 'representacao',
        label: 'Representation',
        leftPole: 'Democracy',
        rightPole: 'Autocracy',
        leftPercent: 13,
        rightPercent: 87,
        dominantPole: 'Autocracy',
        intensity: 'Strong'
      },
      {
        axisId: 'economia',
        label: 'Economy',
        leftPole: 'Public',
        rightPole: 'Private',
        leftPercent: 68,
        rightPercent: 32,
        dominantPole: 'Public',
        intensity: 'Leaning'
      },
      {
        axisId: 'moral',
        label: 'Moral',
        leftPole: 'Progressive',
        rightPole: 'Traditionalist',
        leftPercent: 5,
        rightPercent: 95,
        dominantPole: 'Traditionalist',
        intensity: 'Very strong'
      }
    ]
  },
  {
    ideology: {
      ideologyId: 'libertarianismo',
      name: 'Libertarianism',
      category: 'Libertarian',
      description:
        'Philosophy that advocates maximum individual freedom and a state reduced to essential functions, valuing private property, free markets, and personal autonomy while rejecting state coercion over life.',
      longDescription:
        'Philosophy that advocates maximum individual freedom and a state reduced to essential functions, valuing private property, free markets, and personal autonomy while rejecting state coercion over life.',
      phrase:
        'Quero uma sociedade de máxima autonomia pessoal, com o Estado reduzido a funções essenciais e propriedade privada acima de qualquer coerção.',
      compatibility: 90
    },
    country: {
      countryId: 'eua-new-hampshire',
      name: 'United States (New Hampshire)',
      category: 'Libertarian-fiscal region',
      description:
        'A small state in the northeastern United States, New Hampshire is known for its strong libertarian culture, low taxation, absence of a state income tax, and a motto that exalts liberty above all.',
      flagPath: '/countries/flags/eua-new-hampshire.png',
      historical: false,
      period: '',
      compatibility: 85
    },
    personality: {
      personalityId: 'mises',
      name: 'Ludwig von Mises',
      role: 'Economist',
      category: 'economista',
      lifespan: '1881–1973',
      description:
        'An Austrian economist, Mises was a great defender of the free market and demonstrated the impossibility of rational economic calculation under socialism, becoming a pillar of the Austrian School and an inspiration for modern libertarianism.',
      imagePath: '/personalities/portraits/mises.jpg',
      compatibility: 93
    },
    axes: [
      {
        axisId: 'representacao',
        label: 'Representation',
        leftPole: 'Democracy',
        rightPole: 'Autocracy',
        leftPercent: 89,
        rightPercent: 11,
        dominantPole: 'Democracy',
        intensity: 'Very strong'
      },
      {
        axisId: 'economia',
        label: 'Economy',
        leftPole: 'Public',
        rightPole: 'Private',
        leftPercent: 10,
        rightPercent: 90,
        dominantPole: 'Private',
        intensity: 'Very strong'
      },
      {
        axisId: 'moral',
        label: 'Moral',
        leftPole: 'Progressive',
        rightPole: 'Traditionalist',
        leftPercent: 70,
        rightPercent: 30,
        dominantPole: 'Progressive',
        intensity: 'Leaning'
      }
    ]
  },
  {
    ideology: {
      ideologyId: 'anarquismo',
      name: 'Anarchism',
      category: 'Anarchist',
      description:
        'Philosophy that rejects the state and all coercive authority, defending the free organization of society through voluntary associations, cooperation, and self-management, with freedom and equality as central values.',
      longDescription:
        'Philosophy that rejects the state and all coercive authority, defending the free organization of society through voluntary associations, cooperation, and self-management, with freedom and equality as central values.',
      phrase:
        'Quero uma sociedade sem Estado, organizada por associações voluntárias e apoio mútuo, onde liberdade e igualdade substituem toda autoridade coercitiva.',
      compatibility: 91
    },
    country: {
      countryId: 'aragao-e-catalunha-anarquistas-revolucao-espanhola',
      name: 'Anarchist Aragon and Catalonia',
      category: 'Collectivist-self-managed anarchism',
      description:
        "During the Spanish Revolution, regions of Aragon and Catalonia lived an anarchist experiment of collectivizing land and factories, with workers' self-management and social organization without a central state.",
      flagPath: '/countries/flags/aragao-e-catalunha-anarquistas-revolucao-espanhola.png',
      historical: true,
      period: '1936–1939',
      compatibility: 89
    },
    personality: {
      personalityId: 'bakunin',
      name: 'Mikhail Bakunin',
      role: 'Revolutionary',
      category: 'teorico',
      lifespan: '1814–1876',
      description:
        'A Russian revolutionary, Bakunin was the great theorist of collectivist anarchism, opposing the state and authoritarian Marxism and defending spontaneous social revolution and the free federation of communities and workers.',
      imagePath: '/personalities/portraits/bakunin.jpg',
      compatibility: 95
    },
    axes: [
      {
        axisId: 'representacao',
        label: 'Representation',
        leftPole: 'Democracy',
        rightPole: 'Autocracy',
        leftPercent: 86,
        rightPercent: 14,
        dominantPole: 'Democracy',
        intensity: 'Strong'
      },
      {
        axisId: 'economia',
        label: 'Economy',
        leftPole: 'Public',
        rightPole: 'Private',
        leftPercent: 79,
        rightPercent: 21,
        dominantPole: 'Public',
        intensity: 'Strong'
      },
      {
        axisId: 'moral',
        label: 'Moral',
        leftPole: 'Progressive',
        rightPole: 'Traditionalist',
        leftPercent: 90,
        rightPercent: 10,
        dominantPole: 'Progressive',
        intensity: 'Very strong'
      }
    ]
  }
];

export const EXAMPLE_RESULTS: ExampleResult[] = en;
