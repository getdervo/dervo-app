"use client";

import { useId, useState, useTransition } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRightIcon } from "@/components/landing/icons";
import { submitIdeaAssessment, type Answers } from "./actions";
import { SECTIONS, type Field } from "./questions";

const INPUT =
  "w-full rounded-full border-[1.5px] border-outline bg-white px-5 py-[13px] text-[14.5px] text-navy outline-none placeholder:text-[#9aa8c0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal";

const TEXTAREA =
  "w-full resize-y rounded-[20px] border-[1.5px] border-outline bg-white px-5 py-3.5 text-[14.5px] leading-[1.6] text-navy outline-none placeholder:text-[#9aa8c0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal";

const CHIP_BASE =
  "rounded-full border-[1.5px] px-[18px] py-2.5 text-[14px] font-semibold transition-colors duration-150";
const CHIP_OFF =
  "border-outline bg-white text-list hover:border-royal hover:text-navy";
const CHIP_ON = "border-royal bg-royal text-frost";

type SetAnswer = (id: string, value: string | string[]) => void;

export function AssessmentForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();
  const reduce = useReducedMotion();

  const section = SECTIONS[step];
  const isLast = step === SECTIONS.length - 1;

  const set: SetAnswer = (id, value) => {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };

      // A conditional answer left behind after its trigger changes would be
      // submitted for a question the user can no longer see.
      for (const s of SECTIONS) {
        for (const f of s.fields) {
          if (
            f.kind === "text" &&
            f.showWhen?.field === id &&
            value !== f.showWhen.equals
          ) {
            delete next[f.id];
          }
        }
      }

      return next;
    });

    setErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
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

    startTransition(async () => {
      const result = await submitIdeaAssessment(answers);

      if (result.ok) {
        setDone(true);
        scrollTop();
        return;
      }

      // Name and email live on this final section, so the errors show in place.
      setErrors(result.errors);
    });
  }

  if (done) {
    return <Confirmation />;
  }

  return (
    <div>
      <StepRail current={step} />

      <p className="mb-6 text-center text-[13.5px] font-bold text-azure">
        {`Section ${section.badge} — ${section.title} · ${step + 1} of ${SECTIONS.length}`}
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
                <span className="text-[13px] text-muted">
                  Takes about 3 minutes
                </span>
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

/** Renders fields in order, pairing consecutive `half` fields into one row. */
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

function OptionalTag() {
  return (
    <span className="ml-2 text-[13px] font-normal text-muted">optional</span>
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
  const groupId = useId();

  if (field.kind === "text") {
    const error = errors[field.id];
    return (
      <div>
        <label
          htmlFor={`${groupId}-${field.id}`}
          className="mb-2 block text-[14px] font-bold text-navy"
        >
          {field.label}
          {field.optional && <OptionalTag />}
        </label>
        <input
          id={`${groupId}-${field.id}`}
          type={field.inputType ?? "text"}
          value={(answers[field.id] as string) ?? ""}
          maxLength={field.maxLength}
          placeholder={field.placeholder}
          onChange={(e) => set(field.id, e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${groupId}-err` : undefined}
          className={`${INPUT} ${error ? "border-alert" : ""}`}
        />
        {error && (
          <p
            id={`${groupId}-err`}
            role="alert"
            className="mt-1.5 text-[13px] text-alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }

  if (field.kind === "textarea") {
    return (
      <div>
        <label
          htmlFor={`${groupId}-${field.id}`}
          className="block text-[14px] font-bold text-navy"
        >
          {field.label}
          {field.optional && <OptionalTag />}
        </label>
        {field.hint && (
          <p className="mt-1 mb-2 text-[13px] text-muted">{field.hint}</p>
        )}
        <textarea
          id={`${groupId}-${field.id}`}
          value={(answers[field.id] as string) ?? ""}
          maxLength={field.maxLength ?? 2000}
          placeholder={field.placeholder}
          onChange={(e) => set(field.id, e.target.value)}
          className={`${TEXTAREA} min-h-[110px] ${field.hint ? "" : "mt-2"}`}
        />
      </div>
    );
  }

  if (field.kind === "single") {
    const value = answers[field.id] as string | undefined;
    return (
      <fieldset>
        <legend className="mb-2.5 text-[14px] font-bold text-navy">
          {field.label}
          {field.optional && <OptionalTag />}
        </legend>
        <div
          role="radiogroup"
          aria-label={field.label}
          className="flex flex-wrap gap-2.5"
        >
          {field.options.map((option) => {
            const on = value === option;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => set(field.id, option)}
                className={`${CHIP_BASE} ${on ? CHIP_ON : CHIP_OFF}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>
    );
  }

  const value = (answers[field.id] as string[] | undefined) ?? [];
  return (
    <fieldset>
      <legend className="text-[14px] font-bold text-navy">{field.label}</legend>
      <p className="mt-1 mb-2.5 text-[13px] text-muted">Select all that apply</p>
      <div className="flex flex-wrap gap-2.5">
        {field.options.map((option) => {
          const on = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={on}
              onClick={() =>
                set(
                  field.id,
                  on ? value.filter((v) => v !== option) : [...value, option],
                )
              }
              className={`${CHIP_BASE} ${on ? CHIP_ON : CHIP_OFF}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function StepRail({ current }: { current: number }) {
  return (
    <ol
      className="mb-2.5 flex items-center justify-center"
      aria-label="Progress"
    >
      {SECTIONS.map((section, i) => {
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

function Confirmation() {
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
        Thanks! Your roadmap is on the way.
      </h2>
      <p className="mx-auto mt-3 max-w-[440px] text-[15px] leading-[1.65] text-ink">
        Dervo is analyzing your answers. Your business health score and
        step-by-step roadmap will land in your inbox shortly.
      </p>
      <Link
        href="/"
        className="mt-6.5 inline-block rounded-full border-[1.5px] border-outline bg-white px-[26px] py-3 text-[14px] font-bold text-azure transition-colors duration-150 hover:border-royal hover:text-navy"
      >
        Back to home
      </Link>
    </section>
  );
}
