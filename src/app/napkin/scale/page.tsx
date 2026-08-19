import type { Metadata } from "next";
import { WizardPage } from "../wizard/wizard-page";
import { submitScaleAssessment } from "./actions";
import { SECTIONS } from "./questions";

const INTRO =
  "Growing a business isn't just about getting more customers. It's about building the right systems, improving what's already working, and knowing where to focus next. Tell us about your business, and Dervo will identify your biggest opportunities and create a roadmap for growth.";

export const metadata: Metadata = {
  title: "Your Business Is Ready for Its Next Level — Dervo",
  description: INTRO,
};

export default function ScaleAssessmentPage() {
  return (
    <WizardPage
      kicker="Scale assessment"
      title="Your Business Is Ready for Its Next Level"
      intro={INTRO}
      sections={SECTIONS}
      submitAction={submitScaleAssessment}
      timeEstimate="Takes about 4 minutes"
      confirmation={{
        heading: "Thanks! Your roadmap is on the way.",
        body: "Dervo is analyzing your answers. Your biggest opportunities and a step-by-step roadmap for growth will land in your inbox shortly.",
      }}
    />
  );
}
