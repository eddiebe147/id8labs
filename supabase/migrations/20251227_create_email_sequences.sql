-- Email Sequences Schema for Nurture Campaigns
-- Run this in your Supabase SQL Editor

-- EMAIL SEQUENCES table (tracks which sequence a subscriber is in)
create table if not exists public.email_sequences (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  sequence_id text not null, -- e.g., 'ai-fundamentals-nurture'
  current_step integer default 1, -- which email in sequence (1, 2, 3)
  status text default 'active', -- active, completed, cancelled, purchased
  source text, -- where they signed up
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  next_send_at timestamp with time zone, -- when to send next email
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Prevent duplicate active sequences for same email
  unique(email, sequence_id, status)
);

-- Index for cron job to find emails to send
create index if not exists email_sequences_next_send_idx
  on public.email_sequences(next_send_at)
  where status = 'active';

create index if not exists email_sequences_email_idx
  on public.email_sequences(email);

alter table public.email_sequences enable row level security;

-- Only service role can access (no public access)
-- All operations go through API routes with service role

-- EMAIL SEQUENCE LOGS table (tracks sent emails)
create table if not exists public.email_sequence_logs (
  id uuid default gen_random_uuid() primary key,
  sequence_record_id uuid references public.email_sequences(id) on delete cascade,
  email text not null,
  sequence_id text not null,
  step integer not null,
  resend_message_id text,
  status text default 'sent', -- sent, opened, clicked, bounced, failed
  sent_at timestamp with time zone default timezone('utc'::text, now()) not null,
  opened_at timestamp with time zone,
  clicked_at timestamp with time zone
);

create index if not exists email_sequence_logs_sequence_idx
  on public.email_sequence_logs(sequence_record_id);

alter table public.email_sequence_logs enable row level security;

-- Function to update timestamps
create or replace function update_email_sequence_timestamp()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger email_sequences_updated
  before update on public.email_sequences
  for each row execute procedure update_email_sequence_timestamp();
