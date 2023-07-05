import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_API;

if (!supabaseUrl || !supabaseApiKey) {
  throw new Error("Missing API keys for Supabase");
}
// supabase instance which is using SERVICE_KEY what means this key has the ability to bypass Row Level Security (we don't have to be authenticated)
// Only use this in backend
const supabase = createClient(supabaseUrl, supabaseApiKey);

export default supabase;
