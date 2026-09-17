import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://idhlmozvyouzldwfgptu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_35VcHYi7w3rVYKgY4EvO0w_dXAmB0E_';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
