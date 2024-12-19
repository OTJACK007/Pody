-- Drop existing problematic policies
drop policy if exists "Public profiles are viewable by everyone" on profiles;
drop policy if exists "Users can insert their own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "Admins can view all profiles" on profiles;
drop policy if exists "Allow authenticated read access" on profiles;
drop policy if exists "Allow users to update own profile" on profiles;
drop policy if exists "Allow users to insert own profile" on profiles;
drop policy if exists "Allow admin full access" on profiles;

-- Create new simplified policies without recursion
create policy "Anyone can read profiles"
  on profiles for select
  using (true);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Admins have full access to profiles"
  on profiles for all
  using (
    exists (
      select 1
      from auth.users
      where auth.uid() = id
      and raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Update admin check function to avoid recursion
create or replace function public.is_admin()
returns boolean as $$
begin
  return (
    select exists (
      select 1
      from auth.users
      where auth.uid() = id
      and raw_user_meta_data->>'role' = 'admin'
    )
  );
end;
$$ language plpgsql security definer;

-- Update handle_new_user function
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
    case 
      when new.raw_user_meta_data->>'role' = 'admin' then 'admin'
      else 'user'
    end
  );

  return new;
end;
$$ language plpgsql security definer;