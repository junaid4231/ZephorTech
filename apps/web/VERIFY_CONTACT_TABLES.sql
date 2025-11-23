-- ============================================
-- Verification Script for Contact Form Tables
-- ============================================
-- Run this in Supabase Dashboard → SQL Editor
-- This will check if tables exist and show their structure
-- ============================================

-- Check if contact_submissions table exists
SELECT 
  CASE 
    WHEN EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'contact_submissions'
    ) 
    THEN '✅ contact_submissions table EXISTS'
    ELSE '❌ contact_submissions table DOES NOT EXIST'
  END AS table_status;

-- Show contact_submissions table structure if it exists
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'contact_submissions'
ORDER BY ordinal_position;

-- Check RLS policies for contact_submissions
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'contact_submissions';

-- Check if newsletter_subscribers table exists
SELECT 
  CASE 
    WHEN EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'newsletter_subscribers'
    ) 
    THEN '✅ newsletter_subscribers table EXISTS'
    ELSE '❌ newsletter_subscribers table DOES NOT EXIST'
  END AS table_status;

-- Show newsletter_subscribers table structure if it exists
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'newsletter_subscribers'
ORDER BY ordinal_position;

-- Check if career_applications table exists
SELECT 
  CASE 
    WHEN EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'career_applications'
    ) 
    THEN '✅ career_applications table EXISTS'
    ELSE '❌ career_applications table DOES NOT EXIST'
  END AS table_status;

-- ============================================
-- If tables don't exist, run CREATE_TABLE.sql
-- ============================================

