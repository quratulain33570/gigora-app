import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://noxqswlrtynxohbmkxlh.supabase.co';
const supabaseAnonKey = 'sb_publishable_XbbaeRBa3Iv1SodrpGxAkA_j8SqV7Uv';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);