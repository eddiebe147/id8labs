-- Purchases System Migration
-- Creates tables for Stripe payment integration

-- CUSTOMERS table (maps users to Stripe customers)
create table if not exists public.customers (
  id uuid references auth.users on delete cascade not null primary key,
  stripe_customer_id text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.customers enable row level security;

-- No public read/write - only accessed via service role in API routes

-- PURCHASES table (tracks course purchases)
create table if not exists public.purchases (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  product_id text not null, -- e.g., 'claude-for-knowledge-workers'
  amount integer not null, -- in cents
  currency text default 'usd',
  status text default 'pending', -- pending, completed, expired, refunded
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.purchases enable row level security;

-- Users can view their own purchases
drop policy if exists "Users can view own purchases" on public.purchases;
create policy "Users can view own purchases" on public.purchases
  for select using (auth.uid() = user_id);

-- Indexes for faster lookups
create index if not exists purchases_user_id_idx on public.purchases(user_id);
create index if not exists purchases_product_id_idx on public.purchases(product_id);
create index if not exists purchases_status_idx on public.purchases(status);
create index if not exists purchases_checkout_session_idx on public.purchases(stripe_checkout_session_id);

-- Function to check if user has purchased a product
drop function if exists public.has_purchased(text);
create or replace function public.has_purchased(p_product_id text)
returns boolean as $$
begin
  return exists (
    select 1 from public.purchases
    where user_id = auth.uid()
    and product_id = p_product_id
    and status = 'completed'
  );
end;
$$ language plpgsql security definer;

-- Grant execute permission on the function
grant execute on function public.has_purchased(text) to authenticated;
