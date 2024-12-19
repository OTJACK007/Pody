-- Helper function for admin check
create or replace function public.get_user_role()
returns text as $$
  select role::text from public.profiles where id = auth.uid();
$$ language sql security definer;

-- Create user_settings table if it doesn't exist
create table if not exists public.user_settings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  theme text default 'dark',
  color_scheme text default '#ff3366',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id)
);

-- Create social_accounts table if it doesn't exist
create table if not exists public.social_accounts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  platform text not null,
  username text not null,
  profile_url text,
  followers text,
  is_connected boolean default true,
  last_sync timestamptz default now(),
  access_token text,
  refresh_token text,
  token_expiry timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS on new tables
alter table public.user_settings enable row level security;
alter table public.social_accounts enable row level security;

-- User settings policies
create policy "Settings are viewable by owner"
  on public.user_settings
  for select
  using (auth.uid() = user_id);

create policy "Users can update own settings"
  on public.user_settings
  for update
  using (auth.uid() = user_id);

-- Social accounts policies
create policy "Social accounts are viewable by owner"
  on public.social_accounts
  for select
  using (auth.uid() = user_id);

create policy "Users can manage own social accounts"
  on public.social_accounts
  for all
  using (auth.uid() = user_id);

-- Admin policies for new tables
create policy "Admins have full access to user settings"
  on public.user_settings
  for all
  using (get_user_role() = 'admin');

create policy "Admins have full access to social accounts"
  on public.social_accounts
  for all
  using (get_user_role() = 'admin');

-- Update handle_new_user trigger to include settings
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Insert profile (already exists in previous migration)
  insert into public.profiles (
    id,
    email,
    fullname,
    role
  ) values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    'user'
  );

  -- Insert default settings
  insert into public.user_settings (
    user_id,
    theme,
    color_scheme
  ) values (
    new.id,
    'dark',
    '#ff3366'
  );

  return new;
end;
$$ language plpgsql security definer;