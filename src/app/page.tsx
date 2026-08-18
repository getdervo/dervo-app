import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 p-8 text-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Welcome to Dervo
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-black/60 dark:text-white/60">
          Got a business idea rattling around? Start by getting it out of your
          head.
        </p>
      </div>

      <Link
        href="/napkin"
        className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-85"
      >
        Sketch it on a napkin →
      </Link>
    </main>
  );
}
