-- Newsletter System Schema
-- Supports tiered content delivery for free vs academy members

-- NEWSLETTER SUBSCRIBERS table
create table if not exists public.newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  status text default 'active', -- active, unsubscribed, bounced
  is_academy_member boolean default false,
  source text, -- where they subscribed from
  subscribed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unsubscribed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for newsletter sending
create index if not exists newsletter_subscribers_status_idx
  on public.newsletter_subscribers(status)
  where status = 'active';

create index if not exists newsletter_subscribers_academy_idx
  on public.newsletter_subscribers(is_academy_member)
  where status = 'active';

alter table public.newsletter_subscribers enable row level security;

-- NEWSLETTER SENDS table (logs all newsletter sends)
create table if not exists public.newsletter_sends (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  issue_number integer not null,
  is_academy_version boolean default false,
  resend_message_id text,
  status text default 'sent', -- sent, opened, clicked, bounced
  sent_at timestamp with time zone default timezone('utc'::text, now()) not null,
  opened_at timestamp with time zone,
  clicked_at timestamp with time zone
);

create index if not exists newsletter_sends_issue_idx
  on public.newsletter_sends(issue_number);

create index if not exists newsletter_sends_email_idx
  on public.newsletter_sends(email);

alter table public.newsletter_sends enable row level security;

-- Function to update timestamps
create or replace function update_newsletter_subscriber_timestamp()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger newsletter_subscribers_updated
  before update on public.newsletter_subscribers
  for each row execute procedure update_newsletter_subscriber_timestamp();

-- Function to auto-add Academy purchasers to newsletter
create or replace function add_academy_member_to_newsletter()
returns trigger as $$
begin
  -- When someone starts the academy-onboarding sequence, add them to newsletter
  if new.sequence_id = 'academy-onboarding' and new.status = 'active' then
    insert into public.newsletter_subscribers (email, is_academy_member, source)
    values (new.email, true, 'academy-purchase')
    on conflict (email) do update set
      is_academy_member = true,
      updated_at = timezone('utc'::text, now());
  end if;
  return new;
end;
$$ language plpgsql;

-- Trigger to auto-add Academy members to newsletter
create trigger academy_member_newsletter_signup
  after insert on public.email_sequences
  for each row execute procedure add_academy_member_to_newsletter();

-- Comment for documentation
comment on table public.newsletter_subscribers is 'Newsletter subscriber list with tier tracking (free vs academy)';
comment on table public.newsletter_sends is 'Log of all newsletter sends for analytics and preventing duplicates';
