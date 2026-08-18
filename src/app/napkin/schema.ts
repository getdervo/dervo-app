export type Question = {
  id: string;
  label: string;
  hint: string;
  placeholder: string;
  required?: boolean;
  rows?: number;
  maxLength: number;
};

export const QUESTIONS: Question[] = [
  {
    id: "idea",
    label: "What's the idea, in one sentence?",
    hint: "If you can't fit it on a napkin, it isn't ready yet.",
    placeholder: "A marketplace that lets…",
    required: true,
    rows: 2,
    maxLength: 280,
  },
  {
    id: "problem",
    label: "What problem does it solve?",
    hint: "Describe the pain, not the product.",
    placeholder: "Right now, people have to…",
    required: true,
    rows: 4,
    maxLength: 1000,
  },
  {
    id: "who",
    label: "Who hurts most without it?",
    hint: "Be specific. \"Everyone\" is not an audience.",
    placeholder: "Freelance designers who bill hourly and…",
    required: true,
    rows: 3,
    maxLength: 1000,
  },
  {
    id: "today",
    label: "How do they solve it today?",
    hint: "Every problem already has a workaround — spreadsheets, duct tape, sheer willpower.",
    placeholder: "Most of them cobble together…",
    rows: 3,
    maxLength: 1000,
  },
  {
    id: "why_you",
    label: "Why you?",
    hint: "What do you know, or have, that most people attempting this wouldn't?",
    placeholder: "I spent six years…",
    rows: 3,
    maxLength: 1000,
  },
  {
    id: "money",
    label: "How does it make money?",
    hint: "A guess is fine. A blank is not.",
    placeholder: "Subscription at roughly…",
    rows: 3,
    maxLength: 1000,
  },
  {
    id: "assumption",
    label: "What has to be true for this to work?",
    hint: "Name the single biggest assumption you're making.",
    placeholder: "This only works if…",
    rows: 3,
    maxLength: 1000,
  },
  {
    id: "walk_away",
    label: "What would make you walk away?",
    hint: "Deciding this now, while it's cheap, is the whole point.",
    placeholder: "If after three months…",
    rows: 3,
    maxLength: 1000,
  },
];

export type NapkinState = {
  status: "idle" | "error" | "success";
  errors: Record<string, string>;
  answers: Record<string, string>;
};

export const initialNapkinState: NapkinState = {
  status: "idle",
  errors: {},
  answers: {},
};

/** Shared by the Server Action; kept out of the "use server" file so it can export non-functions. */
export function validate(answers: Record<string, string>) {
  const errors: Record<string, string> = {};

  for (const question of QUESTIONS) {
    const answer = answers[question.id] ?? "";

    if (question.required && answer.length === 0) {
      errors[question.id] = "This one's worth answering.";
    } else if (answer.length > question.maxLength) {
      errors[question.id] = `Keep it under ${question.maxLength} characters.`;
    }
  }

  return errors;
}
