import { createClient } from '@supabase/supabase-js';

  // Temporary hardcoded values for Railway testing
  const supabaseUrl = 'https://btsozmbpopngjznmbbuc.supabase.co';
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc
  3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c296bWJwb3BuZ2p6bm1iYnVjIiwicm9sZSI6
  ImFub24iLCJpYXQiOjE3NTQxOTQ1MzYsImV4cCI6MjA2OTc3MDUzNn0.cXtxzH4WVx-
  HoflcNI8Gslp1k4vIgcb9bXLB1cYgDlg';
  const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey
  Jpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c296bWJwb3BuZ2p6bm1iYnVjIiwicm9sZ
  SI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDE5NDUzNiwiZXhwIjoyMDY5NzcwNTM2
  fQ.SdtHg0vD2fDPMXj9one-qhWs-Y1GJ_fNlt-JRnnEInM';

  export const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Server-side client with service role key
  export const supabaseAdmin = createClient(supabaseUrl,
  supabaseServiceKey);

  // ... rest of the Database type definitions 
