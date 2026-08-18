import type { Metadata } from "next";
import { AssessmentPage } from "../assessment-page";
import { FORM_ASSESSMENTS } from "../schema";

const assessment = FORM_ASSESSMENTS.fix;

export const metadata: Metadata = {
  title: `${assessment.title} — Dervo`,
  description: assessment.intro,
};

export default function Page() {
  return <AssessmentPage slug="fix" />;
}
