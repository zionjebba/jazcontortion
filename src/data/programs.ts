export type Program = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  level: string;
  includes: string[];
  goals: string[];
  type: "Full Program" | "Video Course";
};

export const programs: Program[] = [
  {
    slug: "flexibility-blueprint",
    title: "The Flexibility Blueprint",
    tagline: "Build your flexibility from the ground up.",
    description:
      "A complete flexibility program combining structured training, guided videos, and practical resources to help you make consistent progress.",
    price: 15,
    image: "/flexibility-blueprint.png",
    level: "Beginner to Intermediate",
    includes: [
      "Structured training videos",
      "Flexibility Blueprint PDF",
      "Training calendar",
      "Progress tracker",
      "Digital bonuses",
    ],
    goals: ["flexibility"],
    type: "Full Program",
  },

  {
    slug: "leg-flexibility",
    title: "Leg Flexibility",
    tagline: "Go deeper with stronger, more flexible legs.",
    description:
      "Focused training for hamstrings, hip flexors, adductors, and the flexibility needed for deeper splits and leg-focused skills.",
    price: 15,
    image: "/hero-image.png",
    level: "All Levels",
    includes: [
      "Guided training videos",
      "Progressive flexibility sessions",
      "Training calendar",
      "Progress tracker",
    ],
    goals: ["flexibility", "contortion"],
    type: "Full Program",
  },

  {
    slug: "back-flexibility",
    title: "Back Flexibility",
    tagline: "Build the mobility and control behind your backbends.",
    description:
      "A focused approach to back flexibility, spinal mobility, shoulder opening, and the strength needed to work toward deeper backbends.",
    price: 15,
    image: "/hero-image.png",
    level: "Beginner to Intermediate",
    includes: [
      "Guided training videos",
      "Back flexibility routines",
      "Training calendar",
      "Progress tracker",
    ],
    goals: ["flexibility", "contortion"],
    type: "Full Program",
  },

  {
    slug: "active-flexibility",
    title: "Active Flexibility",
    tagline: "Turn flexibility into strength and control.",
    description:
      "Build the strength to actively control your range of motion and make your flexibility more useful for movement and skills.",
    price: 15,
    image: "/hero-image.png",
    level: "Intermediate",
    includes: [
      "Active flexibility training",
      "Strength-focused exercises",
      "Guided training videos",
      "Progress tracker",
    ],
    goals: ["flexibility", "strength"],
    type: "Full Program",
  },

  {
    slug: "calisthenics-for-flexibility",
    title: "Calisthenics for Flexibility",
    tagline: "Build the strength behind your movement.",
    description:
      "Use bodyweight strength and control to support flexibility, movement quality, and your contortion training.",
    price: 15,
    image: "/hero-image.png",
    level: "All Levels",
    includes: [
      "Bodyweight training videos",
      "Strength sessions",
      "Progressive workouts",
      "Training calendar",
    ],
    goals: ["strength", "skills", "control"],
    type: "Video Course",
  },

  {
    slug: "handstand-foundations",
    title: "Handstand Foundations",
    tagline: "Master the art of balancing on your hands.",
    description:
      "A comprehensive guide to building the wrist strength, shoulder mobility, and core control required to hold a solid handstand.",
    price: 15,
    image: "/hero-image.png",
    level: "Beginner",
    includes: [
      "Wrist conditioning routines",
      "Alignment drills",
      "Wall exercises",
      "Balance techniques",
    ],
    goals: ["skills", "control"],
    type: "Video Course",
  },

  {
    slug: "full-body-strength",
    title: "Full Body Strength",
    tagline: "Build a bulletproof foundation for advanced movement.",
    description:
      "Total body conditioning designed to protect your joints and increase your raw strength for contortion and acrobatics.",
    price: 15,
    image: "/hero-image.png",
    level: "Intermediate to Advanced",
    includes: [
      "Full body circuits",
      "Joint preparation",
      "Endurance building",
      "Recovery guides",
    ],
    goals: ["strength", "control"],
    type: "Full Program",
  }
];