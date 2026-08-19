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
    title: "Your Business Is Ready for Its Next Level",
    intro:
      "Growing a business isn't just about getting more customers. It's about building the right systems, improving what's already working, and knowing where to focus next.",
    summary: "20 questions · about 4 minutes",
  },
  fix: {
    slug: "fix",
    name: "I'm Stuck. Help Me Figure Out Why.",
    title: "I'm Stuck. Help Me Figure Out Why.",
    intro:
      "Your business isn't where you want it to be, but you're not exactly sure what needs to change. Tell us what's happening and we'll help find the bottleneck.",
    summary: "16 questions · about 3 minutes",
  },
};
