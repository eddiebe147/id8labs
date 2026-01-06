-- Content Queue System
-- Schedules essays and content for timed publication
-- Supports smart spacing algorithm (3-4 hours between posts)

-- CONTENT_QUEUE table
create table if not exists public.content_queue (
  id uuid default gen_random_uuid() primary key,

  -- Content metadata
  title text not null,
  slug text not null unique,
  content_type text not null default 'essay', -- essay, research, announcement

  -- Source reference
  source_path text, -- path to MDX file (e.g., essays/my-essay.mdx)

  -- Scheduling
  status text not null default 'draft', -- draft, scheduled, published, failed
  priority integer default 3 check (priority between 1 and 5), -- 1 = highest priority
  scheduled_at timestamp with time zone,
  published_at timestamp with time zone,

  -- Social distribution (post after essay publishes)
  social_status text default 'pending', -- pending, queued, posted, skipped
  social_platforms text[] default array['twitter', 'linkedin'],
  social_posted_at timestamp with time zone,

  -- Error handling
  error_message text,
  retry_count integer default 0,

  -- Tracking
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for queue processing
create index if not exists content_queue_status_idx
  on public.content_queue(status, scheduled_at)
  where status = 'scheduled';

create index if not exists content_queue_priority_idx
  on public.content_queue(priority, created_at)
  where status in ('draft', 'scheduled');

create index if not exists content_queue_slug_idx
  on public.content_queue(slug);

alter table public.content_queue enable row level security;

-- PUBLISHING_WINDOWS table (defines allowed posting times)
create table if not exists public.publishing_windows (
  id uuid default gen_random_uuid() primary key,
  day_of_week integer not null check (day_of_week between 0 and 6), -- 0 = Sunday
  start_hour integer not null check (start_hour between 0 and 23),
  end_hour integer not null check (end_hour between 0 and 23),
  timezone text default 'America/New_York',
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Default windows: 9am-8pm, 7 days a week (only insert if empty)
insert into public.publishing_windows (day_of_week, start_hour, end_hour)
select * from (values
  (0, 9, 20), -- Sunday
  (1, 9, 20), -- Monday
  (2, 9, 20), -- Tuesday
  (3, 9, 20), -- Wednesday
  (4, 9, 20), -- Thursday
  (5, 9, 20), -- Friday
  (6, 9, 20)  -- Saturday
) as v(day_of_week, start_hour, end_hour)
where not exists (select 1 from public.publishing_windows limit 1);

-- SMART_SPACING_CONFIG table
create table if not exists public.smart_spacing_config (
  id uuid default gen_random_uuid() primary key,
  min_gap_hours integer default 3,
  max_gap_hours integer default 4,
  max_posts_per_day integer default 6,
  timezone text default 'America/New_York',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Default config (only insert if empty)
insert into public.smart_spacing_config (min_gap_hours, max_gap_hours, max_posts_per_day)
select 3, 4, 6
where not exists (select 1 from public.smart_spacing_config limit 1);

-- Function to update timestamps
create or replace function update_content_queue_timestamp()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists content_queue_updated on public.content_queue;
create trigger content_queue_updated
  before update on public.content_queue
  for each row execute procedure update_content_queue_timestamp();

-- Function to find next available slot
create or replace function find_next_publish_slot()
returns timestamp with time zone as $$
declare
  config record;
  last_scheduled timestamp with time zone;
  next_slot timestamp with time zone;
  window record;
begin
  -- Get config
  select * into config from public.smart_spacing_config limit 1;

  -- Get last scheduled item
  select max(scheduled_at) into last_scheduled
  from public.content_queue
  where status in ('scheduled', 'published')
    and scheduled_at is not null;

  -- If no prior posts, start from now
  if last_scheduled is null then
    next_slot := now();
  else
    -- Add minimum gap
    next_slot := last_scheduled + (config.min_gap_hours || ' hours')::interval;
  end if;

  -- Make sure we're not in the past
  if next_slot < now() then
    next_slot := now();
  end if;

  -- Round up to next :00 or :30
  next_slot := date_trunc('hour', next_slot) +
    interval '30 min' * ceil(extract(minute from next_slot) / 30.0);

  return next_slot;
end;
$$ language plpgsql;

-- Comments
comment on table public.content_queue is 'Queue for scheduling essay and content publication';
comment on table public.publishing_windows is 'Allowed time windows for auto-scheduling content';
comment on table public.smart_spacing_config is 'Configuration for smart spacing algorithm';
comment on function find_next_publish_slot() is 'Finds the next available slot based on smart spacing rules';
