-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Create custom types
do $$ begin
  create type user_role as enum ('user', 'admin');
  exception when duplicate_object then null;
end $$;

do $$ begin
  create type subscription_status as enum ('active', 'cancelled', 'expired');
  exception when duplicate_object then null;
end $$;

do $$ begin
  create type subscription_plan as enum ('basic', 'credit-starter', 'pro', 'elite');
  exception when duplicate_object then null;
end $$;

-- Create users table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  first_name text,
  last_name text,
  avatar_url text,
  role user_role default 'user'::user_role,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create user settings table
create table public.user_settings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  theme text default 'dark',
  color_scheme text default '#ff3366',
  notifications jsonb default '{
    "browser": true,
    "categories": {},
    "content": {
      "new-episodes": true,
      "recommendations": true,
      "trending": true
    },
    "social": {
      "follows": true,
      "mentions": true,
      "replies": true
    },
    "system": {
      "maintenance": false,
      "security": true,
      "updates": true,
      "email": true,
      "emailFrequency": "immediate",
      "mobile": false,
      "quietHours": {
        "enabled": false,
        "end": "07:00",
        "start": "22:00",
        "sound": true
      }
    }
  }'::jsonb,
  language jsonb default '{
    "language": "en",
    "region": "US",
    "timeZone": "auto",
    "dateFormat": "MM/DD/YYYY"
  }'::jsonb,
  privacy jsonb default '{
    "show_profile": true,
    "allow_listening_activity": false,
    "share_library": true,
    "allow_friend_requests": true
  }'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id)
);

-- Create subscriptions table
create table public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  plan subscription_plan default 'basic'::subscription_plan,
  status subscription_status default 'active'::subscription_status,
  amount decimal(10,2) not null default 5.00,
  currency text default 'USD',
  next_billing_date timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create payment_methods table
create table public.payment_methods (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null,
  is_default boolean default false,
  details jsonb not null,
  provider jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create billing_history table
create table public.billing_history (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  amount decimal(10,2) not null,
  currency text default 'USD',
  status text not null,
  description text not null,
  invoice_url text,
  created_at timestamptz default now()
);

-- Create social_accounts table
create table public.social_accounts (
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

-- Create security_logs table
create table public.security_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  event_type text not null,
  ip_address text,
  user_agent text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payment_methods enable row level security;
alter table public.billing_history enable row level security;
alter table public.social_accounts enable row level security;
alter table public.security_logs enable row level security;

-- Create RLS Policies

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- User settings policies
create policy "Users can view own settings"
  on public.user_settings for select
  using (auth.uid() = user_id);

create policy "Users can update own settings"
  on public.user_settings for update
  using (auth.uid() = user_id);

-- Subscriptions policies
create policy "Users can view own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Payment methods policies
create policy "Users can view own payment methods"
  on public.payment_methods for select
  using (auth.uid() = user_id);

create policy "Users can manage own payment methods"
  on public.payment_methods for all
  using (auth.uid() = user_id);

-- Billing history policies
create policy "Users can view own billing history"
  on public.billing_history for select
  using (auth.uid() = user_id);

-- Social accounts policies
create policy "Users can view own social accounts"
  on public.social_accounts for select
  using (auth.uid() = user_id);

create policy "Users can manage own social accounts"
  on public.social_accounts for all
  using (auth.uid() = user_id);

-- Security logs policies
create policy "Users can view own security logs"
  on public.security_logs for select
  using (auth.uid() = user_id);

-- Functions

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'avatar_url'
  );

  insert into public.user_settings (user_id)
  values (new.id);

  insert into public.subscriptions (user_id)
  values (new.id);

  -- Log the security event
  insert into public.security_logs (user_id, event_type)
  values (new.id, 'account_created');

  return new;
end;
$$ language plpgsql security definer;

-- Function to update user profile
create or replace function public.update_profile(
  user_id uuid,
  first_name text,
  last_name text,
  avatar_url text
)
returns public.profiles as $$
declare
  profile public.profiles;
begin
  update public.profiles
  set
    first_name = update_profile.first_name,
    last_name = update_profile.last_name,
    avatar_url = update_profile.avatar_url,
    updated_at = now()
  where id = user_id
  returning * into profile;
  
  return profile;
end;
$$ language plpgsql security definer;

-- Function to check if user is admin
create or replace function public.is_admin(user_id uuid)
returns boolean as $$
declare
  is_admin boolean;
begin
  select (role = 'admin'::user_role)
  into is_admin
  from public.profiles
  where id = user_id;
  
  return coalesce(is_admin, false);
end;
$$ language plpgsql security definer;

-- Triggers

-- Trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger to update timestamps
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at_column();

create trigger update_user_settings_updated_at
  before update on public.user_settings
  for each row execute procedure public.update_updated_at_column();

create trigger update_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute procedure public.update_updated_at_column();

create trigger update_payment_methods_updated_at
  before update on public.payment_methods
  for each row execute procedure public.update_updated_at_column();

create trigger update_social_accounts_updated_at
  before update on public.social_accounts
  for each row execute procedure public.update_updated_at_column();