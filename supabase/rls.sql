-- Drop existing policies
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can view own settings" on public.user_settings;
drop policy if exists "Users can insert own settings" on public.user_settings;
drop policy if exists "Users can update own settings" on public.user_settings;

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