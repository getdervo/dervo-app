"use client";

import { useState } from "react";

type Status = { kind: "idle" | "error" | "success"; message?: string };

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = email.trim();

    if (!value) {
      setStatus({ kind: "error", message: "Enter your email to subscribe." });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus({ kind: "error", message: "That doesn't look like an email." });
      return;
    }

    // TODO: wire to the mailing list once a provider is chosen.
    setStatus({ kind: "success", message: "You're on the list." });
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status.kind !== "idle") setStatus({ kind: "idle" });
          }}
          placeholder="Enter your email"
          aria-invalid={status.kind === "error" || undefined}
          aria-describedby={status.message ? "newsletter-status" : undefined}
          className="min-w-0 flex-1 rounded-full border border-frost/25 bg-transparent px-[18px] py-[11px] text-[13px] text-frost outline-none placeholder:text-frost/45 focus-visible:border-lime"
        />
        <button
          type="submit"
          className="rounded-full bg-lime px-[22px] py-[11px] text-[13px] font-bold text-navy transition-colors duration-150 hover:bg-lime-dark"
        >
          Subscribe
        </button>
      </div>

      {status.message && (
        <p
          id="newsletter-status"
          role="status"
          aria-live="polite"
          className={`mt-2 text-[12px] ${
            status.kind === "error" ? "text-[#ff9b9b]" : "text-lime"
          }`}
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
