/**
 * The idea assessment, transcribed from the "Dervo Assessment" design canvas:
 * seven sections (A–G) then a confirmation screen.
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
      maxLength?: number;
    }
  | {
      kind: "textarea";
      id: string;
      label: string;
      hint?: string;
      placeholder: string;
      tall?: boolean;
      maxLength?: number;
    }
  | { kind: "single"; id: string; label: string; options: string[] }
  | { kind: "multi"; id: string; label: string; options: string[] }
  | {
      kind: "ratings";
      id: string;
      prompt: string;
      legend: string;
      items: { id: string; label: string }[];
    };

export type Section = {
  letter: string;
  title: string;
  blurb?: string;
  fields: Field[];
};

const ANSWER = "Type your answer";

export const SECTIONS: Section[] = [
  {
    letter: "A",
    title: "About You",
    fields: [
      {
        kind: "text",
        id: "name",
        label: "What is your name?",
        placeholder: "Your name",
        half: true,
        maxLength: 120,
      },
      {
        kind: "text",
        id: "email",
        label: "What is your email?",
        placeholder: "you@example.com",
        inputType: "email",
        half: true,
        maxLength: 200,
      },
      {
        kind: "single",
        id: "employment",
        label: "Are you currently employed?",
        options: [
          "Full-time",
          "Part-time",
          "Self-employed",
          "Student",
          "Not currently working",
        ],
      },
      {
        kind: "single",
        id: "hours",
        label:
          "How many hours per week could you realistically dedicate to this business?",
        options: ["Under 5 hrs", "5–10 hrs", "10–20 hrs", "20+ hrs"],
      },
      {
        kind: "single",
        id: "motivation",
        label: "Why do you want to start a business?",
        options: [
          "Extra income",
          "Replace my job",
          "Financial freedom",
          "Pursue a passion",
          "Build something long-term",
          "Other",
        ],
      },
      {
        kind: "textarea",
        id: "success_12mo",
        label: "What would success look like for you in the next 12 months?",
        placeholder: "e.g. Steady side income and my first few happy clients",
      },
    ],
  },
  {
    letter: "B",
    title: "Your Business Idea",
    fields: [
      {
        kind: "textarea",
        id: "idea",
        label: "1. Tell us about your business idea.",
        hint: "In your own words, what do you want to build?",
        placeholder:
          "e.g. A weekend meal-prep service for busy families in my neighborhood",
        tall: true,
      },
      {
        kind: "textarea",
        id: "offering",
        label: "2. What product or service would you sell?",
        placeholder: "e.g. Weekly prepped-meal boxes in three plan sizes",
      },
      {
        kind: "textarea",
        id: "buyer",
        label: "3. Who do you think would buy it?",
        placeholder: "e.g. Working parents nearby who don't have time to cook",
      },
      {
        kind: "textarea",
        id: "problem",
        label: "4. What problem does your business solve?",
        placeholder:
          "e.g. Healthy home cooking takes time most families don't have",
      },
      {
        kind: "textarea",
        id: "why_pay",
        label: "5. Why do you think people would pay for this solution?",
        placeholder: ANSWER,
      },
      {
        kind: "textarea",
        id: "origin",
        label: "6. How did you come up with this idea?",
        placeholder: ANSWER,
      },
      {
        kind: "single",
        id: "seen_similar",
        label: "7. Have you seen other businesses doing something similar?",
        options: ["Yes", "No", "Not sure"],
      },
      {
        kind: "textarea",
        id: "competitors",
        label: "8. If yes, who are your competitors or similar businesses?",
        placeholder: ANSWER,
      },
      {
        kind: "textarea",
        id: "differentiator",
        label: "9. What would make your business different?",
        placeholder: ANSWER,
      },
      {
        kind: "single",
        id: "progress",
        label: "10. Have you already started anything?",
        options: [
          "Just an idea",
          "Researched the idea",
          "Created a business name",
          "Created social media",
          "Created a website",
          "Started selling",
          "Already have customers",
          "Other",
        ],
      },
    ],
  },
  {
    letter: "C",
    title: "Customer",
    fields: [
      {
        kind: "textarea",
        id: "ideal_customer",
        label: "1. Who is your ideal customer?",
        placeholder: ANSWER,
      },
      {
        kind: "textarea",
        id: "who_benefits",
        label:
          "2. What type of person or business would benefit most from your product or service?",
        placeholder: ANSWER,
      },
      {
        kind: "textarea",
        id: "their_problem",
        label: "3. What problem are they currently experiencing?",
        placeholder: ANSWER,
      },
      {
        kind: "textarea",
        id: "current_solution",
        label: "4. How are they currently solving that problem?",
        placeholder: ANSWER,
      },
      {
        kind: "textarea",
        id: "why_switch",
        label: "5. Why would they choose your business instead?",
        placeholder: ANSWER,
      },
      {
        kind: "multi",
        id: "channels",
        label: "6. Where do you think your customers spend time?",
        options: [
          "Instagram",
          "TikTok",
          "Facebook",
          "Google",
          "LinkedIn",
          "In-person/community",
          "Referrals",
          "Other",
        ],
      },
      {
        kind: "single",
        id: "knows_customers",
        label: "7. Do you already know potential customers you could sell to?",
        options: ["Yes", "No"],
      },
      {
        kind: "single",
        id: "spoken_to",
        label: "8. Have you spoken to anyone who fits your target customer?",
        options: ["Yes", "No"],
      },
    ],
  },
  {
    letter: "D",
    title: "Money",
    blurb:
      "This helps Dervo understand whether the idea can actually make money.",
    fields: [
      {
        kind: "multi",
        id: "revenue_model",
        label: "1. How do you plan to make money?",
        options: [
          "Selling products",
          "Selling services",
          "Subscription",
          "Commission",
          "Digital products",
          "Consulting",
          "Other",
        ],
      },
      {
        kind: "text",
        id: "price",
        label: "2. What do you think you could charge?",
        placeholder: "e.g. $45 per session",
      },
      {
        kind: "textarea",
        id: "price_basis",
        label: "3. How did you arrive at that price?",
        placeholder: ANSWER,
      },
      {
        kind: "text",
        id: "competitor_pricing",
        label: "4. Do you know what your competitors charge?",
        placeholder: ANSWER,
      },
      {
        kind: "multi",
        id: "startup_costs",
        label: "5. What will you need to spend money on to start?",
        options: [
          "Equipment",
          "Inventory",
          "Website",
          "Software",
          "Marketing",
          "Insurance",
          "Registration",
          "Employees/contractors",
          "Other",
        ],
      },
      {
        kind: "single",
        id: "initial_investment",
        label: "6. How much are you comfortable investing initially?",
        options: [
          "$0–$500",
          "$500–$1,000",
          "$1,000–$5,000",
          "$5,000–$10,000",
          "$10,000+",
        ],
      },
      {
        kind: "text",
        id: "target_monthly",
        label:
          "7. How much would you ideally like the business to make per month?",
        placeholder: "e.g. $2,000 per month",
      },
    ],
  },
  {
    letter: "E",
    title: "Your Resources",
    blurb:
      "The best business idea for you depends on what you already have access to.",
    fields: [
      {
        kind: "textarea",
        id: "skills",
        label:
          "1. What skills do you already have that could help you run this business?",
        placeholder: ANSWER,
      },
      {
        kind: "textarea",
        id: "experience",
        label: "2. What experience do you have in this industry?",
        placeholder: ANSWER,
      },
      {
        kind: "textarea",
        id: "equipment",
        label: "3. What equipment or resources do you already have?",
        placeholder: ANSWER,
      },
      {
        kind: "multi",
        id: "audience",
        label: "4. Do you have an existing audience?",
        options: [
          "Social media following",
          "Email list",
          "Existing customers",
          "Professional network",
          "Community",
          "None",
        ],
      },
      {
        kind: "multi",
        id: "helpers",
        label: "5. Do you have people who could help you?",
        options: [
          "Friends/family",
          "Business partner",
          "Employees",
          "Contractors",
          "Mentors",
          "None",
        ],
      },
    ],
  },
  {
    letter: "F",
    title: "Business Readiness",
    fields: [
      {
        kind: "ratings",
        id: "readiness",
        prompt: "Rate yourself from 1–5.",
        legend: "1 = not yet · 5 = absolutely",
        items: [
          { id: "r_customer", label: "I understand my target customer." },
          { id: "r_problem", label: "I understand the problem I'm solving." },
          { id: "r_selling", label: "I know what I'm selling." },
          { id: "r_money", label: "I understand how I'll make money." },
          { id: "r_price", label: "I know what I'll charge." },
          { id: "r_find", label: "I know how I'll find customers." },
          { id: "r_competitors", label: "I understand my competitors." },
          { id: "r_launch", label: "I have a plan for launching." },
          { id: "r_time", label: "I have enough time to work on this." },
          { id: "r_confidence", label: "I feel confident taking the first step." },
        ],
      },
      {
        kind: "single",
        id: "blocker",
        label: "What is the biggest thing stopping you from starting?",
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
    ],
  },
  {
    letter: "G",
    title: "What Do You Want Dervo To Help With?",
    fields: [
      {
        kind: "multi",
        id: "help_with",
        label: "What would you like help figuring out?",
        options: [
          "Validate my business idea",
          "Define my target customer",
          "Create my offer",
          "Decide what to charge",
          "Analyze my competitors",
          "Create a business model",
          "Create a marketing strategy",
          "Figure out how to get my first customers",
          "Create a launch plan",
          "Set up business systems",
          "Determine what tools/software I need",
          "Create a 30/60/90-day roadmap",
          "All of the above",
        ],
      },
    ],
  },
];

export const RATING_SCALE = [1, 2, 3, 4, 5] as const;

/** Flat lookup of every answerable field id and its shape, for server-side validation. */
export type FieldShape =
  | { type: "string"; maxLength: number }
  | { type: "option"; options: string[] }
  | { type: "options"; options: string[] }
  | { type: "rating" };

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
        case "ratings":
          for (const item of field.items) {
            shapes[item.id] = { type: "rating" };
          }
          break;
      }
    }
  }

  return shapes;
})();
