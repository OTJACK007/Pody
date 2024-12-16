-- Drop existing policies
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

-- Subscriptions policies
create policy "Users can view own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create policy "Users can insert own subscription"
  on public.subscriptions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own subscription"
  on public.subscriptions for update
  using (auth.uid() = user_id);

-- Payment methods policies
create policy "Users can view own payment methods"
  on public.payment_methods for select
  using (auth.uid() = user_id);

create policy "Users can insert own payment methods"
  on public.payment_methods for insert
  with check (auth.uid() = user_id);

create policy "Users can update own payment methods"
  on public.payment_methods for update
  using (auth.uid() = user_id);

create policy "Users can delete own payment methods"
  on public.payment_methods for delete
  using (auth.uid() = user_id);

-- Billing history policies
create policy "Users can view own billing history"
  on public.billing_history for select
  using (auth.uid() = user_id);

create policy "Users can insert own billing history"
  on public.billing_history for insert
  with check (auth.uid() = user_id);

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

-- Security logs policies
create policy "Users can view own security logs"
  on public.security_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert own security logs"
  on public.security_logs for insert
  with check (auth.uid() = user_id);