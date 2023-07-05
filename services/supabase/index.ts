import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing API keys for Supabase");
}
// supabase instance which is using SERVICE_KEY what means this key has the ability to bypass Row Level Security (we don't have to be authenticated)
// Only use this in backend
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default supabase;
