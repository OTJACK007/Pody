-- Drop existing policies
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can view own settings" on public.user_settings;
drop policy if exists "Users can insert own settings" on public.user_settings;
drop policy if exists "Users can update own settings" on public.user_settings;
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can view own settings" on public.user_settings;
drop policy if exists "Users can insert own settings" on public.user_settings;
drop policy if exists "Users can update own settings" on public.user_settings;
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can view own settings" on public.user_settings;
drop policy if exists "Users can insert own settings" on public.user_settings;
drop policy if exists "Users can update own settings" on public.user_settings;
drop policy if exists "Users can view own subscription" on public.subscriptions;
drop policy if exists "Users can view own payment methods" on public.payment_methods;
drop policy if exists "Users can manage own payment methods" on public.payment_methods;
drop policy if exists "Users can view own billing history" on public.billing_history;
drop policy if exists "Users can view own social accounts" on public.social_accounts;
drop policy if exists "Users can manage own social accounts" on public.social_accounts;
drop policy if exists "Users can insert own social accounts" on public.social_accounts;
drop policy if exists "Users can update own social accounts" on public.social_accounts;
drop policy if exists "Users can delete own social accounts" on public.social_accounts;
drop policy if exists "Users can view own security logs" on public.security_logs;


-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- User settings policies
create policy "Users can view own settings"
  on public.user_settings for select
  using (auth.uid() = user_id);

create policy "Users can insert own settings"
  on public.user_settings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own settings"
  on public.user_settings for update
  using (auth.uid() = user_id);

-- Social accounts policies
create policy "Users can view own social accounts"
  on public.social_accounts for select
  using (auth.uid() = user_id);

create policy "Users can insert own social accounts"
  on public.social_accounts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own social accounts"
  on public.social_accounts for update
  using (auth.uid() = user_id);

create policy "Users can delete own social accounts"
  on public.social_accounts for delete
  using (auth.uid() = user_id);

-- Function to check if user is admin
create or replace function public.is_admin(user_id uuid)
returns boolean as $$
declare
  user_role text;
begin
  select role into user_role
  from public.profiles
  where id = user_id;
  
  return user_role = 'admin';
end;
$$ language plpgsql security definer;

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    email,
    first_name,
    last_name,
    full_name,
    avatar_url,
    role
  ) values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'full_name',
    coalesce(
      new.raw_user_meta_data->>'avatar_url',
      'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png'
    ),
    'user'
  );

  insert into public.user_settings (
    user_id,
    theme,
    color_scheme,
    notifications,
    language,
    privacy
  ) values (
    new.id,
    'dark',
    '#ff3366',
    '{
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
    }',
    '{
      "language": "en",
      "region": "US",
      "timeZone": "auto",
      "dateFormat": "MM/DD/YYYY"
    }',
    '{
      "show_profile": true,
      "allow_listening_activity": false,
      "share_library": true,
      "allow_friend_requests": true
    }'
  );

  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- User settings policies
create policy "Users can view own settings"
  on public.user_settings for select
  using (auth.uid() = user_id);

create policy "Users can insert own settings"
  on public.user_settings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own settings"
  on public.user_settings for update
  using (auth.uid() = user_id);

-- Social accounts policies
create policy "Users can view own social accounts"
  on public.social_accounts for select
  using (auth.uid() = user_id);

create policy "Users can insert own social accounts"
  on public.social_accounts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own social accounts"
  on public.social_accounts for update
  using (auth.uid() = user_id);

create policy "Users can delete own social accounts"
  on public.social_accounts for delete
  using (auth.uid() = user_id);

-- Function to check if user is admin
create or replace function public.is_admin(user_id uuid)
returns boolean as $$
declare
  user_role text;
begin
  select role into user_role
  from public.profiles
  where id = user_id;
  
  return user_role = 'admin';
end;
$$ language plpgsql security definer;

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    email,
    first_name,
    last_name,
    full_name,
    avatar_url,
    role
  ) values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'full_name',
    coalesce(
      new.raw_user_meta_data->>'avatar_url',
      'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png'
    ),
    'user'
  );

  insert into public.user_settings (
    user_id,
    theme,
    color_scheme,
    notifications,
    language,
    privacy
  ) values (
    new.id,
    'dark',
    '#ff3366',
    '{
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
    }',
    '{
      "language": "en",
      "region": "US",
      "timeZone": "auto",
      "dateFormat": "MM/DD/YYYY"
    }',
    '{
      "show_profile": true,
      "allow_listening_activity": false,
      "share_library": true,
      "allow_friend_requests": true
    }'
  );

  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();