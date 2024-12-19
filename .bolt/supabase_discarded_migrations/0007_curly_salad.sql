-- Drop existing policies if they exist
do $$ 
begin
  -- Drop profile policies
  if exists (
    select 1 from pg_policies 
    where schemaname = 'public' 
    and tablename = 'profiles' 
    and policyname = 'Profiles are viewable by authenticated users'
  ) then
    drop policy "Profiles are viewable by authenticated users" on profiles;
  end if;

  -- Drop settings policies
  if exists (
    select 1 from pg_policies 
    where schemaname = 'public' 
    and tablename = 'user_settings' 
    and policyname = 'Users can view own settings'
  ) then
    drop policy "Users can view own settings" on user_settings;
  end if;

  if exists (
    select 1 from pg_policies 
    where schemaname = 'public' 
    and tablename = 'user_settings' 
    and policyname = 'Users can update own settings'
  ) then
    drop policy "Users can update own settings" on user_settings;
  end if;

  if exists (
    select 1 from pg_policies 
    where schemaname = 'public' 
    and tablename = 'user_settings' 
    and policyname = 'Admins can access all settings'
  ) then
    drop policy "Admins can access all settings" on user_settings;
  end if;
end $$;

-- Create new RLS policies
create policy "Users can read profiles"
on profiles for select
using (auth.role() = 'authenticated');

create policy "Users can update own profile"
on profiles for update
using (auth.uid() = id);

create policy "Users can insert own profile"
on profiles for insert
with check (auth.uid() = id);

-- Settings policies
create policy "Users can read own settings"
on user_settings for select
using (auth.uid() = user_id);

create policy "Users can modify own settings" 
on user_settings for update
using (auth.uid() = user_id);

create policy "Users can insert own settings"
on user_settings for insert
with check (auth.uid() = user_id);

-- Admin access
create policy "Admin full access to profiles"
on profiles for all
using (
  exists (
    select 1 from auth.users
    where id = auth.uid()
    and raw_user_meta_data->>'role' = 'admin'
  )
);

create policy "Admin full access to settings"
on user_settings for all
using (
  exists (
    select 1 from auth.users
    where id = auth.uid()
    and raw_user_meta_data->>'role' = 'admin'
  )
);

-- Update admin check function
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from auth.users
    where id = auth.uid()
    and raw_user_meta_data->>'role' = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Update handle_new_user function
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Insert profile
  insert into public.profiles (
    id,
    email,
    first_name,
    last_name,
    avatar_url,
    role
  ) values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    coalesce(
      new.raw_user_meta_data->>'avatar_url',
      'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png'
    ),
    'user'
  );

  -- Insert default settings
  insert into public.user_settings (
    user_id,
    appearance,
    notifications,
    privacy,
    language,
    billing
  ) values (
    new.id,
    jsonb_build_object(
      'theme', 'dark',
      'colorScheme', '#ff3366'
    ),
    jsonb_build_object(
      'browser', true,
      'categories', '{}',
      'content', jsonb_build_object(
        'new-episodes', true,
        'recommendations', true,
        'trending', true
      ),
      'social', jsonb_build_object(
        'follows', true,
        'mentions', true,
        'replies', true
      ),
      'system', jsonb_build_object(
        'maintenance', false,
        'security', true,
        'updates', true,
        'email', true,
        'emailFrequency', 'immediate',
        'mobile', false,
        'quietHours', jsonb_build_object(
          'enabled', false,
          'end', '07:00',
          'start', '22:00',
          'sound', true
        )
      )
    ),
    jsonb_build_object(
      'password_authentication', jsonb_build_object(
        'change_password', true,
        'phone_number_authentication', jsonb_build_object(
          'enabled', false,
          'phone_number', '',
          'verified', false
        ),
        'authenticator_app', jsonb_build_object(
          'enabled', false,
          'qr_code_url', '',
          'last_used', null
        )
      ),
      'privacy_settings', jsonb_build_object(
        'show_profile', true,
        'allow_listening_activity', false,
        'share_library', true,
        'allow_friend_requests', true
      ),
      'security_log', '[]'
    ),
    jsonb_build_object(
      'language', 'en',
      'region', 'US',
      'timeZone', 'auto',
      'dateFormat', 'MM/DD/YYYY'
    ),
    jsonb_build_object(
      'subscription', jsonb_build_object(
        'plan', 'basic',
        'status', 'active',
        'amount', 5,
        'currency', 'USD',
        'nextBillingDate', null
      ),
      'paymentMethods', '[]',
      'billingHistory', '[]'
    )
  );

  return new;
end;
$$ language plpgsql security definer;