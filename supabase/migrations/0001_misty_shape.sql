-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  fullname text,
  profile_picture text,
  phone_number text,
  email text unique not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone" 
on public.profiles for select using (true);

create policy "Users can insert their own profile" 
on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile" 
on public.profiles for update using (auth.uid() = id);

-- Create admin check function
create or replace function is_admin(user_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 from auth.users 
    where id = user_id 
    and raw_user_meta_data->>'role' = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Create trigger function for new users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, fullname, email)
  values (
    new.id,
    new.raw_user_meta_data->>'fullname',
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();