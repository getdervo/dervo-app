import type { Metadata } from "next";
import Link from "next/link";
import { ASSESSMENTS, ASSESSMENT_SLUGS } from "./schema";

export const metadata: Metadata = {
  title: "Assessments — Dervo",
  description:
    "Three short assessments: start an idea, reach the next level, or work out what's in the way.",
};

export default function NapkinIndexPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16 sm:py-24">
      <Link
        href="/"
        className="text-sm text-black/50 transition hover:text-foreground dark:text-white/50"
      >
        ← Dervo
      </Link>

      <header className="mt-10 mb-12 flex flex-col gap-4">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Where are you starting from?
        </h1>
        <p className="text-lg leading-relaxed text-black/60 dark:text-white/60">
          Pick the one that sounds most like you. Each is eight questions and
          takes about five minutes.
        </p>
      </header>

      <ul className="flex flex-col gap-4">
        {ASSESSMENT_SLUGS.map((slug) => {
          const assessment = ASSESSMENTS[slug];

          return (
            <li key={slug}>
              <Link
                href={`/napkin/${slug}`}
                className="flex flex-col gap-2 rounded-2xl border border-black/10 p-6 transition hover:border-black/25 hover:bg-black/[0.02] dark:border-white/10 dark:hover:border-white/25 dark:hover:bg-white/[0.03]"
              >
                <span className="text-xl font-medium">{assessment.name}</span>
                <span className="text-base leading-relaxed text-black/55 dark:text-white/55">
                  {assessment.intro}
                </span>
                <span className="mt-1 text-sm font-medium text-black/40 dark:text-white/40">
                  {assessment.summary} →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
