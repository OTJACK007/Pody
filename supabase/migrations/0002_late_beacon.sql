-- Create role type if it doesn't exist
do $$ begin
  create type user_role as enum ('user', 'admin');
exception
  when duplicate_object then null;
end $$;

-- Add role column to profiles table
alter table public.profiles 
add column if not exists role user_role not null default 'user';

-- Update handle_new_user function to include role
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    fullname,
    email,
    role
  )
  values (
    new.id,
    new.raw_user_meta_data->>'fullname',
    new.email,
    'user'  -- Set default role to 'user'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create admin check function
create or replace function public.is_admin(user_id uuid)
returns boolean as $$
declare
  user_role user_role;
begin
  select p.role into user_role
  from public.profiles p
  where p.id = user_id;
  
  return user_role = 'admin'::user_role;
end;
$$ language plpgsql security definer;

-- Add RLS policy for admin access
create policy "Admins can view all profiles"
  on public.profiles
  for select
  using (
    is_admin(auth.uid())
  );