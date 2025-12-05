import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://neynsjohdechnkjlureu.supabase.co';
const supabaseAnonKey = 'sb_publishable_RqFtBgd0dVTNJPp8G3cjDw_G-_YQcwy';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);