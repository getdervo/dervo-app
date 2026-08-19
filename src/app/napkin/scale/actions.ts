"use server";

import { sanitize, validateContact, type Answers } from "../wizard/types";
import type { SubmitResult } from "../wizard/wizard";
import { FIELD_SHAPES } from "./questions";

/**
 * Answers are assembled client-side, so every key is checked against the known
 * field shapes and anything unrecognised is dropped rather than stored.
 */
export async function submitScaleAssessment(
  answers: Answers,
): Promise<SubmitResult> {
  const errors = validateContact(answers);

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const clean = sanitize(FIELD_SHAPES, answers);

  // TODO: persist to Supabase and generate the growth roadmap once wired up.
  console.log("[napkin:scale] submission", {
    name: clean.name,
    email: clean.email,
    answered: Object.keys(clean).length,
    answers: clean,
  });

  return { ok: true, email: clean.email as string | undefined };
}
