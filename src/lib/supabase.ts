import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zwjpvdqfcnwnhzfvrynd.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6X09i94ZorPmCdmUKN5t0g_-D9BqOXX';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);