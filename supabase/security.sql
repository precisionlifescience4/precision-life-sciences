-- Run in Supabase > SQL Editor AFTER SUPABASE_SERVICE_ROLE_KEY is set in Vercel
-- and the new code is deployed. Turns on Row Level Security so the public (anon)
-- key can only READ website content, and cannot touch enquiries at all.
-- All writes now go through the server using the secret service-role key.

alter table public.faqs          enable row level security;
alter table public.gallery       enable row level security;
alter table public.inquiries     enable row level security;
alter table public.services      enable row level security;
alter table public.settings      enable row level security;
alter table public.site_content  enable row level security;
alter table public.team_members  enable row level security;
alter table public.trust_badges  enable row level security;

-- Public read access for website content tables only.
create policy "public read faqs"          on public.faqs          for select using (true);
create policy "public read gallery"       on public.gallery       for select using (true);
create policy "public read services"      on public.services      for select using (true);
create policy "public read settings"      on public.settings      for select using (true);
create policy "public read site_content"  on public.site_content  for select using (true);
create policy "public read team_members"  on public.team_members  for select using (true);
create policy "public read trust_badges"  on public.trust_badges  for select using (true);

-- inquiries: deliberately NO policy => anon key has no access. Server uses service role.
