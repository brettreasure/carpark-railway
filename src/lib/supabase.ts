import { createClient } from '@supabase/supabase-js';

  // Temporary placeholder - will be replaced with environment 
  variables
  const supabaseUrl = 'PLACEHOLDER_URL';
  const supabaseAnonKey = 'PLACEHOLDER_KEY';

  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
  export const supabaseAdmin = createClient(supabaseUrl,
  'PLACEHOLDER_SERVICE_KEY');
