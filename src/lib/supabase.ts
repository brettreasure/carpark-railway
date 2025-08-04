import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role key
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type Database = {
  public: {
    Tables: {
      downloaders: {
        Row: {
          id: string;
          name: string;
          email: string;
          email_verified: boolean;
          verification_token: string | null;
          created_at: string;
          verified_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          email_verified?: boolean;
          verification_token?: string | null;
          created_at?: string;
          verified_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          email_verified?: boolean;
          verification_token?: string | null;
          created_at?: string;
          verified_at?: string | null;
        };
      };
      contributions: {
        Row: {
          id: string;
          name: string;
          email: string;
          review_link: string;
          comment: string | null;
          wants_credit: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          review_link: string;
          comment?: string | null;
          wants_credit?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          review_link?: string;
          comment?: string | null;
          wants_credit?: boolean;
          created_at?: string;
        };
      };
    };
  };
};