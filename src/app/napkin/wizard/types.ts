/** Field vocabulary shared by every assessment wizard under /napkin. */

export type ShortInput = {
  id: string;
  label?: string;
  placeholder: string;
  maxLength?: number;
};

/** A single-select follow-up attached to another question. */
export type FollowUp = {
  id: string;
  label: string;
  options: string[];
};

export type Field =
  | {
      kind: "text";
      id: string;
      label: string;
      placeholder: string;
      inputType?: "text" | "email";
      /** Pairs with the next `half` text field into a two-up row. */
      half?: boolean;
      optional?: boolean;
      maxLength?: number;
      /** Only rendered while another field holds this value. */
      showWhen?: { field: string; equals: string };
    }
  | {
      kind: "textarea";
      id: string;
      label: string;
      hint?: string;
      placeholder: string;
      optional?: boolean;
      maxLength?: number;
    }
  | {
      kind: "select";
      id: string;
      label: string;
      hint?: string;
      placeholder: string;
      options: string[];
      optional?: boolean;
    }
  /** Several short inputs on one row, optionally with a follow-up question. */
  | {
      kind: "row";
      id: string;
      label: string;
      hint?: string;
      inputs: ShortInput[];
      follow?: FollowUp;
      optional?: boolean;
    }
  | {
      kind: "single";
      id: string;
      label: string;
      hint?: string;
      options: string[];
      optional?: boolean;
    }
  /** One question answered by two or more stacked single-select rows. */
  | {
      kind: "single-rows";
      id: string;
      label: string;
      hint?: string;
      rows: { id: string; label?: string; options: string[] }[];
      optional?: boolean;
    }
  | {
      kind: "multi";
      id: string;
      label: string;
      hint?: string;
      options: string[];
      /** Cap on how many can be chosen. */
      max?: number;
      /** Tapping a chosen chip again marks it the primary answer. */
      primary?: boolean;
      optional?: boolean;
    };

export type Section = {
  /** Shown in the step rail. */
  badge: string;
  title: string;
  blurb?: string;
  fields: Field[];
};

export type Answers = Record<string, string | string[]>;

export type FieldShape =
  | { type: "string"; maxLength: number }
  | { type: "option"; options: string[] }
  | { type: "options"; options: string[]; max?: number };

/** Suffix used to store the "#1 source" pick alongside a primary-aware multi. */
export const PRIMARY_SUFFIX = "_primary";

/**
 * Flattens a section list into the id → shape map the server actions validate
 * against. Nested ids (row inputs, follow-ups, single-rows) are included.
 */
export function buildFieldShapes(sections: Section[]) {
  const shapes: Record<string, FieldShape> = {};

  const str = (id: string, maxLength = 2000) => {
    shapes[id] = { type: "string", maxLength };
  };

  for (const section of sections) {
    for (const field of section.fields) {
      switch (field.kind) {
        case "text":
        case "textarea":
          str(field.id, field.maxLength ?? 2000);
          break;
        case "select":
          shapes[field.id] = { type: "option", options: field.options };
          break;
        case "row":
          for (const input of field.inputs) str(input.id, input.maxLength ?? 200);
          if (field.follow) {
            shapes[field.follow.id] = {
              type: "option",
              options: field.follow.options,
            };
          }
          break;
        case "single":
          shapes[field.id] = { type: "option", options: field.options };
          break;
        case "single-rows":
          for (const row of field.rows) {
            shapes[row.id] = { type: "option", options: row.options };
          }
          break;
        case "multi":
          shapes[field.id] = {
            type: "options",
            options: field.options,
            max: field.max,
          };
          if (field.primary) {
            shapes[field.id + PRIMARY_SUFFIX] = {
              type: "option",
              options: field.options,
            };
          }
          break;
      }
    }
  }

  return shapes;
}

/** Strips anything the shape map doesn't recognise, then normalises what's left. */
export function sanitize(
  shapes: Record<string, FieldShape>,
  answers: Answers,
): Answers {
  const clean: Answers = {};

  for (const [id, value] of Object.entries(answers)) {
    const shape = shapes[id];
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
          let picked = value.filter((v) => shape.options.includes(v));
          if (shape.max) picked = picked.slice(0, shape.max);
          if (picked.length) clean[id] = picked;
        }
        break;
    }
  }

  return clean;
}

export function countQuestions(sections: Section[]) {
  return sections.reduce((total, section) => total + section.fields.length, 0);
}
