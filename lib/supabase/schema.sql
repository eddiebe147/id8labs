-- Course Purchases Schema for ID8Labs
-- Run this in your Supabase SQL Editor

-- USERS table (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Trigger to create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop existing trigger if it exists, then create
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- CUSTOMERS table (maps users to Stripe customers)
create table if not exists public.customers (
  id uuid references auth.users on delete cascade not null primary key,
  stripe_customer_id text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.customers enable row level security;
-- No public access - only accessed via service role

-- PURCHASES table (tracks course purchases)
create table if not exists public.purchases (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  product_id text not null, -- e.g., 'claude-for-knowledge-workers'
  amount integer not null, -- in cents
  currency text default 'usd',
  status text default 'pending', -- pending, completed, refunded
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.purchases enable row level security;

create policy "Users can view own purchases" on public.purchases
  for select using (auth.uid() = user_id);

-- Index for faster lookups
create index if not exists purchases_user_id_idx on public.purchases(user_id);
create index if not exists purchases_product_id_idx on public.purchases(product_id);

-- EMAIL SUBSCRIBERS table (for Module 0 email capture)
create table if not exists public.email_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  source text default 'module-0', -- where they signed up
  subscribed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unsubscribed_at timestamp with time zone
);

alter table public.email_subscribers enable row level security;

-- Allow inserts from anyone (for email capture form)
create policy "Anyone can subscribe" on public.email_subscribers
  for insert with check (true);

-- Function to check if user has purchased a course
create or replace function public.has_purchased(course_id text)
returns boolean as $$
begin
  return exists (
    select 1 from public.purchases
    where user_id = auth.uid()
    and product_id = course_id
    and status = 'completed'
  );
end;
$$ language plpgsql security definer;
