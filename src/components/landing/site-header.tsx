import Link from "next/link";
import { DervoMark } from "./icons";

const NAV = [
  { label: "Home", href: "/", active: true },
  { label: "How it works", href: "#how-it-works", active: false },
  { label: "Solutions", href: "#solutions", active: false },
];

export function SiteHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 bg-white px-6 py-5 sm:px-12">
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

      <nav className="order-3 flex items-center gap-7 text-[14.5px] font-semibold sm:order-none">
        {NAV.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className={
              item.active
                ? "border-b-2 border-royal pb-[3px] text-navy"
                : "text-ink transition-colors duration-150 hover:text-royal"
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link
        href="#solutions"
        className="rounded-full bg-royal px-6 py-3 text-[14px] font-bold text-frost shadow-dervo-sm transition-colors duration-150 hover:bg-royal-dark"
      >
        Get started
      </Link>
    </header>
  );
}
