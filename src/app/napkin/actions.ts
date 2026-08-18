"use server";

import { QUESTIONS, validate, type NapkinState } from "./schema";

export async function submitNapkin(
  _prevState: NapkinState,
  formData: FormData,
): Promise<NapkinState> {
  const answers: Record<string, string> = {};

  for (const question of QUESTIONS) {
    answers[question.id] = String(formData.get(question.id) ?? "").trim();
  }

  const errors = validate(answers);

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, answers };
  }

  // TODO: persist to Supabase (napkins table) once the project is wired up.
  console.log("[napkin] submission", answers);

  return { status: "success", errors: {}, answers };
}
