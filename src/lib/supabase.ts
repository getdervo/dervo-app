import "server-only";

import { createClient, type SupabaseClientOptions } from "@supabase/supabase-js";
import ws from "ws";

type RealtimeOptions = SupabaseClientOptions<"public">["realtime"];

/**
 * supabase-js builds a realtime client during construction, and Node < 22 has
 * no native WebSocket — without a transport, createClient throws before a
 * single query runs. Nothing here uses realtime; this only keeps the
 * constructor happy. `ws` meets the runtime contract but not the library's
 * structural type, hence the cast.
 */
const realtime: RealtimeOptions = globalThis.WebSocket
  ? undefined
  : ({ transport: ws } as unknown as RealtimeOptions);

/**
 * Server-only Supabase client.
 *
 * Uses the publishable key rather than a secret one: every write goes through a
 * table whose only privilege for `anon` is INSERT, with RLS allowing insert and
 * nothing else. The worst a leaked key buys is junk rows — never a read of
 * anyone's submission.
 */
export function supabaseServer() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured: set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    realtime,
  });
}
