"use server";

import { sanitize, type Answers } from "../wizard/types";
import type { SubmitResult } from "../wizard/wizard";
import { FIELD_SHAPES } from "./questions";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Answers are assembled client-side, so every key is checked against the known
 * field shapes and anything unrecognised is dropped rather than stored.
 */
export async function submitIdeaAssessment(
  answers: Answers,
): Promise<SubmitResult> {
  const errors: Record<string, string> = {};

  const name = typeof answers.name === "string" ? answers.name.trim() : "";
  const email = typeof answers.email === "string" ? answers.email.trim() : "";

  if (!name) errors.name = "We need a name for your roadmap.";
  if (!email) errors.email = "We need an email to send your roadmap to.";
  else if (!EMAIL.test(email)) errors.email = "That doesn't look like an email.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const clean = sanitize(FIELD_SHAPES, answers);

  // TODO: persist to Supabase and kick off the roadmap email once wired up.
  console.log("[napkin:idea] submission", {
    name,
    email,
    answered: Object.keys(clean).length,
    answers: clean,
  });

  return { ok: true };
}
