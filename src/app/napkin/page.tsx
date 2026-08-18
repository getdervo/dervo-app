import type { Metadata } from "next";
import Link from "next/link";
import { NapkinForm } from "./napkin-form";

export const metadata: Metadata = {
  title: "The Napkin — Dervo",
  description:
    "Every business starts as a scribble. Eight questions to get yours out of your head.",
};

export default function NapkinPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16 sm:py-24">
      <Link
        href="/"
        className="text-sm text-black/50 transition hover:text-foreground dark:text-white/50"
      >
        ← Dervo
      </Link>

      <header className="mt-10 mb-16 flex flex-col gap-4">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          The Napkin
        </h1>
        <p className="text-lg leading-relaxed text-black/60 dark:text-white/60">
          Every business starts as a scribble on the back of something. Eight
          questions to get yours out of your head and onto paper — where you can
          actually look at it.
        </p>
        <p className="text-sm text-black/40 dark:text-white/40">
          8 questions · about 5 minutes · nothing is shared
        </p>
      </header>

      <NapkinForm />
    </main>
  );
}
