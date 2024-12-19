/*
  # Settings Implementation

  1. Tables Structure
    - Modifies user_settings table to include all settings fields
    - Adds proper constraints and defaults
  
  2. Security
    - Adds RLS policies for settings access
    - Creates helper functions for settings management
*/

-- Update user_settings table structure
alter table user_settings add column if not exists appearance jsonb default '{
  "theme": "dark",
  "colorScheme": "#ff3366"
}'::jsonb;

alter table user_settings add column if not exists billing jsonb default '{
  "subscription": {
    "plan": "basic",
    "status": "active",
    "amount": 5,
    "currency": "USD",
    "nextBillingDate": null
  },
  "paymentMethods": [],
  "billingHistory": []
}'::jsonb;

alter table user_settings add column if not exists language jsonb default '{
  "language": "en",
  "region": "US",
  "timeZone": "auto",
  "dateFormat": "MM/DD/YYYY"
}'::jsonb;

alter table user_settings add column if not exists notifications jsonb default '{
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
}'::jsonb;

alter table user_settings add column if not exists privacy jsonb default '{
  "password_authentication": {
    "change_password": true,
    "phone_number_authentication": {
      "enabled": false,
      "phone_number": "",
      "verified": false
    },
    "authenticator_app": {
      "enabled": false,
      "qr_code_url": "",
      "last_used": null
    }
  },
  "privacy_settings": {
    "show_profile": true,
    "allow_listening_activity": false,
    "share_library": true,
    "allow_friend_requests": true
  },
  "security_log": []
}'::jsonb;

-- Drop existing policies
drop policy if exists "Users can view own settings" on user_settings;
drop policy if exists "Users can update own settings" on user_settings;
drop policy if exists "Admins can access all settings" on user_settings;

-- Create new RLS policies
alter table user_settings enable row level security;

-- Allow users to view their own settings
create policy "Users can view own settings"
on user_settings for select
using (auth.uid() = user_id);

-- Allow users to update their own settings
create policy "Users can update own settings"
on user_settings for update
using (auth.uid() = user_id);

-- Allow admins full access
create policy "Admins can access all settings"
on user_settings for all
using (
  exists (
    select 1 from profiles
    where id = auth.uid()
    and role = 'admin'
  )
);

-- Helper functions for settings management
create or replace function get_user_settings(p_user_id uuid)
returns jsonb as $$
declare
  settings jsonb;
begin
  select json_build_object(
    'appearance', appearance,
    'billing', billing,
    'language', language,
    'notifications', notifications,
    'privacy', privacy
  )
  into settings
  from user_settings
  where user_id = p_user_id;
  
  return settings;
end;
$$ language plpgsql security definer;

-- Function to update specific settings section
create or replace function update_user_settings(
  p_user_id uuid,
  p_section text,
  p_settings jsonb
)
returns void as $$
begin
  execute format(
    'update user_settings set %I = $1, updated_at = now() where user_id = $2',
    p_section
  ) using p_settings, p_user_id;
end;
$$ language plpgsql security definer;

-- Trigger to initialize settings for new users
create or replace function initialize_user_settings()
returns trigger as $$
begin
  insert into user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_user_created
  after insert on profiles
  for each row
  execute function initialize_user_settings();