-- ============================================
-- Career Applications Table Setup
-- ============================================
-- Run this in Supabase Dashboard → SQL Editor
-- Time: 30 seconds
-- ============================================

-- Create career_applications table
CREATE TABLE IF NOT EXISTS career_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  skills JSONB DEFAULT '[]',
  experience_level TEXT NOT NULL,
  cover_letter TEXT,
  resume_url TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_career_applications_status ON career_applications(status);
CREATE INDEX IF NOT EXISTS idx_career_applications_submitted_at ON career_applications(submitted_at DESC);

-- Enable Row Level Security
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;

-- Allow API to insert applications
DROP POLICY IF EXISTS "Service role can insert" ON career_applications;
CREATE POLICY "Service role can insert"
ON career_applications FOR INSERT
WITH CHECK (true);

-- Allow authenticated users to view (for future admin dashboard)
DROP POLICY IF EXISTS "Authenticated can view" ON career_applications;
CREATE POLICY "Authenticated can view"
ON career_applications FOR SELECT
USING (auth.role() = 'authenticated');

-- ============================================
-- Done! You should see: "Success. No rows returned"
-- ============================================

-- ============================================
-- Contact Submissions Table Setup
-- ============================================

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT NOT NULL,
  budget TEXT NOT NULL,
  custom_budget TEXT,
  timeline TEXT NOT NULL,
  message TEXT,
  source TEXT DEFAULT 'web-contact-form',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'contacted', 'archived')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can insert contact submissions" ON contact_submissions;
CREATE POLICY "Service role can insert contact submissions"
ON contact_submissions FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated can view contact submissions" ON contact_submissions;
CREATE POLICY "Authenticated can view contact submissions"
ON contact_submissions FOR SELECT
USING (auth.role() = 'authenticated');

-- ============================================
-- Contact table ready!
-- ============================================

-- ============================================
-- Newsletter Subscribers Table Setup
-- ============================================

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'unsubscribed')),
  confirmation_token TEXT,
  source TEXT DEFAULT 'web-newsletter-form',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can insert subscribers" ON newsletter_subscribers;
CREATE POLICY "Service role can insert subscribers"
ON newsletter_subscribers FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can update subscribers" ON newsletter_subscribers;
CREATE POLICY "Service role can update subscribers"
ON newsletter_subscribers FOR UPDATE
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated can view subscribers" ON newsletter_subscribers;
CREATE POLICY "Authenticated can view subscribers"
ON newsletter_subscribers FOR SELECT
USING (auth.role() = 'authenticated');

-- ============================================
-- Newsletter table ready!
-- ============================================


-- Migration: Add unsubscribe_token column to newsletter_subscribers table
-- Run this in your Supabase SQL editor if the column doesn't exist

-- Add unsubscribe_token column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'newsletter_subscribers' 
    AND column_name = 'unsubscribe_token'
  ) THEN
    ALTER TABLE newsletter_subscribers 
    ADD COLUMN unsubscribe_token TEXT;
    
    -- Create index for faster lookups
    CREATE INDEX IF NOT EXISTS idx_newsletter_unsubscribe_token 
    ON newsletter_subscribers(unsubscribe_token);
    
    RAISE NOTICE '✅ unsubscribe_token column added successfully';
  ELSE
    RAISE NOTICE 'ℹ️ unsubscribe_token column already exists';
  END IF;
END $$;

-- Verify the column was added
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'newsletter_subscribers'
AND column_name = 'unsubscribe_token';

