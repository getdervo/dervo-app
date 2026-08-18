"use client";

import { ViewTransition, useActionState, useState } from "react";
import { submitNapkin } from "./actions";
import { QUESTIONS, initialNapkinState } from "./schema";

/**
 * Shared-element names must be unique across everything mounted at once, so the
 * form field and its summary counterpart are the only two users of each name.
 */
const labelName = (id: string) => `napkin-label-${id}`;
const answerName = (id: string) => `napkin-answer-${id}`;

export function NapkinForm() {
  const [state, formAction, pending] = useActionState(
    submitNapkin,
    initialNapkinState,
  );

  if (state.status === "success") {
    return <NapkinSummary answers={state.answers} />;
  }

  const hasErrors = Object.keys(state.errors).length > 0;

  return (
    <form action={formAction} className="flex flex-col gap-12">
      {QUESTIONS.map((question, index) => {
        const error = state.errors[question.id];
        const errorId = `${question.id}-error`;
        const hintId = `${question.id}-hint`;

        return (
          <div key={question.id} className="flex flex-col gap-2">
            <label htmlFor={question.id} className="flex gap-3 text-lg font-medium">
              <span className="pt-0.5 text-sm tabular-nums text-black/30 dark:text-white/30">
                {String(index + 1).padStart(2, "0")}
              </span>
              <ViewTransition
                name={labelName(question.id)}
                share="text-morph"
                exit="fade-out"
                default="none"
              >
                <span>
                  {question.label}
                  {!question.required && (
                    <span className="ml-2 text-sm font-normal text-black/40 dark:text-white/40">
                      optional
                    </span>
                  )}
                </span>
              </ViewTransition>
            </label>

            <p id={hintId} className="pl-8 text-sm text-black/50 dark:text-white/50">
              {question.hint}
            </p>

            <ViewTransition
              name={answerName(question.id)}
              share="text-morph"
              exit="fade-out"
              default="none"
            >
              <textarea
                id={question.id}
                name={question.id}
                rows={question.rows ?? 3}
                maxLength={question.maxLength}
                placeholder={question.placeholder}
                defaultValue={state.answers[question.id] ?? ""}
                aria-describedby={error ? `${hintId} ${errorId}` : hintId}
                aria-invalid={error ? true : undefined}
                className={`ml-8 w-[calc(100%-2rem)] resize-y rounded-lg border bg-transparent p-3 text-base leading-relaxed outline-none transition placeholder:text-black/25 focus:border-black/40 dark:placeholder:text-white/25 dark:focus:border-white/40 ${
                  error
                    ? "border-red-500/60"
                    : "border-black/15 dark:border-white/15"
                }`}
              />
            </ViewTransition>

            {error && (
              <p id={errorId} role="alert" className="ml-8 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </div>
        );
      })}

      <div className="ml-8 flex flex-col gap-3 border-t border-black/10 pt-8 dark:border-white/10">
        {hasErrors && (
          <p aria-live="polite" className="text-sm text-red-600 dark:text-red-400">
            A few questions still need answers.
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="self-start rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-85 disabled:opacity-50"
        >
          {pending ? "Reading it back…" : "Done — read it back to me"}
        </button>
      </div>
    </form>
  );
}

function NapkinSummary({ answers }: { answers: Record<string, string> }) {
  const [copied, setCopied] = useState(false);

  const answered = QUESTIONS.filter((question) => answers[question.id]);

  async function copy() {
    const text = answered
      .map((question) => `${question.label}\n${answers[question.id]}`)
      .join("\n\n");

    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-10">
      <p className="text-lg text-black/60 dark:text-white/60">
        {"Here's your napkin. Read it back tomorrow morning and see if it still holds up."}
      </p>

      <dl className="flex flex-col gap-8">
        {answered.map((question) => (
          <div key={question.id} className="flex flex-col gap-1.5">
            <ViewTransition
              name={labelName(question.id)}
              share="text-morph"
              enter="fade-in"
              default="none"
            >
              <dt className="text-sm font-medium text-black/45 dark:text-white/45">
                {question.label}
              </dt>
            </ViewTransition>

            <ViewTransition
              name={answerName(question.id)}
              share="text-morph"
              enter="fade-in"
              default="none"
            >
              <dd className="whitespace-pre-wrap text-lg leading-relaxed">
                {answers[question.id]}
              </dd>
            </ViewTransition>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap items-center gap-3 border-t border-black/10 pt-8 dark:border-white/10">
        <button
          type="button"
          onClick={copy}
          className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-85"
        >
          {copied ? "Copied" : "Copy to clipboard"}
        </button>
        <a
          href="/napkin"
          className="rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/5"
        >
          Start another
        </a>
      </div>
    </div>
  );
}
