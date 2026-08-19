"use server";

import { sanitize, type Answers } from "../wizard/types";
import type { SubmitResult } from "../wizard/wizard";
import { FIELD_SHAPES } from "./questions";

/**
 * Answers are assembled client-side, so every key is checked against the known
 * field shapes and anything unrecognised is dropped rather than stored.
 */
export async function submitFixAssessment(
  answers: Answers,
): Promise<SubmitResult> {
  const clean = sanitize(FIELD_SHAPES, answers);

  // TODO: persist to Supabase and diagnose the bottleneck once wired up.
  console.log("[napkin:fix] submission", {
    answered: Object.keys(clean).length,
    answers: clean,
  });

  return { ok: true };
}
