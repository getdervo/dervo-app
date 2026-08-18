import type { Metadata } from "next";
import { AssessmentPage } from "../assessment-page";
import { ASSESSMENTS } from "../schema";

const assessment = ASSESSMENTS.idea;

export const metadata: Metadata = {
  title: `${assessment.title} — Dervo`,
  description: assessment.intro,
};

export default function Page() {
  return <AssessmentPage slug="idea" />;
}
