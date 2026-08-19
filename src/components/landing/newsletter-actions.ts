"use server";

import { supabaseServer } from "@/lib/supabase";

export type SubscribeResult = { ok: boolean; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Unique violation — the address is already subscribed. */
const DUPLICATE = "23505";

export async function subscribe(email: string): Promise<SubscribeResult> {
  const value = email.trim().toLowerCase();

  if (!value) {
    return { ok: false, message: "Enter your email to subscribe." };
  }

  if (value.length > 200 || !EMAIL.test(value)) {
    return { ok: false, message: "That doesn't look like an email." };
  }

  const { error } = await supabaseServer()
    .from("subscribers")
    .insert({ email: value });

  if (error) {
    // Already subscribed is a success from the reader's point of view, and
    // saying so plainly beats an error they can do nothing about.
    if (error.code === DUPLICATE) {
      return { ok: true, message: "You're already on the list." };
    }

    console.error("[newsletter] insert failed", error);
    return { ok: false, message: "Something went wrong. Please try again." };
  }

  return { ok: true, message: "You're on the list." };
}
