import {
  BarChartIcon,
  FlagIcon,
  MapIcon,
  MessageSquareIcon,
} from "./icons";

const STEPS = [
  {
    Icon: MessageSquareIcon,
    title: "1. Tell us about you",
    body: "Answer a few questions about your idea or business.",
    dark: true,
  },
  {
    Icon: BarChartIcon,
    title: "2. We analyze",
    body: "Your answers run through proven operator frameworks.",
    dark: false,
  },
  {
    Icon: MapIcon,
    title: "3. Get your roadmap",
    body: "A personal report with insights and recommended next steps.",
    dark: true,
  },
  {
    Icon: FlagIcon,
    title: "4. Take action",
    body: "Work the plan and build a business you're proud of.",
    dark: false,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-6 grid items-center gap-11 rounded-[28px] bg-frost px-10 py-11 sm:mx-12 lg:grid-cols-[280px_1fr]"
    >
      <div>
        <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-azure">
          How it works
        </p>
        <h2 className="mt-2.5 text-[29px] font-extrabold leading-[1.25] tracking-[-0.01em] text-navy">
          Simple process. Real results.
        </h2>
      </div>

      <div className="relative">
        {/* Dashed connector sits at circle mid-height, inset 9% each side. */}
        <div
          aria-hidden="true"
          className="absolute top-[26px] right-[9%] left-[9%] hidden border-t-2 border-dashed border-connector sm:block"
        />
        <ol className="relative grid grid-cols-2 gap-[18px] sm:grid-cols-4">
          {STEPS.map(({ Icon, title, body, dark }) => (
            <li
              key={title}
              className="flex flex-col items-center gap-2.5 text-center"
            >
              <div
                className={`flex size-13 items-center justify-center rounded-full shadow-dervo-sm ${
                  dark ? "bg-navy text-lime" : "bg-royal text-frost"
                }`}
              >
                <Icon size={21} />
              </div>
              <p className="text-[14px] font-bold text-navy">{title}</p>
              <p className="text-[12.5px] leading-[1.55] text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
