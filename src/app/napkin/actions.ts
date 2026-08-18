"use server";

import {
  FORM_ASSESSMENTS,
  isFormSlug,
  validate,
  type NapkinState,
} from "./schema";

export async function submitNapkin(
  _prevState: NapkinState,
  formData: FormData,
): Promise<NapkinState> {
  // The slug arrives from the client, so it is never trusted as a lookup key
  // until it has been checked against the known set.
  const slug = String(formData.get("assessment") ?? "");

  if (!isFormSlug(slug)) {
    return {
      status: "error",
      errors: { _form: "Unknown assessment. Try starting again." },
      answers: {},
    };
  }

  const { questions } = FORM_ASSESSMENTS[slug];
  const answers: Record<string, string> = {};

  for (const question of questions) {
    answers[question.id] = String(formData.get(question.id) ?? "").trim();
  }

  const errors = validate(questions, answers);

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, answers };
  }

  // TODO: persist to Supabase (napkins table) once the project is wired up.
  console.log(`[napkin:${slug}] submission`, answers);

  return { status: "success", errors: {}, answers };
}
