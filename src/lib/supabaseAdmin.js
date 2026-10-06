import 'server-only';
import { createClient } from '@supabase/supabase-js';

// Server-side client for admin writes and private data (enquiries).
// Uses the secret service-role key, which must never be exposed to the browser.
// Falls back to the public key only so the site keeps working until the key is added.
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, key, {
  auth: { persistSession: false },
});
