import type { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Paths } from "@/components/landing/paths";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { WhyDervo } from "@/components/landing/why-dervo";

export const metadata: Metadata = {
  title: "Dervo — Build smarter. Start Simpler",
  description:
    "Dervo helps service business owners start, grow, and fix their businesses with a short diagnostic and a step-by-step roadmap.",
};

export default function Home() {
  return (
    <div className="flex-1 bg-frost font-brand text-navy">
      <div className="mx-auto max-w-[1240px] bg-white">
        <SiteHeader />
        <Hero />
        <Paths />
        <HowItWorks />
        <WhyDervo />
        <SiteFooter />
      </div>
    </div>
  );
}
