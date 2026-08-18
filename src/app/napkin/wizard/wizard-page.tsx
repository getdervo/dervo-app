import Link from "next/link";
import { DervoMark } from "@/components/landing/icons";
import { Wizard, type SubmitResult } from "./wizard";
import type { Answers, Section } from "./types";

/** Page chrome shared by every assessment: header, hero, wizard, footer. */
export function WizardPage({
  kicker,
  title,
  intro,
  sections,
  submitAction,
  timeEstimate,
  confirmation,
}: {
  kicker: string;
  title: string;
  intro: string;
  sections: Section[];
  submitAction: (answers: Answers) => Promise<SubmitResult>;
  timeEstimate: string;
  confirmation: { heading: string; body: string };
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-frost font-brand">
      <header className="flex items-center justify-between gap-4 border-b border-cardline bg-white px-6 py-5 sm:px-12">
        <Link href="/" className="flex items-center gap-3">
          <DervoMark size={38} />
          <span>
            <span className="block text-[21px] font-extrabold leading-none tracking-[-0.01em] text-navy">
              DERVO
            </span>
            <span className="mt-[3px] block text-[10.5px] font-medium tracking-[0.02em] text-muted">
              Build smarter. Start Simpler
            </span>
          </span>
        </Link>
        <Link
          href="/"
          className="rounded-full border-[1.5px] border-outline bg-white px-5 py-2.5 text-[13.5px] font-bold text-azure transition-colors duration-150 hover:border-royal hover:text-navy"
        >
          Back to home
        </Link>
      </header>

      <main className="mx-auto w-full max-w-[800px] flex-1 px-6 pt-11 pb-18">
        <div className="text-center">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-royal">
            {kicker}
          </p>
          <h1 className="mt-3 text-[30px] font-extrabold leading-[1.15] tracking-[-0.02em] text-navy sm:text-[40px]">
            {title}
          </h1>
          <p className="mx-auto mt-3.5 max-w-[560px] text-[15.5px] leading-[1.65] text-ink">
            {intro}
          </p>
        </div>

        <div className="mt-7.5">
          <Wizard
            sections={sections}
            submitAction={submitAction}
            timeEstimate={timeEstimate}
            confirmation={confirmation}
          />
        </div>
      </main>

      <footer className="flex items-center justify-between gap-4 bg-navy px-6 py-5.5 sm:px-12">
        <div className="flex items-center gap-2.5">
          <DervoMark size={24} onDark />
          <span className="text-[14px] font-extrabold tracking-[-0.01em] text-frost">
            DERVO
          </span>
        </div>
        <p className="text-[12px] text-frost/45">
          &copy; 2026 Dervo. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
