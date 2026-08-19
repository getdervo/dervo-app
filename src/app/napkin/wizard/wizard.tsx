"use client";

import { useId, useState, useTransition } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRightIcon } from "@/components/landing/icons";
import {
  PRIMARY_SUFFIX,
  validateContact,
  type Answers,
  type Field,
  type Section,
} from "./types";

const INPUT =
  "w-full rounded-full border-[1.5px] border-outline bg-white px-5 py-[13px] text-[14.5px] text-navy outline-none placeholder:text-[#9aa8c0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal";

const TEXTAREA =
  "w-full resize-y rounded-[20px] border-[1.5px] border-outline bg-white px-5 py-3.5 text-[14.5px] leading-[1.6] text-navy outline-none placeholder:text-[#9aa8c0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal";

const CHIP =
  "rounded-full border-[1.5px] px-[18px] py-2.5 text-[14px] font-semibold transition-colors duration-150";
const CHIP_OFF =
  "border-outline bg-white text-list hover:border-royal hover:text-navy";
const CHIP_ON = "border-royal bg-royal text-frost";
const CHIP_PRIMARY = "border-navy bg-navy text-lime";

const LABEL = "text-[14px] font-bold text-navy";
const HINT = "mt-1 text-[13px] text-muted";

export type SubmitResult =
  | { ok: true; email?: string }
  | { ok: false; errors: Record<string, string> };

type SetAnswer = (id: string, value: string | string[]) => void;

export function Wizard({
  sections,
  submitAction,
  timeEstimate,
  confirmation,
}: {
  sections: Section[];
  submitAction: (answers: Answers) => Promise<SubmitResult>;
  timeEstimate: string;
  confirmation: { heading: string; body: string };
}) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<{ email?: string } | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();
  const reduce = useReducedMotion();

  const section = sections[step];
  const isLast = step === sections.length - 1;

  const set: SetAnswer = (id, value) => {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };

      // Answers left behind after their question disappears or their chosen
      // option is withdrawn would be submitted for something no longer shown.
      for (const s of sections) {
        for (const f of s.fields) {
          if (
            f.kind === "text" &&
            f.showWhen?.field === id &&
            value !== f.showWhen.equals
          ) {
            delete next[f.id];
          }

          if (
            f.kind === "single-from" &&
            f.source === id &&
            Array.isArray(value) &&
            typeof next[f.id] === "string" &&
            !value.includes(next[f.id] as string)
          ) {
            delete next[f.id];
          }
        }
      }

      return next;
    });

    setErrors((prev) => {
      if (!prev[id]) return prev;
      const rest = { ...prev };
      delete rest[id];
      return rest;
    });
  };

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
    scrollTop();
  }

  function goNext() {
    if (!isLast) {
      setStep((s) => s + 1);
      scrollTop();
      return;
    }

    // Caught here so an empty field flags instantly; the action re-checks
    // independently, since anything client-side can be bypassed.
    const contactErrors = validateContact(answers);

    if (Object.keys(contactErrors).length > 0) {
      setErrors(contactErrors);
      return;
    }

    startTransition(async () => {
      const result = await submitAction(answers);

      if (result.ok) {
        setDone({ email: result.email });
        scrollTop();
        return;
      }

      setErrors(result.errors);
    });
  }

  if (done) {
    return <Confirmation {...confirmation} email={done.email} />;
  }

  return (
    <div>
      <StepRail sections={sections} current={step} />

      <p className="mb-6 text-center text-[13.5px] font-bold text-azure">
        {`Section ${section.badge} — ${section.title} · ${step + 1} of ${sections.length}`}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={section.badge}
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -12 }}
          transition={{ duration: reduce ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <section className="rounded-3xl border border-cardline bg-white px-6 py-9 shadow-dervo-md sm:px-10">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-azure">
              Section {section.badge}
            </p>
            <h2 className="mt-2 text-[24px] font-extrabold tracking-[-0.01em] text-navy">
              {section.title}
            </h2>
            {section.blurb && (
              <p className="mt-2 text-[13.5px] text-muted">{section.blurb}</p>
            )}

            <div className="mt-6 flex flex-col gap-6">
              <Fields
                fields={section.fields}
                answers={answers}
                errors={errors}
                set={set}
              />
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              {step === 0 ? (
                <span className="text-[13px] text-muted">{timeEstimate}</span>
              ) : (
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-full border-[1.5px] border-outline bg-white px-6 py-3 text-[14px] font-bold text-azure transition-colors duration-150 hover:border-royal hover:text-navy"
                >
                  Back
                </button>
              )}

              <button
                type="button"
                onClick={goNext}
                disabled={pending}
                className="flex items-center gap-[9px] rounded-full bg-royal px-7 py-3.5 text-[15px] font-bold text-frost shadow-dervo-md transition-colors duration-150 hover:bg-royal-dark disabled:opacity-60"
              >
                {pending ? "Sending…" : isLast ? "Finish" : "Continue"}
                <ArrowRightIcon size={15} />
              </button>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Fields({
  fields,
  answers,
  errors,
  set,
}: {
  fields: Field[];
  answers: Answers;
  errors: Record<string, string>;
  set: SetAnswer;
}) {
  const out: React.ReactNode[] = [];

  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i];
    const next = fields[i + 1];

    if (
      field.kind === "text" &&
      field.showWhen &&
      answers[field.showWhen.field] !== field.showWhen.equals
    ) {
      continue;
    }

    if (
      field.kind === "text" &&
      field.half &&
      next?.kind === "text" &&
      next.half
    ) {
      out.push(
        <div key={field.id} className="grid gap-4.5 sm:grid-cols-2">
          <FieldView field={field} answers={answers} errors={errors} set={set} />
          <FieldView field={next} answers={answers} errors={errors} set={set} />
        </div>,
      );
      i += 1;
      continue;
    }

    out.push(
      <FieldView
        key={field.id}
        field={field}
        answers={answers}
        errors={errors}
        set={set}
      />,
    );
  }

  return <>{out}</>;
}

