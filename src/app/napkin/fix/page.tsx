import type { Metadata } from "next";
import { WizardPage } from "../wizard/wizard-page";
import { submitFixAssessment } from "./actions";
import { SECTIONS } from "./questions";

const INTRO =
  "Your business isn't where you want it to be, but you're not exactly sure what needs to change. Tell us what's happening, and Dervo will help identify your biggest business bottleneck and recommend your next steps.";

export const metadata: Metadata = {
  title: "I'm Stuck. Help Me Figure Out Why. — Dervo",
  description: INTRO,
};

export default function FixAssessmentPage() {
  return (
    <WizardPage
      kicker="Bottleneck assessment"
      title="I'm Stuck. Help Me Figure Out Why."
      intro={INTRO}
      sections={SECTIONS}
      submitAction={submitFixAssessment}
      timeEstimate="Takes about 3 minutes"
      confirmation={{
        heading: "Thanks! We're working it out.",
        body: "Dervo is analyzing your answers to pinpoint your biggest bottleneck. Your diagnosis and next steps will land in your inbox shortly.",
      }}
    />
  );
}
