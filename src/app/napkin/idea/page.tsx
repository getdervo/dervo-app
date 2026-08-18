import type { Metadata } from "next";
import Link from "next/link";
import { DervoMark } from "@/components/landing/icons";
import { AssessmentForm } from "./assessment-form";

export const metadata: Metadata = {
  title: "Start My Assessment — Dervo",
  description:
    "Not sure if your idea is ready? Answer a few questions and Dervo will send back a business health score and a step-by-step roadmap.",
};

export default function IdeaAssessmentPage() {
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
            Idea assessment
          </p>
          <h1 className="mt-3 text-[32px] font-extrabold leading-[1.15] tracking-[-0.02em] text-navy sm:text-[40px]">
            Start My Assessment
          </h1>
          <p className="mx-auto mt-3.5 max-w-[520px] text-[15.5px] leading-[1.65] text-ink">
            Not sure if your idea is ready? That&apos;s okay. You don&apos;t
            need to have everything figured out. That&apos;s what Dervo is here
            for.
          </p>
        </div>

        <div className="mt-7.5">
          <AssessmentForm />
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
