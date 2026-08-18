import Link from "next/link";
import { NapkinForm } from "./napkin-form";
import { FORM_ASSESSMENTS, type FormSlug } from "./schema";

/** Shared shell for the three assessment routes under /napkin. */
export function AssessmentPage({ slug }: { slug: FormSlug }) {
  const assessment = FORM_ASSESSMENTS[slug];

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16 sm:py-24">
      <Link
        href="/napkin"
        className="text-sm text-black/50 transition hover:text-foreground dark:text-white/50"
      >
        ← All assessments
      </Link>

      <header className="mt-10 mb-16 flex flex-col gap-4">
        <p className="text-sm font-medium text-black/40 dark:text-white/40">
          {assessment.name}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {assessment.title}
        </h1>
        <p className="text-lg leading-relaxed text-black/60 dark:text-white/60">
          {assessment.intro}
        </p>
        <p className="text-sm text-black/40 dark:text-white/40">
          {assessment.questions.length} questions · about 5 minutes · nothing is
          shared
        </p>
      </header>

      <NapkinForm assessment={assessment} />
    </main>
  );
}
