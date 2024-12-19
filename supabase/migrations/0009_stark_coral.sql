-- Create goals table
create table public.goals (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  category text not null,
  progress integer default 0,
  status text not null default 'active',
  start_date timestamptz default now(),
  due_date timestamptz not null,
  completed_date timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create goal_linked_content table
create table public.goal_linked_content (
  id uuid primary key default uuid_generate_v4(),
  goal_id uuid references public.goals(id) on delete cascade not null,
  content_type text not null,
  title text not null,
  source_url text,
  thumbnail_url text,
  created_at timestamptz default now()
);

-- Create goal_progress_updates table
create table public.goal_progress_updates (
  id uuid primary key default uuid_generate_v4(),
  goal_id uuid references public.goals(id) on delete cascade not null,
  progress integer not null,
  notes text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.goals enable row level security;
alter table public.goal_linked_content enable row level security;
alter table public.goal_progress_updates enable row level security;

-- Create policies
create policy "Users can manage their own goals"
  on public.goals
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage their goals' linked content"
  on public.goal_linked_content
  for all
  using (exists (
    select 1 from public.goals
    where goals.id = goal_id
    and goals.user_id = auth.uid()
  ));

create policy "Users can manage their goals' progress updates"
  on public.goal_progress_updates
  for all
  using (exists (
    select 1 from public.goals
    where goals.id = goal_id
    and goals.user_id = auth.uid()
  ));

-- Create functions
create or replace function public.update_goal_progress(
  p_goal_id uuid,
  p_progress integer,
  p_notes text default null
) returns void as $$
begin
  -- Update goal progress
  update public.goals
  set 
    progress = p_progress,
    status = case 
      when p_progress >= 100 then 'completed'
      when p_progress > 0 then 'in_progress'
      else status
    end,
    completed_date = case 
      when p_progress >= 100 then now()
      else null
    end,
    updated_at = now()
  where id = p_goal_id
  and exists (
    select 1 from public.goals
    where id = p_goal_id
    and user_id = auth.uid()
  );

  -- Create progress update record
  insert into public.goal_progress_updates (
    goal_id,
    progress,
    notes
  ) values (
    p_goal_id,
    p_progress,
    p_notes
  );
end;
$$ language plpgsql security definer;