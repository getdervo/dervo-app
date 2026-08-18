export type Question = {
  id: string;
  label: string;
  hint: string;
  placeholder: string;
  required?: boolean;
  rows?: number;
  maxLength: number;
};

export const ASSESSMENT_SLUGS = ["idea", "scale", "fix"] as const;

export type AssessmentSlug = (typeof ASSESSMENT_SLUGS)[number];

export type AssessmentMeta = {
  slug: AssessmentSlug;
  /** Card title on the landing page. */
  name: string;
  title: string;
  intro: string;
  /** Shown on the chooser, e.g. "8 questions · about 5 minutes". */
  summary: string;
};

const SCALE_QUESTIONS: Question[] = [
  {
    id: "business",
    label: "What does the business do, in one sentence?",
    hint: "The version you'd say out loud, not the one on the website.",
    placeholder: "We clean offices for…",
    required: true,
    rows: 2,
    maxLength: 280,
  },
  {
    id: "working",
    label: "What's working well enough to double down on?",
    hint: "Growth usually comes from feeding what already works, not adding something new.",
    placeholder: "Referrals from existing clients bring in…",
    required: true,
    rows: 3,
    maxLength: 1000,
  },
  {
    id: "bottleneck",
    label: "Where does growth actually break?",
    hint: "If twice as many customers showed up tomorrow, what snaps first?",
    placeholder: "We'd run out of…",
    required: true,
    rows: 3,
    maxLength: 1000,
  },
  {
    id: "shape",
    label: "What does a typical month look like?",
    hint: "Revenue, customers, jobs, capacity — whatever numbers you actually track.",
    placeholder: "Around 30 jobs, roughly…",
    rows: 3,
    maxLength: 1000,
  },
  {
    id: "manual",
    label: "What are you still doing by hand that should be a system?",
    hint: "The tasks only you can do are the ceiling on how big this gets.",
    placeholder: "I personally quote every…",
    rows: 3,
    maxLength: 1000,
  },
  {
    id: "team",
    label: "Who else is involved, and what do they own?",
    hint: "Staff, contractors, a spouse who does the books at midnight — all of it counts.",
    placeholder: "Two part-time cleaners and…",
    rows: 3,
    maxLength: 1000,
  },
  {
    id: "target",
    label: "What would the next level actually look like?",
    hint: "Put a number on it. \"Bigger\" isn't a target you can aim at.",
    placeholder: "Ten thousand a month with…",
    rows: 3,
    maxLength: 1000,
  },
  {
    id: "one_thing",
    label: "If you could only fix one thing this quarter, what would it be?",
    hint: "The honest answer here is usually the whole plan.",
    placeholder: "Getting off the tools so I can…",
    rows: 3,
    maxLength: 1000,
  },
];

const FIX_QUESTIONS: Question[] = [
  {
    id: "business",
    label: "What does the business do, in one sentence?",
    hint: "Start with the basics so the rest has something to hang on.",
    placeholder: "We do mobile car detailing for…",
    required: true,
    rows: 2,
    maxLength: 280,
  },
  {
    id: "whats_happening",
    label: "What's actually happening?",
    hint: "Describe what you're seeing, not what you think is causing it.",
    placeholder: "Bookings dropped by half and…",
    required: true,
    rows: 4,
    maxLength: 1000,
  },
  {
    id: "when",
    label: "When did it start going sideways?",
    hint: "Roughly when, and what else changed around that time.",
    placeholder: "Around March, right after we…",
    required: true,
    rows: 3,
    maxLength: 1000,
  },
  {
    id: "tried",
    label: "What have you already tried?",
    hint: "Including the things that didn't work — those rule out whole branches.",
    placeholder: "We dropped prices, ran ads…",
    rows: 3,
    maxLength: 1000,
  },
  {
    id: "numbers",
    label: "What do the numbers say?",
    hint: "Where money comes in, where it goes out, and what's changed in between.",
    placeholder: "Revenue is flat but costs…",
    rows: 3,
    maxLength: 1000,
  },
  {
    id: "signal",
    label: "Who's telling you something is wrong?",
    hint: "Customers, staff, your accountant, or a feeling at 3am — the source matters.",
    placeholder: "Two regulars mentioned…",
    rows: 3,
    maxLength: 1000,
  },
  {
    id: "avoiding",
    label: "What are you avoiding looking at?",
    hint: "There's usually one number or conversation you keep putting off. Name it.",
    placeholder: "I haven't reconciled…",
    rows: 3,
    maxLength: 1000,
  },
  {
    id: "stakes",
    label: "If nothing changes in six months, what happens?",
    hint: "Being specific about the downside makes the tradeoffs obvious.",
    placeholder: "We'd have to let go of…",
    rows: 3,
    maxLength: 1000,
  },
];

/** Chooser metadata for every assessment, including the wizard-driven idea one. */
export const ASSESSMENTS: Record<AssessmentSlug, AssessmentMeta> = {
  idea: {
    slug: "idea",
    name: "Turn Your Idea Into a Business",
    title: "Start My Assessment",
    intro:
      "Not sure if your idea is ready? That's okay. You don't need to have everything figured out. That's what Dervo is here for.",
    summary: "20 questions · about 3 minutes",
  },
  scale: {
    slug: "scale",
    name: "Your Business Is Ready for Its Next Level",
    title: "The Next Level",
    intro:
      "Growth isn't just more customers — it's better systems and a clearer sense of what to feed. Eight questions to find where your next level is actually blocked.",
    summary: "8 questions · about 5 minutes",
  },
  fix: {
    slug: "fix",
    name: "I'm Stuck. Help Me Figure Out Why.",
    title: "The Sticking Point",
    intro:
      "Something's off and it's hard to name from the inside. Eight questions to get it out where you can see it, and narrow down what's really in the way.",
    summary: "8 questions · about 5 minutes",
  },
};

/** The two assessments still served by the simple single-scroll form. */
export const FORM_SLUGS = ["scale", "fix"] as const;

export type FormSlug = (typeof FORM_SLUGS)[number];

export type FormAssessment = AssessmentMeta & {
  cta: string;
  questions: Question[];
};

export const FORM_ASSESSMENTS: Record<FormSlug, FormAssessment> = {
  scale: {
    ...ASSESSMENTS.scale,
    cta: "Done — show me the picture",
    questions: SCALE_QUESTIONS,
  },
  fix: {
    ...ASSESSMENTS.fix,
    cta: "Done — help me see it",
    questions: FIX_QUESTIONS,
  },
};

export function isFormSlug(value: string): value is FormSlug {
  return (FORM_SLUGS as readonly string[]).includes(value);
}

export function isAssessmentSlug(value: string): value is AssessmentSlug {
  return (ASSESSMENT_SLUGS as readonly string[]).includes(value);
}

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
export function validate(
  questions: Question[],
  answers: Record<string, string>,
) {
  const errors: Record<string, string> = {};

  for (const question of questions) {
    const answer = answers[question.id] ?? "";

    if (question.required && answer.length === 0) {
      errors[question.id] = "This one's worth answering.";
    } else if (answer.length > question.maxLength) {
      errors[question.id] = `Keep it under ${question.maxLength} characters.`;
    }
  }

  return errors;
}
