-- Parapente Santos — esquema inicial do projeto Supabase novo.
--
-- Quem grava: só o servidor do site, com a chave secreta (papel service_role,
-- que ignora RLS). Não há política de escrita para anon nem authenticated.
-- Quem lê e apaga: usuários autenticados com o papel admin, pelo painel.

create type public.app_role as enum ('admin');

-- Pedidos de contato enviados pelo formulário.
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null check (char_length(nome) between 2 and 100),
  celular text not null check (celular ~ '^[0-9]{10,13}$'),
  email text check (email is null or char_length(email) between 5 and 255),
  data_desejada date,
  codigo_desconto text check (codigo_desconto is null or char_length(codigo_desconto) <= 60),
  origem text not null default 'formulario'
    check (origem in ('formulario', 'whatsapp', 'telefone', 'email', 'importado')),
  pagina text check (pagina is null or char_length(pagina) <= 200),
  gclid text check (gclid is null or char_length(gclid) <= 255),
  gbraid text check (gbraid is null or char_length(gbraid) <= 255),
  wbraid text check (wbraid is null or char_length(wbraid) <= 255),
  utm_source text check (utm_source is null or char_length(utm_source) <= 255),
  utm_medium text check (utm_medium is null or char_length(utm_medium) <= 255),
  utm_campaign text check (utm_campaign is null or char_length(utm_campaign) <= 255),
  ambiente text not null default 'producao' check (ambiente in ('producao', 'preview'))
);

create index leads_created_at_idx on public.leads (created_at desc);

-- Cliques em WhatsApp, telefone e e-mail: o contato direto não pede dados,
-- então o que se registra é o clique e de onde ele veio.
create table public.cliques (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  canal text not null check (canal in ('whatsapp', 'telefone', 'email')),
  pagina text check (pagina is null or char_length(pagina) <= 200),
  gclid text check (gclid is null or char_length(gclid) <= 255),
  gbraid text check (gbraid is null or char_length(gbraid) <= 255),
  wbraid text check (wbraid is null or char_length(wbraid) <= 255),
  utm_source text check (utm_source is null or char_length(utm_source) <= 255),
  utm_medium text check (utm_medium is null or char_length(utm_medium) <= 255),
  utm_campaign text check (utm_campaign is null or char_length(utm_campaign) <= 255),
  ambiente text not null default 'producao' check (ambiente in ('producao', 'preview'))
);

create index cliques_created_at_idx on public.cliques (created_at desc);

-- Papéis em tabela própria, nunca no perfil do usuário.
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

create function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated, service_role;

alter table public.leads enable row level security;
alter table public.cliques enable row level security;
alter table public.user_roles enable row level security;

create policy "Admins leem leads" on public.leads
  for select to authenticated
  using (public.has_role((select auth.uid()), 'admin'));

create policy "Admins apagam leads" on public.leads
  for delete to authenticated
  using (public.has_role((select auth.uid()), 'admin'));

create policy "Admins leem cliques" on public.cliques
  for select to authenticated
  using (public.has_role((select auth.uid()), 'admin'));

create policy "Cada usuario le o proprio papel" on public.user_roles
  for select to authenticated
  using (user_id = (select auth.uid()));
