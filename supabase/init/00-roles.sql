-- =============================================
-- Supabase Roles Setup (run first)
-- =============================================

-- Create roles if they don't exist
DO $$
BEGIN
  -- Create anon role
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'anon') THEN
    CREATE ROLE anon NOLOGIN NOINHERIT;
  END IF;

  -- Create authenticated role
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'authenticated') THEN
    CREATE ROLE authenticated NOLOGIN NOINHERIT;
  END IF;

  -- Create service_role
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'service_role') THEN
    CREATE ROLE service_role NOLOGIN NOINHERIT BYPASSRLS;
  END IF;

  -- Create authenticator role
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'authenticator') THEN
    CREATE ROLE authenticator NOINHERIT LOGIN PASSWORD 'BibleJourney2026SecurePassword!';
  END IF;

  -- Create supabase_auth_admin role
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'supabase_auth_admin') THEN
    CREATE ROLE supabase_auth_admin NOLOGIN NOINHERIT;
  END IF;

  -- Create supabase_admin role
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'supabase_admin') THEN
    CREATE ROLE supabase_admin NOLOGIN NOINHERIT BYPASSRLS;
  END IF;
END
$$;

-- Grant roles
GRANT anon TO authenticator;
GRANT authenticated TO authenticator;
GRANT service_role TO authenticator;
GRANT supabase_auth_admin TO authenticator;

-- Grant schema usage
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON SCHEMA public TO supabase_admin, supabase_auth_admin;

-- Create auth schema if not exists
CREATE SCHEMA IF NOT EXISTS auth;
GRANT USAGE ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO supabase_admin;

-- Create auth.users table (minimal version for GoTrue)
CREATE TABLE IF NOT EXISTS auth.users (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE,
  encrypted_password VARCHAR(255),
  email_confirmed_at TIMESTAMP WITH TIME ZONE,
  invited_at TIMESTAMP WITH TIME ZONE,
  confirmation_token VARCHAR(255),
  confirmation_sent_at TIMESTAMP WITH TIME ZONE,
  recovery_token VARCHAR(255),
  recovery_sent_at TIMESTAMP WITH TIME ZONE,
  email_change_token_new VARCHAR(255),
  email_change VARCHAR(255),
  email_change_sent_at TIMESTAMP WITH TIME ZONE,
  last_sign_in_at TIMESTAMP WITH TIME ZONE,
  raw_app_meta_data JSONB,
  raw_user_meta_data JSONB,
  is_super_admin BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  phone VARCHAR(15) UNIQUE,
  phone_confirmed_at TIMESTAMP WITH TIME ZONE,
  phone_change VARCHAR(15),
  phone_change_token VARCHAR(255),
  phone_change_sent_at TIMESTAMP WITH TIME ZONE,
  email_change_token_current VARCHAR(255),
  email_change_confirm_status SMALLINT DEFAULT 0,
  banned_until TIMESTAMP WITH TIME ZONE,
  reauthentication_token VARCHAR(255),
  reauthentication_sent_at TIMESTAMP WITH TIME ZONE,
  is_sso_user BOOLEAN DEFAULT false,
  deleted_at TIMESTAMP WITH TIME ZONE,
  role VARCHAR(255),
  aud VARCHAR(255)
);

-- Grant permissions on auth.users
GRANT ALL ON auth.users TO supabase_auth_admin;
GRANT SELECT ON auth.users TO authenticated;

-- Create auth.uid() function
CREATE OR REPLACE FUNCTION auth.uid()
RETURNS UUID
LANGUAGE sql
STABLE
AS $$
  SELECT NULLIF(
    COALESCE(
      current_setting('request.jwt.claim.sub', true),
      current_setting('request.jwt.claims', true)::jsonb ->> 'sub'
    ),
    ''
  )::uuid
$$;

-- Create auth.role() function
CREATE OR REPLACE FUNCTION auth.role()
RETURNS TEXT
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claim.role', true),
    current_setting('request.jwt.claims', true)::jsonb ->> 'role'
  )::text
$$;

-- Create auth.email() function
CREATE OR REPLACE FUNCTION auth.email()
RETURNS TEXT
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claim.email', true),
    current_setting('request.jwt.claims', true)::jsonb ->> 'email'
  )::text
$$;
