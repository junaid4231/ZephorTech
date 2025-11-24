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