function Required() {
  return (
    <span className="ml-1 text-alert" aria-hidden="true">
      *
    </span>
  );
}

function FieldView({
  field,
  answers,
  errors,
  set,
}: {
  field: Field;
  answers: Answers;
  errors: Record<string, string>;
  set: SetAnswer;
}) {
  const uid = useId();

  switch (field.kind) {
    case "text": {
      const error = errors[field.id];
      return (
        <div>
          <label htmlFor={`${uid}-${field.id}`} className={`mb-2 block ${LABEL}`}>
            {field.label}
            {field.required && <Required />}
          </label>
          <input
            id={`${uid}-${field.id}`}
            type={field.inputType ?? "text"}
            value={(answers[field.id] as string) ?? ""}
            maxLength={field.maxLength}
            placeholder={field.placeholder}
            required={field.required}
            aria-required={field.required || undefined}
            onChange={(e) => set(field.id, e.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${uid}-err` : undefined}
            className={`${INPUT} ${error ? "border-alert" : ""}`}
          />
          {error && (
            <p id={`${uid}-err`} role="alert" className="mt-1.5 text-[13px] text-alert">
              {error}
            </p>
          )}
        </div>
      );
    }

    case "textarea":
      return (
        <div>
          <label htmlFor={`${uid}-${field.id}`} className={`block ${LABEL}`}>
            {field.label}
          </label>
          {field.hint && <p className={`${HINT} mb-2`}>{field.hint}</p>}
          <textarea
            id={`${uid}-${field.id}`}
            value={(answers[field.id] as string) ?? ""}
            maxLength={field.maxLength ?? 2000}
            placeholder={field.placeholder}
            onChange={(e) => set(field.id, e.target.value)}
            className={`${TEXTAREA} mt-2 min-h-[130px]`}
          />
        </div>
      );

    case "select":
      return (
        <div>
          <label htmlFor={`${uid}-${field.id}`} className={`mb-2 block ${LABEL}`}>
            {field.label}
          </label>
          {field.hint && <p className={`${HINT} mb-2`}>{field.hint}</p>}
          <select
            id={`${uid}-${field.id}`}
            value={(answers[field.id] as string) ?? ""}
            onChange={(e) => set(field.id, e.target.value)}
            className={`${INPUT} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5 6 6.5l5-5" stroke="%235b6b85" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>')] bg-[length:12px_8px] bg-[right_1.25rem_center] bg-no-repeat pr-11`}
          >
            <option value="">{field.placeholder}</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );

    case "row":
      return (
        <div>
          <p className={LABEL}>
            {field.label}
          </p>
          {field.hint && <p className={HINT}>{field.hint}</p>}
          <div
            className="mt-2 grid gap-3"
            style={{
              gridTemplateColumns: `repeat(${field.inputs.length}, minmax(0, 1fr))`,
            }}
          >
            {field.inputs.map((input) => (
              <div key={input.id}>
                {input.label && (
                  <label
                    htmlFor={`${uid}-${input.id}`}
                    className="mb-1.5 block text-[12.5px] font-semibold text-muted"
                  >
                    {input.label}
                  </label>
                )}
                <input
                  id={`${uid}-${input.id}`}
                  type="text"
                  value={(answers[input.id] as string) ?? ""}
                  maxLength={input.maxLength ?? 200}
                  placeholder={input.placeholder}
                  onChange={(e) => set(input.id, e.target.value)}
                  className={INPUT}
                />
              </div>
            ))}
          </div>
          {field.follow && (
            <div className="mt-4">
              <p className="mb-2.5 text-[13.5px] font-semibold text-list">
                {field.follow.label}
              </p>
              <ChipRow
                options={field.follow.options}
                value={answers[field.follow.id] as string | undefined}
                label={field.follow.label}
                onPick={(option) => set(field.follow!.id, option)}
              />
            </div>
          )}
        </div>
      );

    case "single":
      return (
        <fieldset>
          <legend className={LABEL}>
            {field.label}
          </legend>
          {field.hint && <p className={HINT}>{field.hint}</p>}
          <div className="mt-2.5">
            <ChipRow
              options={field.options}
              value={answers[field.id] as string | undefined}
              label={field.label}
              onPick={(option) => set(field.id, option)}
            />
          </div>
        </fieldset>
      );

    case "single-from": {
      const picked = (answers[field.source] as string[] | undefined) ?? [];
      const value = answers[field.id] as string | undefined;

      return (
        <fieldset>
          <legend className={LABEL}>
            {field.label}
          </legend>
          {field.hint && <p className={HINT}>{field.hint}</p>}
          {picked.length === 0 ? (
            <p className="mt-2 text-[13.5px] text-muted">
              Pick some above and they&apos;ll show up here.
            </p>
          ) : (
            <div className="mt-2.5">
              <ChipRow
                options={picked}
                value={value}
                label={field.label}
                onPick={(option) => set(field.id, option)}
              />
            </div>
          )}
        </fieldset>
      );
    }

    case "single-rows":
      return (
        <fieldset>
          <legend className={LABEL}>
            {field.label}
          </legend>
          {field.hint && <p className={HINT}>{field.hint}</p>}
          <div className="mt-2.5 flex flex-col gap-3">
            {field.rows.map((row) => (
              <div key={row.id}>
                {row.label && (
                  <p className="mb-1.5 text-[12.5px] font-semibold text-muted">
                    {row.label}
                  </p>
                )}
                <ChipRow
                  options={row.options}
                  value={answers[row.id] as string | undefined}
                  label={row.label ?? field.label}
                  onPick={(option) => set(row.id, option)}
                />
              </div>
            ))}
          </div>
        </fieldset>
      );

    case "multi": {
      const value = (answers[field.id] as string[] | undefined) ?? [];
      const primary = answers[field.id + PRIMARY_SUFFIX] as string | undefined;
      const full = field.max !== undefined && value.length >= field.max;

      const press = (option: string) => {
        const chosen = value.includes(option);

        // With `primary`, chips cycle: unpicked → picked → marked #1 → unpicked.
        if (field.primary && chosen && primary !== option) {
          set(field.id + PRIMARY_SUFFIX, option);
          return;
        }

        if (chosen) {
          set(field.id, value.filter((v) => v !== option));
          if (primary === option) set(field.id + PRIMARY_SUFFIX, "");
          return;
        }

        if (full) return;
        set(field.id, [...value, option]);
      };

      return (
        <fieldset>
          <legend className={LABEL}>
            {field.label}
          </legend>
          <p className={`${HINT} mb-2.5`}>
            {field.hint ??
              (field.max
                ? `Select up to ${field.max}`
                : "Select all that apply")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {field.options.map((option) => {
              const on = value.includes(option);
              const isPrimary = field.primary && primary === option;
              const disabled = !on && full;

              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={on}
                  disabled={disabled}
                  onClick={() => press(option)}
                  className={`${CHIP} ${
                    isPrimary ? CHIP_PRIMARY : on ? CHIP_ON : CHIP_OFF
                  } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  {option}
                  {isPrimary && (
                    <span className="ml-2 text-[12px] font-extrabold">#1</span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      );
    }
  }
}

function ChipRow({
  options,
  value,
  label,
  onPick,
}: {
  options: string[];
  value: string | undefined;
  label: string;
  onPick: (option: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const on = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onPick(option)}
            className={`${CHIP} ${on ? CHIP_ON : CHIP_OFF}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function StepRail({
  sections,
  current,
}: {
  sections: Section[];
  current: number;
}) {
  return (
    <ol className="mb-2.5 flex items-center justify-center" aria-label="Progress">
      {sections.map((section, i) => {
        const state =
          i < current ? "done" : i === current ? "current" : "upcoming";

        return (
          <li key={section.badge} className="flex items-center">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="w-[22px] border-t-2 border-dashed border-connector"
              />
            )}
            <span
              aria-current={state === "current" ? "step" : undefined}
              className={`flex size-[34px] items-center justify-center rounded-full border-[1.5px] text-[13.5px] font-extrabold ${
                state === "done"
                  ? "border-transparent bg-lime text-navy"
                  : state === "current"
                    ? "border-transparent bg-royal text-frost"
                    : "border-outline bg-white text-[#9aa8c0]"
              }`}
            >
              <span className="sr-only">
                {state === "done" ? "Completed: " : ""}
                {section.title}
              </span>
              <span aria-hidden="true">{section.badge}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function Confirmation({
  heading,
  body,
  email,
}: {
  heading: string;
  body: string;
  email?: string;
}) {
  return (
    <section className="rounded-3xl border border-cardline bg-white px-6 py-12 text-center shadow-dervo-md sm:px-10">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-lime">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#01092d"
          strokeWidth={3.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h2 className="mt-5 text-[28px] font-extrabold tracking-[-0.01em] text-navy">
        {heading}
      </h2>
      <p className="mx-auto mt-3 max-w-[440px] text-[15px] leading-[1.65] text-ink">
        {body}
      </p>

      <div className="mx-auto mt-6 max-w-[440px] rounded-2xl bg-frost px-5 py-4">
        <p className="text-[14px] leading-[1.6] text-navy">
          We&apos;ll follow up by email
          {email ? (
            <>
              {" at "}
              <span className="font-bold break-all">{email}</span>
            </>
          ) : null}
          .
        </p>
        <p className="mt-1 text-[13px] leading-[1.55] text-muted">
          Nothing else to do for now — keep an eye on your inbox, and your spam
          folder just in case.
        </p>
      </div>

      <Link
        href="/"
        className="mt-6.5 inline-block rounded-full border-[1.5px] border-outline bg-white px-[26px] py-3 text-[14px] font-bold text-azure transition-colors duration-150 hover:border-royal hover:text-navy"
      >
        Back to home
      </Link>
    </section>
  );
}
