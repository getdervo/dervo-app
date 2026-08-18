import Link from "next/link";
import { HealthScoreRing } from "./health-score-ring";
import { TargetIcon } from "./icons";
import { Reveal } from "./motion-primitives";

export function Hero() {
  return (
    <section className="grid gap-13 bg-linear-to-b from-white to-frost px-6 pb-15 pt-13 sm:px-12 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="flex flex-col justify-center">
        <Reveal>
          <h1 className="m-0 text-[38px] font-extrabold leading-[1.1] tracking-[-0.02em] text-navy sm:text-[54px]">
            Turn your idea into a{" "}
            <span className="text-royal">working business.</span>
          </h1>
        </Reveal>

        <Reveal className="mt-5" delay={0.12}>
          <p className="max-w-[470px] text-[17px] leading-[1.65] text-ink">
            Dervo helps service business owners start, grow, and fix their
            businesses with a short diagnostic and a step-by-step roadmap. No
            guesswork, just the next right move.
          </p>
        </Reveal>

        <Reveal className="mt-7.5" delay={0.24}>
          <Link
            href="/napkin"
            className="inline-block rounded-full bg-royal px-7 py-[15px] text-[15px] font-bold text-frost shadow-dervo-md transition-[background-color,transform] duration-150 hover:bg-royal-dark hover:-translate-y-0.5"
          >
            Start your assessment
          </Link>
        </Reveal>
      </div>

      <div className="relative">
        <Reveal delay={0.1} y={36}>
          {/* Placeholder — swap for a real founder-at-laptop photo. */}
          <div
            className="flex h-[440px] w-full items-center justify-center rounded-[28px] bg-linear-135 from-[#dce8fb] via-[#eaf3ff] to-[#e8f7ea] text-center text-[13px] font-medium text-muted"
            role="img"
            aria-label="Placeholder for hero photograph of a founder at work"
          >
            Founder at work — hero photo
          </div>
        </Reveal>

        <div className="mt-4 flex flex-col gap-4 md:mt-0 md:block">
          <Reveal
            className="flex flex-col items-center gap-2 rounded-[20px] bg-white px-[22px] py-[18px] shadow-dervo-lg md:absolute md:top-[26px] md:-left-6"
            delay={0.4}
            y={16}
          >
            <div className="text-[11.5px] font-bold text-navy">
              Business health score
            </div>
            <HealthScoreRing />
            <div className="text-center text-[11px] leading-[1.4] text-muted">
              Early foundation.
              <br />
              Let&apos;s build it up.
            </div>
          </Reveal>

          <Reveal
            className="flex items-center gap-3 rounded-2xl bg-white px-[18px] py-[14px] shadow-dervo-lg md:absolute md:bottom-[30px] md:-left-6"
            delay={0.55}
            y={16}
          >
            <div className="flex size-[38px] flex-none items-center justify-center rounded-full bg-navy text-lime">
              <TargetIcon size={18} />
            </div>
            <div>
              <div className="text-[10.5px] text-muted">Next step</div>
              <div className="text-[13px] font-bold text-navy">
                Define your Idea
                <br />
                <span className="font-normal text-ink">
                  and ideal customer
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
