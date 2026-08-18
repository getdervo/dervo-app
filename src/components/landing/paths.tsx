import Link from "next/link";
import { Reveal, StaggerGroup, StaggerItem } from "./motion-primitives";
import {
  ArrowRightIcon,
  LightbulbIcon,
  TrendingUpIcon,
  WrenchIcon,
} from "./icons";

/**
 * Only the "idea" flow exists today (/napkin). The other two carry a `path`
 * param so the choice is recorded and can branch when those flows are built.
 */
const PATHS = [
  {
    Icon: LightbulbIcon,
    title: "Turn Your Idea Into a Business",
    body: "You have the idea. Now let's figure out how to turn it into something real. Tell Dervo about your idea, your goals, and what you have to work with. We'll help you identify what you need, what to focus on first, and create a clear roadmap to get started.",
    cta: "Start assessment",
    href: "/napkin",
  },
  {
    Icon: TrendingUpIcon,
    title: "Your Business Is Ready for Its Next Level",
    body: "Growing a business isn't just about getting more customers. It's about building the right systems, improving what's already working, and knowing where to focus next. Tell us about your business, and Dervo will identify your biggest opportunities and create a roadmap for growth.",
    cta: "Scale assessment",
    href: "/napkin?path=scale",
  },
  {
    Icon: WrenchIcon,
    title: "I'm Stuck. Help Me Figure Out Why.",
    body: "Your business isn't where you want it to be, but you're not exactly sure what needs to change. Tell us what's happening, and Dervo will help identify your biggest business bottleneck and recommend your next steps.",
    cta: "Fix my business",
    href: "/napkin?path=fix",
  },
];

export function Paths() {
  return (
    <section id="solutions" className="bg-white px-6 py-16 text-center sm:px-12">
      <Reveal>
        <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-royal">
          What brings you here today?
        </p>
        <h2 className="mt-3 text-[27px] font-extrabold tracking-[-0.01em] text-navy sm:text-[33px]">
          We&apos;ll point you to the right next step.
        </h2>
      </Reveal>

      <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3" delayChildren={0.05}>
        {PATHS.map(({ Icon, title, body, cta, href }) => (
          <StaggerItem
            as="article"
            key={title}
            className="flex flex-col items-center gap-3 rounded-3xl border border-cardline bg-white px-[26px] py-[30px] shadow-dervo-sm transition-shadow duration-150 hover:shadow-dervo-md"
          >
            <div className="flex size-16 items-center justify-center rounded-full bg-royal/8 text-royal">
              <Icon size={26} />
            </div>
            <h3 className="text-[18.5px] font-extrabold leading-[1.3] text-navy">
              {title}
            </h3>
            <p className="text-[13.5px] leading-[1.65] text-muted">{body}</p>
            <Link
              href={href}
              className="mt-auto flex items-center gap-[7px] rounded-full border-[1.5px] border-outline px-[18px] py-[9px] text-[13px] font-bold text-azure transition-colors duration-150 hover:bg-royal/6"
            >
              {cta}
              <ArrowRightIcon size={14} />
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
