"use client";

import { useState, useTransition } from "react";
import { subscribe } from "./newsletter-actions";

type Status = { kind: "idle" | "error" | "success"; message?: string };

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [pending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const result = await subscribe(email);

      setStatus({
        kind: result.ok ? "success" : "error",
        message: result.message,
      });

      if (result.ok) setEmail("");
    });
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
          disabled={pending}
          className="rounded-full bg-lime px-[22px] py-[11px] text-[13px] font-bold text-navy transition-colors duration-150 hover:bg-lime-dark disabled:opacity-60"
        >
          {pending ? "…" : "Subscribe"}
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
