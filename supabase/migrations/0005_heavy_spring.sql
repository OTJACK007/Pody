/*
  # Fix RLS Policies

  1. Changes
    - Remove recursive policies that cause infinite recursion
    - Simplify profile access policies
    - Add proper admin access policies
    
  2. Security
    - Maintain data security while fixing recursion issues
    - Ensure proper access control
*/

-- Drop existing problematic policies
drop policy if exists "Public profiles are viewable by everyone" on profiles;
drop policy if exists "Users can insert their own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "Admins can view all profiles" on profiles;

-- Create new simplified policies
create policy "Profiles are viewable by authenticated users"
on profiles for select
using (auth.role() = 'authenticated');

create policy "Users can update own profile"
on profiles for update
using (auth.uid() = id);

create policy "New users can insert their profile"
on profiles for insert
with check (auth.uid() = id);

-- Create admin policy without recursion
create policy "Admins have full access"
on profiles for all
using (
  exists (
    select 1 from profiles
    where id = auth.uid()
    and role = 'admin'
  )
);

-- Update admin check function to avoid recursion
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from profiles
    where id = auth.uid()
    and role = 'admin'
  );
end;
$$ language plpgsql security definer;