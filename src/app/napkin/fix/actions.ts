"use server";

import { supabaseServer } from "@/lib/supabase";
import { sanitize, validateContact, type Answers } from "../wizard/types";
import type { SubmitResult } from "../wizard/wizard";
import { FIELD_SHAPES } from "./questions";

/**
 * Answers are assembled client-side, so every key is checked against the known
 * field shapes and anything unrecognised is dropped rather than stored.
 */
export async function submitFixAssessment(
  answers: Answers,
): Promise<SubmitResult> {
  const errors = validateContact(answers);

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const clean = sanitize(FIELD_SHAPES, answers);

  const { error } = await supabaseServer()
    .from("assessments")
    .insert({
      assessment: "fix",
      name: clean.name as string,
      email: clean.email as string,
      answers: clean,
    });

  if (error) {
    console.error("[napkin:fix] insert failed", error);
    return {
      ok: false,
      errors: { _form: "Something went wrong saving that. Please try again." },
    };
  }

  return { ok: true, email: clean.email as string | undefined };
}
