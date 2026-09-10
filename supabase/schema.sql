-- Mindaural v1 Supabase schema. Idempotent where practical.
create extension if not exists pgcrypto;

create table if not exists public.profiles(
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check(display_name is null or char_length(display_name) between 1 and 80),
  public_signing_key text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.project_versions(
  id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  project_id text not null, version integer not null check(version>0), session jsonb not null,
  created_at timestamptz not null default now(), unique(owner_id,project_id,version)
);
create table if not exists public.presets(
  id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null check(char_length(title) between 1 and 240), description text not null default '' check(char_length(description)<=8000),
  visibility text not null default 'private' check(visibility in('private','public')),
  evidence_level text not null default 'community-claim', session jsonb not null, rights_declared boolean not null default false,
  parent_preset_id uuid references public.presets(id) on delete set null,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.share_links(
  id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  project_version_id uuid not null references public.project_versions(id) on delete cascade,
  token_hash bytea unique not null, expires_at timestamptz, revoked_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.reviews(
  id uuid primary key default gen_random_uuid(), preset_id uuid not null references public.presets(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  rating int not null check(rating between 1 and 5), body text not null default '' check(char_length(body)<=4000),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(preset_id,user_id)
);
create table if not exists public.favorites(
  preset_id uuid not null references public.presets(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(), primary key(preset_id,user_id)
);
create table if not exists public.reports(
  id uuid primary key default gen_random_uuid(), reporter_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  target_type text not null check(target_type in('preset','review')), target_id uuid not null,
  reason text not null check(char_length(reason) between 3 and 2000), status text not null default 'open' check(status in('open','resolved','dismissed')),
  created_at timestamptz not null default now()
);
create table if not exists public.asset_rights(
  id uuid primary key default gen_random_uuid(), owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  storage_path text not null unique, license text not null check(license in('user-owned','CC0','project-owned')),
  source text, sha256 text check(sha256 is null or sha256 ~ '^[0-9a-f]{64}$'), public_redistribution boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.rate_events(
  id bigint generated always as identity primary key, user_id uuid not null, action text not null, created_at timestamptz not null default now()
);
create index if not exists rate_events_lookup on public.rate_events(user_id,action,created_at desc);

alter table public.profiles enable row level security; alter table public.project_versions enable row level security; alter table public.presets enable row level security;
alter table public.share_links enable row level security; alter table public.reviews enable row level security; alter table public.favorites enable row level security;
alter table public.reports enable row level security; alter table public.asset_rights enable row level security; alter table public.rate_events enable row level security;

drop policy if exists profiles_read on public.profiles; create policy profiles_read on public.profiles for select using(true);
drop policy if exists profiles_self_write on public.profiles; create policy profiles_self_write on public.profiles for all using(id=auth.uid()) with check(id=auth.uid());
drop policy if exists versions_owner_read on public.project_versions; create policy versions_owner_read on public.project_versions for select using(owner_id=auth.uid());
drop policy if exists versions_owner_insert on public.project_versions; create policy versions_owner_insert on public.project_versions for insert with check(owner_id=auth.uid());
drop policy if exists presets_read on public.presets; create policy presets_read on public.presets for select using(visibility='public' or owner_id=auth.uid());
drop policy if exists presets_owner_insert on public.presets; create policy presets_owner_insert on public.presets for insert with check(owner_id=auth.uid() and (visibility='private' or rights_declared));
drop policy if exists presets_owner_update on public.presets; create policy presets_owner_update on public.presets for update using(owner_id=auth.uid()) with check(owner_id=auth.uid() and (visibility='private' or rights_declared));
drop policy if exists presets_owner_delete on public.presets; create policy presets_owner_delete on public.presets for delete using(owner_id=auth.uid());
drop policy if exists shares_owner on public.share_links; create policy shares_owner on public.share_links for select using(owner_id=auth.uid());
drop policy if exists shares_owner_update on public.share_links; create policy shares_owner_update on public.share_links for update using(owner_id=auth.uid()) with check(owner_id=auth.uid());
drop policy if exists reviews_public_read on public.reviews; create policy reviews_public_read on public.reviews for select using(exists(select 1 from public.presets p where p.id=preset_id and (p.visibility='public' or p.owner_id=auth.uid())));
drop policy if exists reviews_self_insert on public.reviews; create policy reviews_self_insert on public.reviews for insert with check(user_id=auth.uid());
drop policy if exists reviews_self_update on public.reviews; create policy reviews_self_update on public.reviews for update using(user_id=auth.uid()) with check(user_id=auth.uid());
drop policy if exists reviews_self_delete on public.reviews; create policy reviews_self_delete on public.reviews for delete using(user_id=auth.uid());
drop policy if exists favorites_self on public.favorites; create policy favorites_self on public.favorites for all using(user_id=auth.uid()) with check(user_id=auth.uid());
drop policy if exists reports_self_insert on public.reports; create policy reports_self_insert on public.reports for insert with check(reporter_id=auth.uid());
drop policy if exists asset_rights_self on public.asset_rights; create policy asset_rights_self on public.asset_rights for all using(owner_id=auth.uid()) with check(owner_id=auth.uid());

create or replace function public.is_verified_user() returns boolean language sql stable security definer set search_path=public,auth as $$
 select exists(select 1 from auth.users where id=auth.uid() and email_confirmed_at is not null)
$$;
revoke all on function public.is_verified_user() from public; grant execute on function public.is_verified_user() to authenticated;

create or replace function public.record_rate(p_action text,p_max int,p_window_seconds int) returns void language plpgsql security definer set search_path=public as $$
declare n int;
begin
 if auth.uid() is null then raise exception 'authentication required'; end if;
 delete from public.rate_events where created_at<now()-interval '1 day';
 select count(*) into n from public.rate_events where user_id=auth.uid() and action=p_action and created_at>now()-make_interval(secs=>p_window_seconds);
 if n>=p_max then raise exception 'rate limit exceeded for %',p_action; end if;
 insert into public.rate_events(user_id,action) values(auth.uid(),p_action);
end $$;
revoke all on function public.record_rate(text,int,int) from public;

create or replace function public.create_share_link(p_project_version_id uuid,p_expires_at timestamptz default null)
returns jsonb language plpgsql security definer set search_path=public as $$
declare raw_token text; link_id uuid;
begin
 perform public.record_rate('share',30,3600);
 if not exists(select 1 from public.project_versions where id=p_project_version_id and owner_id=auth.uid()) then raise exception 'project version not found'; end if;
 raw_token:=encode(gen_random_bytes(32),'hex');
 insert into public.share_links(owner_id,project_version_id,token_hash,expires_at) values(auth.uid(),p_project_version_id,digest(raw_token,'sha256'),p_expires_at) returning id into link_id;
 return jsonb_build_object('id',link_id,'token',raw_token,'expires_at',p_expires_at);
end $$;
grant execute on function public.create_share_link(uuid,timestamptz) to authenticated;

create or replace function public.resolve_share_link(p_token text)
returns table(id uuid,project_id text,version integer,session jsonb,owner_public_signing_key text) language sql security definer set search_path=public as $$
 select v.id,v.project_id,v.version,v.session,p.public_signing_key from public.share_links l join public.project_versions v on v.id=l.project_version_id left join public.profiles p on p.id=v.owner_id
 where l.token_hash=digest(p_token,'sha256') and l.revoked_at is null and (l.expires_at is null or l.expires_at>now()) limit 1
$$;
grant execute on function public.resolve_share_link(text) to anon,authenticated;

create or replace function public.enforce_public_preset() returns trigger language plpgsql security definer set search_path=public,auth as $$
begin
 if new.visibility='public' then
   if not new.rights_declared then raise exception 'public publishing requires rights declaration'; end if;
   if not public.is_verified_user() then raise exception 'verified email required to publish'; end if;
   perform public.record_rate('publish',20,3600);
 end if;
 new.updated_at=now(); return new;
end $$;
drop trigger if exists preset_guard on public.presets; create trigger preset_guard before insert or update on public.presets for each row execute function public.enforce_public_preset();

create or replace function public.rate_review() returns trigger language plpgsql security definer set search_path=public as $$begin perform public.record_rate('review',40,3600);new.updated_at=now();return new;end$$;
drop trigger if exists review_guard on public.reviews; create trigger review_guard before insert or update on public.reviews for each row execute function public.rate_review();
create or replace function public.rate_report() returns trigger language plpgsql security definer set search_path=public as $$begin perform public.record_rate('report',20,3600);return new;end$$;
drop trigger if exists report_guard on public.reports; create trigger report_guard before insert on public.reports for each row execute function public.rate_report();

create or replace function public.export_my_data() returns jsonb language sql security definer set search_path=public as $$
 select jsonb_build_object('profile',(select to_jsonb(x) from public.profiles x where id=auth.uid()),'project_versions',coalesce((select jsonb_agg(x) from public.project_versions x where owner_id=auth.uid()),'[]'::jsonb),'presets',coalesce((select jsonb_agg(x) from public.presets x where owner_id=auth.uid()),'[]'::jsonb),'reviews',coalesce((select jsonb_agg(x) from public.reviews x where user_id=auth.uid()),'[]'::jsonb),'favorites',coalesce((select jsonb_agg(x) from public.favorites x where user_id=auth.uid()),'[]'::jsonb),'reports',coalesce((select jsonb_agg(x) from public.reports x where reporter_id=auth.uid()),'[]'::jsonb),'asset_rights',coalesce((select jsonb_agg(x) from public.asset_rights x where owner_id=auth.uid()),'[]'::jsonb))
$$;
grant execute on function public.export_my_data() to authenticated;

create or replace function public.delete_my_account() returns void language plpgsql security definer set search_path=public,auth as $$
declare u uuid:=auth.uid();begin if u is null then raise exception 'authentication required';end if;delete from auth.users where id=u;end$$;
grant execute on function public.delete_my_account() to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('project-assets','project-assets',false,104857600,null) on conflict(id) do update set public=false,file_size_limit=104857600;
drop policy if exists project_assets_read on storage.objects; create policy project_assets_read on storage.objects for select to authenticated using(bucket_id='project-assets' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists project_assets_insert on storage.objects; create policy project_assets_insert on storage.objects for insert to authenticated with check(bucket_id='project-assets' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists project_assets_update on storage.objects; create policy project_assets_update on storage.objects for update to authenticated using(bucket_id='project-assets' and (storage.foldername(name))[1]=auth.uid()::text) with check(bucket_id='project-assets' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists project_assets_delete on storage.objects; create policy project_assets_delete on storage.objects for delete to authenticated using(bucket_id='project-assets' and (storage.foldername(name))[1]=auth.uid()::text);
