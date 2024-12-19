-- Drop problematic policies that cause recursion
drop policy if exists "Profiles are viewable by authenticated users" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "New users can insert their profile" on profiles;
drop policy if exists "Admin full access" on profiles;

-- Create new simplified policies
create policy "Allow authenticated read access"
  on profiles for select
  using (auth.role() = 'authenticated');

create policy "Allow users to update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Allow users to insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Allow admin full access"
  on profiles for all
  using (auth.jwt()->>'role' = 'admin');

-- Update handle_new_user function with complete default settings
create or replace function public.handle_new_user()
returns trigger as $$
begin
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

  insert into public.user_settings (
    user_id,
    appearance,
    billing,
    language,
    notifications,
    privacy
  ) values (
    new.id,
    jsonb_build_object(
      'theme', 'dark',
      'colorScheme', '#ff3366'
    ),
    jsonb_build_object(
      'subscription', jsonb_build_object(
        'plan', 'basic',
        'status', 'active',
        'amount', 5,
        'currency', 'USD',
        'nextBillingDate', (now() + interval '30 days')::timestamp
      ),
      'paymentMethods', '[]'::jsonb,
      'billingHistory', '[]'::jsonb
    ),
    jsonb_build_object(
      'language', 'en',
      'region', 'US',
      'timeZone', 'auto',
      'dateFormat', 'MM/DD/YYYY'
    ),
    jsonb_build_object(
      'browser', true,
      'categories', '{}'::jsonb,
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
          'last_used', now()
        )
      ),
      'privacy_settings', jsonb_build_object(
        'show_profile', true,
        'allow_listening_activity', false,
        'share_library', true,
        'allow_friend_requests', true
      ),
      'security_log', '[]'::jsonb
    )
  );

  return new;
end;
$$ language plpgsql security definer;

-- Create function to initialize settings for existing users
create or replace function public.initialize_user_settings(p_user_id uuid)
returns void as $$
begin
  insert into public.user_settings (
    user_id,
    appearance,
    billing,
    language,
    notifications,
    privacy
  ) values (
    p_user_id,
    jsonb_build_object(
      'theme', 'dark',
      'colorScheme', '#ff3366'
    ),
    jsonb_build_object(
      'subscription', jsonb_build_object(
        'plan', 'basic',
        'status', 'active',
        'amount', 5,
        'currency', 'USD',
        'nextBillingDate', (now() + interval '30 days')::timestamp
      ),
      'paymentMethods', '[]'::jsonb,
      'billingHistory', '[]'::jsonb
    ),
    jsonb_build_object(
      'language', 'en',
      'region', 'US',
      'timeZone', 'auto',
      'dateFormat', 'MM/DD/YYYY'
    ),
    jsonb_build_object(
      'browser', true,
      'categories', '{}'::jsonb,
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
          'last_used', now()
        )
      ),
      'privacy_settings', jsonb_build_object(
        'show_profile', true,
        'allow_listening_activity', false,
        'share_library', true,
        'allow_friend_requests', true
      ),
      'security_log', '[]'::jsonb
    )
  ) on conflict (user_id) do nothing;
end;
$$ language plpgsql security definer;

-- Initialize settings for existing users
do $$
declare
  user_record record;
begin
  for user_record in 
    select id from auth.users 
    where id not in (select user_id from public.user_settings)
  loop
    perform initialize_user_settings(user_record.id);
  end loop;
end $$;