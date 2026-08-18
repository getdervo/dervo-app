import Link from "next/link";
import { DervoMark } from "./icons";
import { NewsletterForm } from "./newsletter-form";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Solutions", href: "#solutions" },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy px-6 pt-12 pb-7 sm:px-12">
      <div className="grid gap-9 lg:grid-cols-[1.3fr_1fr_1.4fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <DervoMark size={32} onDark />
            <span className="text-[19px] font-extrabold tracking-[-0.01em] text-frost">
              DERVO
            </span>
          </div>
          <p className="mt-2.5 text-[12.5px] text-frost/55">
            Build smarter. Start Simpler
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-[13px] font-bold text-frost">Quick links</h2>
          <ul className="flex flex-col gap-[9px] text-[13px] text-frost/65">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors duration-150 hover:text-frost"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-2 text-[13px] font-bold text-frost">
            Stay connected
          </h2>
          <p className="mb-3 text-[12.5px] text-frost/65">
            Practical tips and strategies, straight to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <p className="mt-9 border-t border-frost/12 pt-5 text-[12px] text-frost/45">
        &copy; 2026 Dervo. All rights reserved.
      </p>
    </footer>
  );
}
