// Game data for Contradiction 4.0
// Represents different historical societies and their contradictions

export const mentorMarxQuotes = [
  "At a certain stage of development, the material productive forces of society come into conflict with the existing relations of production.",
  "The hand-mill gives you society with the feudal lord; the steam-mill, society with the industrial capitalist.",
  "No social order is ever destroyed before all the productive forces for which it is sufficient have been developed.",
  "The mode of production of material life conditions the general process of social, economic and political life.",
  "Between capitalist and communist society lies the period of the revolutionary transformation of the one into the other.",
];

export const levels = [
  {
    id: 1,
    name: "Feudal Farm",
    era: "Medieval Era",
    description: "A quiet feudal village where peasants work the lord's land with traditional tools.",
    initialProductivity: 100,
    aiBoost: 300,
    background: "linear-gradient(135deg, #4a5d3e 0%, #2d3a24 100%)",
    icon: "🏰",
    currentSystem: {
      name: "Feudal System",
      description: "Lords own land, peasants are bound to it, surplus goes to nobility.",
      contradiction: "AI robots increase productivity 3x, but feudal relations keep peasants oppressed.",
    },
    choices: [
      {
        id: "keep",
        label: "Keep Feudal System",
        description: "Lords control AI, peasants stay bound to land",
        outcome: "revolution",
        result: "The peasants revolt! They see the AI can free them but the lords hoard it. Society collapses into chaos.",
        stability: -50,
        marxQuote: "The contradiction becomes unbearable. The new productive forces shatter the old chains!",
      },
      {
        id: "reform",
        label: "Partial Reform",
        description: "Free some peasants, create wage labor with AI",
        outcome: "transition",
        result: "You've created early capitalism. Stability increases but new contradictions emerge as workers are exploited.",
        stability: 20,
        marxQuote: "One form of exploitation replaces another. The dialectic continues...",
      },
      {
        id: "cooperative",
        label: "Cooperative Ownership",
        description: "Peasants collectively own AI, share surplus",
        outcome: "success",
        result: "Society stabilizes! Productive forces and relations are in harmony. The village prospers together.",
        stability: 50,
        marxQuote: "When relations of production match productive forces, society flourishes!",
      },
    ],
  },
  {
    id: 2,
    name: "Early Capitalist Factory",
    era: "Industrial Revolution",
    description: "A bustling factory with steam engines, workers toil for 14 hours daily.",
    initialProductivity: 500,
    aiBoost: 1500,
    background: "linear-gradient(135deg, #5c4033 0%, #2b1f17 100%)",
    icon: "🏭",
    currentSystem: {
      name: "Industrial Capitalism",
      description: "Factory owners control means of production, workers sell labor for wages.",
      contradiction: "AI automation threatens jobs while owners accumulate massive profits.",
    },
    choices: [
      {
        id: "keep",
        label: "Pure Profit Maximization",
        description: "Replace workers with AI, maximize owner profits",
        outcome: "revolution",
        result: "Mass unemployment sparks worker uprising! The contradiction between socialized production and private appropriation explodes.",
        stability: -60,
        marxQuote: "Capital digs its own grave. The expropriators are expropriated!",
      },
      {
        id: "reform",
        label: "Welfare Capitalism",
        description: "Keep capitalism but add labor laws, benefits, unions",
        outcome: "transition",
        result: "Temporary stability achieved through compromise. Workers gain some rights but fundamental contradictions remain.",
        stability: 30,
        marxQuote: "Reform postpones but cannot resolve the essential contradiction.",
      },
      {
        id: "cooperative",
        label: "Worker Ownership",
        description: "Workers collectively own factory and AI, democratic control",
        outcome: "success",
        result: "A worker cooperative! AI benefits all. Productivity and well-being both increase. Harmony achieved.",
        stability: 60,
        marxQuote: "The associated producers rationally regulate their interchange with nature!",
      },
    ],
  },
  {
    id: 3,
    name: "Modern Tech Company",
    era: "Digital Age",
    description: "A Silicon Valley tech giant with cloud servers and global reach.",
    initialProductivity: 10000,
    aiBoost: 50000,
    background: "linear-gradient(135deg, #00d4ff 0%, #0066cc 100%)",
    icon: "💻",
    currentSystem: {
      name: "Platform Capitalism",
      description: "Tech monopolies control data and algorithms, gig workers have no benefits.",
      contradiction: "Advanced AI creates immense wealth while workers face precarity and surveillance.",
    },
    choices: [
      {
        id: "keep",
        label: "Surveillance Capitalism",
        description: "AI maximizes extraction from workers and users",
        outcome: "revolution",
        result: "Digital dystopia! Mass resistance erupts. Workers and users unite against algorithmic oppression. System failure.",
        stability: -70,
        marxQuote: "The contradiction reaches its highest form. The material conditions for liberation are fully ripe!",
      },
      {
        id: "reform",
        label: "Regulated Tech",
        description: "Government regulation, data rights, gig worker protections",
        outcome: "transition",
        result: "Moderate improvement. The platform still extracts value, but workers have some protections. Tension persists.",
        stability: 35,
        marxQuote: "The state mediates the contradiction but cannot transcend it.",
      },
      {
        id: "cooperative",
        label: "Platform Cooperative",
        description: "Workers and users own the platform, AI serves all",
        outcome: "success",
        result: "Digital communism achieved! Platform cooperatives thrive. AI benefits humanity. Productive forces finally liberated!",
        stability: 80,
        marxQuote: "From each according to ability, to each according to need. The realm of freedom begins!",
      },
    ],
  },
];

export const outcomeMessages = {
  revolution: {
    title: "⚔️ REVOLUTION!",
    color: "#ff4444",
    description: "The contradiction exploded! Society collapses into chaos as the oppressed rise up.",
  },
  transition: {
    title: "⚖️ UNSTABLE TRANSITION",
    color: "#ffaa00",
    description: "Temporary stability, but fundamental contradictions remain unresolved.",
  },
  success: {
    title: "✨ HARMONY ACHIEVED!",
    color: "#00ff88",
    description: "Productive forces and relations of production are in balance. Society flourishes!",
  },
};
