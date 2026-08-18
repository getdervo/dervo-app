"use server";

import { FIELD_SHAPES } from "./questions";

export type Answers = Record<string, string | string[]>;

export type SubmitResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Answers arrive as a client-built object, so every key is checked against the
 * known field shapes and anything unrecognised is dropped rather than stored.
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

  const clean: Answers = {};

  for (const [id, value] of Object.entries(answers)) {
    const shape = FIELD_SHAPES[id];
    if (!shape) continue;

    switch (shape.type) {
      case "string":
        if (typeof value === "string" && value.trim()) {
          clean[id] = value.trim().slice(0, shape.maxLength);
        }
        break;
      case "option":
        if (typeof value === "string" && shape.options.includes(value)) {
          clean[id] = value;
        }
        break;
      case "options":
        if (Array.isArray(value)) {
          const picked = value.filter((v) => shape.options.includes(v));
          if (picked.length) clean[id] = picked;
        }
        break;
    }
  }

  // TODO: persist to Supabase and kick off the roadmap email once wired up.
  console.log("[napkin:idea] submission", {
    name,
    email,
    answered: Object.keys(clean).length,
    answers: clean,
  });

  return { ok: true };
}
