import type { Metadata } from "next";
import { WizardPage } from "../wizard/wizard-page";
import { submitIdeaAssessment } from "./actions";
import { SECTIONS } from "./questions";

const INTRO =
  "Not sure if your idea is ready? That's okay. You don't need to have everything figured out. That's what Dervo is here for.";

export const metadata: Metadata = {
  title: "Start My Assessment — Dervo",
  description: INTRO,
};

export default function IdeaAssessmentPage() {
  return (
    <WizardPage
      kicker="Idea assessment"
      title="Start My Assessment"
      intro={INTRO}
      sections={SECTIONS}
      submitAction={submitIdeaAssessment}
      timeEstimate="Takes about 3 minutes"
      confirmation={{
        heading: "Thanks! Your roadmap is on the way.",
        body: "Dervo is analyzing your answers. Your business health score and step-by-step roadmap will land in your inbox shortly.",
      }}
    />
  );
}
