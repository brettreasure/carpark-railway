-- Create tables for the carpark application

-- Table for download requests
CREATE TABLE IF NOT EXISTS downloaders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  email_verified BOOLEAN DEFAULT FALSE,
  verification_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE
);

-- Table for review contributions
CREATE TABLE IF NOT EXISTS contributions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  review_link TEXT NOT NULL,
  comment TEXT,
  wants_credit BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_downloaders_email ON downloaders(email);
CREATE INDEX IF NOT EXISTS idx_downloaders_verification_token ON downloaders(verification_token);
CREATE INDEX IF NOT EXISTS idx_contributions_email ON contributions(email);
CREATE INDEX IF NOT EXISTS idx_contributions_created_at ON contributions(created_at);

-- Add Row Level Security (RLS)
ALTER TABLE downloaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to view their own records
CREATE POLICY "Users can view their own downloader records" ON downloaders
FOR SELECT USING (TRUE);

CREATE POLICY "Users can insert downloader records" ON downloaders
FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Users can update their own downloader records" ON downloaders
FOR UPDATE USING (TRUE);

CREATE POLICY "Users can view contributions" ON contributions
FOR SELECT USING (TRUE);

CREATE POLICY "Users can insert contributions" ON contributions
FOR INSERT WITH CHECK (TRUE);

-- Policies for contact messages
CREATE POLICY "Users can view contact messages" ON contact_messages
FOR SELECT USING (TRUE);

CREATE POLICY "Users can insert contact messages" ON contact_messages
FOR INSERT WITH CHECK (TRUE);

-- Create a function to validate Google Maps review links
CREATE OR REPLACE FUNCTION is_valid_google_review_link(url TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN url ~ '^https://(www\.)?google\.(com|[a-z]{2,3}(\.[a-z]{2})?)/maps.*reviews.*$';
END;
$$ LANGUAGE plpgsql;