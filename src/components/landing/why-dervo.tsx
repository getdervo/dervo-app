import { CheckIcon } from "./icons";

const REASONS = [
  "Practical frameworks, not theory",
  "Insights tailored to your answers",
  "Roadmaps you can actually follow",
  "Save time and avoid costly mistakes",
  "Support at every stage of the journey",
];

export function WhyDervo() {
  return (
    <section className="grid items-center gap-12 bg-white px-6 py-16 sm:px-12 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-royal">
          Why Dervo?
        </p>
        <h2 className="mt-3 text-[29px] font-extrabold leading-[1.3] tracking-[-0.01em] text-navy">
          Built for real business owners building real businesses.
        </h2>
        <ul className="mt-6 flex flex-col gap-[13px]">
          {REASONS.map((reason) => (
            <li key={reason} className="flex items-center gap-[11px]">
              <span className="flex size-[23px] flex-none items-center justify-center rounded-full bg-lime text-navy">
                <CheckIcon size={13} />
              </span>
              <span className="text-[15px] text-list">{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      <figure className="m-0 rounded-3xl border border-cardline bg-white px-9 py-[34px] shadow-dervo-md">
        <div
          aria-hidden="true"
          className="text-[46px] font-extrabold leading-[0.6] text-royal"
        >
          &ldquo;
        </div>
        <blockquote className="mt-3.5 text-[16.5px] leading-[1.7] text-navy">
          Dervo gave me the clarity I needed to take action. The roadmap was
          step-by-step and so practical &mdash; I landed my first five clients
          in a month.
        </blockquote>
        <figcaption className="mt-5.5 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full bg-azure text-[14px] font-bold text-frost">
            TA
          </span>
          <span className="flex-1">
            <span className="block text-[14px] font-bold text-navy">
              Tosin A.
            </span>
            <span className="block text-[12.5px] text-muted">
              Cleaning business owner
            </span>
          </span>
          <span
            className="text-[15px] tracking-[2px] text-lime"
            aria-label="Rated 5 out of 5"
          >
            ★★★★★
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
