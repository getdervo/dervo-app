/**
 * The idea assessment: four sections, twenty questions.
 *
 * Trimmed down from the original seven-section design — the 1–5 readiness
 * ratings are gone, most long-form questions became one-line inputs or chips,
 * and name/email moved to the end so the assessment opens on the idea itself.
 */

export type Field =
  | {
      kind: "text";
      id: string;
      label: string;
      placeholder: string;
      inputType?: "text" | "email";
      /** Sits in a two-up row on wider screens. */
      half?: boolean;
      optional?: boolean;
      maxLength?: number;
      /** Only shown when another field currently holds this value. */
      showWhen?: { field: string; equals: string };
    }
  | {
      kind: "textarea";
      id: string;
      label: string;
      hint?: string;
      placeholder: string;
      optional?: boolean;
      maxLength?: number;
    }
  | {
      kind: "single";
      id: string;
      label: string;
      options: string[];
      optional?: boolean;
    }
  | {
      kind: "multi";
      id: string;
      label: string;
      options: string[];
      optional?: boolean;
    };

export type Section = {
  /** Shown in the step rail. */
  badge: string;
  title: string;
  blurb?: string;
  fields: Field[];
};

export const SECTIONS: Section[] = [
  {
    badge: "1",
    title: "Your Idea",
    fields: [
      {
        kind: "textarea",
        id: "build",
        label: "In a sentence or two, what do you want to build?",
        placeholder:
          "e.g. A weekend meal-prep service for busy families in my neighborhood",
      },
      {
        kind: "text",
        id: "problem",
        label: "What problem does it solve?",
        placeholder: "e.g. Healthy home cooking takes time most families don't have",
      },
      {
        kind: "text",
        id: "who",
        label: "Who is it for?",
        placeholder: "e.g. Working parents nearby who don't have time to cook",
      },
      {
        kind: "single",
        id: "progress",
        label: "How far along are you?",
        options: [
          "Just an idea",
          "Researched it",
          "Have a name/brand",
          "Have a site or socials",
          "Made first sales",
          "Have regular customers",
        ],
      },
      {
        kind: "text",
        id: "differentiator",
        label: "What would make yours different?",
        placeholder: "Type your answer",
        optional: true,
      },
    ],
  },
  {
    badge: "2",
    title: "Your Customer",
    fields: [
      {
        kind: "single",
        id: "spoken_to",
        label: "Have you spoken to anyone who fits that description?",
        options: ["Yes, several", "One or two", "Not yet"],
      },
      {
        kind: "multi",
        id: "channels",
        label: "Where would you find them?",
        options: [
          "Instagram",
          "TikTok",
          "Facebook",
          "Google",
          "LinkedIn",
          "In person",
          "Word of mouth",
          "Not sure",
        ],
      },
      {
        kind: "single",
        id: "others_similar",
        label: "Do you know of others doing something similar?",
        options: ["Yes", "No", "Not sure"],
      },
      {
        kind: "text",
        id: "competitors",
        label: "If yes — who?",
        placeholder: "Type your answer",
        showWhen: { field: "others_similar", equals: "Yes" },
      },
    ],
  },
  {
    badge: "3",
    title: "Money",
    fields: [
      {
        kind: "multi",
        id: "revenue_model",
        label: "How would you make money?",
        options: [
          "Selling products",
          "Selling services",
          "Subscription",
          "Commission",
          "Digital products",
          "Consulting",
          "Not sure yet",
        ],
      },
      {
        kind: "text",
        id: "price",
        label: "What could you charge?",
        placeholder: "$45 per session",
      },
      {
        kind: "single",
        id: "price_basis",
        label: "How did you land on that?",
        options: [
          "Competitor pricing",
          "My costs plus margin",
          "What customers told me",
          "Honestly, a guess",
        ],
      },
      {
        kind: "single",
        id: "initial_investment",
        label: "How much could you invest to get started?",
        options: [
          "$0–$500",
          "$500–$1,000",
          "$1,000–$5,000",
          "$5,000–$10,000",
          "$10,000+",
        ],
      },
      {
        kind: "single",
        id: "target_monthly",
        label: "What would you like it to earn per month?",
        options: ["Under $500", "$500–2k", "$2k–5k", "$5k–10k", "$10k+"],
      },
    ],
  },
  {
    badge: "4",
    title: "You",
    fields: [
      {
        kind: "single",
        id: "hours",
        label: "How much time could you give this each week?",
        options: ["Under 5 hrs", "5–10 hrs", "10–20 hrs", "20+ hrs"],
      },
      {
        kind: "multi",
        id: "assets",
        label: "What do you already have going for you?",
        options: [
          "Skills in this area",
          "Industry experience",
          "Equipment or space",
          "An audience",
          "Existing customers",
          "A strong network",
          "Money to invest",
          "Starting fresh",
        ],
      },
      {
        kind: "single",
        id: "blocker",
        label: "What's the biggest thing in your way?",
        options: [
          "I don't know where to start",
          "Money",
          "Time",
          "Lack of knowledge",
          "Fear",
          "Don't know if the idea is good",
          "Marketing",
          "Legal/business setup",
          "Other",
        ],
      },
      {
        kind: "multi",
        id: "help_with",
        label: "What should Dervo help with first?",
        options: [
          "Validate my business idea",
          "Define my target customer",
          "Decide what to charge",
          "Analyze my competitors",
          "Create a marketing strategy",
          "Figure out how to get my first customers",
          "Create a launch plan",
          "Create a 30/60/90-day roadmap",
        ],
      },
      {
        kind: "text",
        id: "name",
        label: "Your name",
        placeholder: "Your name",
        half: true,
        maxLength: 120,
      },
      {
        kind: "text",
        id: "email",
        label: "Your email",
        placeholder: "you@example.com",
        inputType: "email",
        half: true,
        maxLength: 200,
      },
    ],
  },
];

export const QUESTION_COUNT = SECTIONS.reduce(
  (total, section) => total + section.fields.length,
  0,
);

/** Flat lookup of every field id and its shape, for server-side validation. */
export type FieldShape =
  | { type: "string"; maxLength: number }
  | { type: "option"; options: string[] }
  | { type: "options"; options: string[] };

export const FIELD_SHAPES: Record<string, FieldShape> = (() => {
  const shapes: Record<string, FieldShape> = {};

  for (const section of SECTIONS) {
    for (const field of section.fields) {
      switch (field.kind) {
        case "text":
        case "textarea":
          shapes[field.id] = {
            type: "string",
            maxLength: field.maxLength ?? 2000,
          };
          break;
        case "single":
          shapes[field.id] = { type: "option", options: field.options };
          break;
        case "multi":
          shapes[field.id] = { type: "options", options: field.options };
          break;
      }
    }
  }

  return shapes;
})();
