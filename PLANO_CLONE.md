# Plano de clone — Turismo Aventura Santos

**Domínio:** https://turismoaventurasantos.com.br  
**Repo:** https://github.com/LucianoOtero/turismoaventurasantos  
**Data:** 22/10/2026  

Este documento une (1) a auditoria do site atual e (2) a filosofia dos sites irmãos (`voolivresaovicente.com.br`, `parapentesantos.com.br` / `santosparapente.com.br`, `windcoast.com.br`).

---

## 1. Veredito

O site atual é uma **landing HTML one-page** na Hostinger (sem sitemap, SEO, endereço ou FAQ). Os peers da mesma rampa (CVLLP / Morro do Itararé) já estão em **Next.js + Vercel**.

**Filosofia oficial do grupo:** Lovable (Vite) → **Next.js App Router + Tailwind 4 + Supabase + Vercel**, com conteúdo centralizado e WhatsApp como CTA.

**Template a clonar:** [`parapentesantos-next`](https://github.com/LucianoOtero/parapentesantos-next)  
(O próprio [`windcoast-next`](https://github.com/LucianoOtero/windcoast-next) partiu dele. Use [`voolivre-sao-vicente`](https://github.com/LucianoOtero/voolivre-sao-vicente) só se precisar de landings Ads/CRM multi-piloto.)

---

## 2. Site atual — o que existe hoje

| Aspecto | Estado |
|---------|--------|
| Arquitetura | One-page estática (~52 KB HTML + CSS/JS inline) |
| Hosting | Hostinger / LiteSpeed / PHP 8.2 |
| Páginas internas | Nenhuma (`/precos`, `/contato`, etc. = 404) |
| SEO | Só `<title>`; sem description, OG, schema, sitemap, robots, favicon |
| CTA | Só WhatsApp `13 99765-7796` (`wa.me/5513997657796`) — **mesmo número** de Voo Livre SV e Parapente Santos |
| Preços | Voo VIP **R$ 400**; Voo Premium **“consulte”** (+ fotos/vídeos) |
| Mídia | Logo + galeria `1–8,10` + hero `rampa2.jpg` + 3 YouTube (`@montanha.voolivre`) |
| Tracking | Google Ads `AW-16981690402` |
| Endereço / horário | **Ausentes** no site |
| Regras CVLLP | Bloco legal completo (preservar) |

### Seções atuais (ordem)

1. Header (logo)  
2. Hero — “Voo Livre em Santos”  
3. Galeria de voos  
4. Pacotes (VIP / Premium)  
5. Benefícios (vistas / instrutor / equipamentos)  
6. Vídeos YouTube  
7. Depoimentos (3 — nomes genéricos; validar)  
8. Redes sociais (`Montanha.voolivre`)  
9. Contato + observações de segurança  
10. Footer © 2025  

### Identidade

- Marca: **Turismo Aventura Santos**  
- Piloto / redes: **Montanha** (Marco Antonelli) — Instagram/TikTok/YouTube `@montanha.voolivre`  
- Paleta atual: azul `#0f4c81` / `#4ba3c3`, laranja `#f47d4c`, amarelo `#ffd166`  
- Hashtag: `#TurismoAventuraSantos`  

### Conteúdo legal a preservar (quase literal)

- Idade mínima 14 anos com documento  
- Proibido traje de banho e calçados inadequados; obrigatório tênis/solado emborrachado  
- Duração 3–20 minutos (clima / movimento no clube)  
- Proibido voo triplo  
- Incluso: taxa CVLLP, seguro, EQPS homologados, piloto certificado  
- CVLLP não responde por fotos/vídeos dos pilotos  
- Base: **RBAC 103** + **Lei Municipal 2656-A (PMSV)**  

---

## 3. Filosofia dos sites de referência

### Stack comum (linha `-next`)

| Camada | Padrão |
|--------|--------|
| Framework | Next.js 16 App Router |
| UI | Tailwind CSS v4 (sem shadcn na linha limpa) |
| Tipagem | TypeScript |
| Backend | Supabase (leads, cliques WA, admin) |
| Hosting | Vercel (`www`, preview por PR) |
| Mídia | `next/image`, WebP/AVIF, hls.js (webcam) |
| Fontes | Archivo auto-hospedada |
| WhatsApp | Rota `/whatsapp` (log + redirect `wa.me`) |
| SEO | `metadata`, `sitemap.ts`, `robots.ts`, JSON-LD a partir de `site.ts` |
| Indexação | `NEXT_PUBLIC_ALLOW_INDEXING=true` só no domínio oficial |

### Princípios

1. **Conteúdo é código** — preço, WhatsApp, endereço, limites e horário só em `src/content/site.ts` (não duplicar).  
2. **CTA único** — WhatsApp “Agendar”; clique passa por `/whatsapp` (atribuição).  
3. **Tom local** — Morro do Itararé, São Vicente a minutos de Santos; reagenda se o tempo não der.  
4. **SEO local Baixada** — Santos / São Vicente / Praia Grande; schema LocalBusiness + Service + FAQ; **sem** `aggregateRating` inventado.  
5. **Design editorial** — hero full-bleed, tipografia forte, marca como sinal hero-level; sem cards no hero.  
6. **Cutover** — DNS Vercel → matar canônica antiga → GSC → GBP → backlink CVLLP.  

### Diferença dos 3 peers

| | Voo Livre SV | Parapente Santos | Wind Coast |
|--|--------------|------------------|------------|
| Produto | Multi-piloto tandem | Instrutor Bianchi, tandem | Escola (curso) |
| Repo | `voolivre-sao-vicente` → `site-novo/` | **`parapentesantos-next`** | `windcoast-next` |
| Preço tip. | 400 / 550 / 650 | Idem | Curso R$ 4.000 |
| Por que importa p/ TAS | Landings Ads + CRM | **Melhor template tandem** | Só se virar escola |

Rampa comum: **R. Cinco, 1210 — Morro do Itararé, São Vicente — SP**.

---

## 4. Arquitetura alvo do clone

### Estrutura de pastas (espelhar `parapentesantos-next`)

```
src/
  app/                 # rotas, robots, sitemap, whatsapp/route
  assets/              # fotos, logo
  components/          # chrome, hero, forms, webcam, consentimento
  content/
    site.ts            # FONTE ÚNICA do negócio
    home.ts            # nav, etapas, FAQ
    depoimentos.ts
  fonts/               # Archivo woff2
  lib/                 # metadata, structured-data, supabase, atribuição
supabase/              # migrations
```

### Rotas mínimas (MVP)

| Rota | Função |
|------|--------|
| `/` | Home (seções de conversão) |
| `/precos` | Pacotes transparentes |
| `/como-e-o-voo` | Experiência / como funciona |
| `/seguranca` | Regras CVLLP + RBAC (texto preservado) |
| `/duvidas` | FAQ |
| `/como-chegar` | Mapa Itararé + horários |
| `/instrutor` | Página Montanha (diferenciação) |
| `/agendar` | CTA + form lead |
| `/whatsapp` | Log + redirect |
| `/privacidade` | LGPD |
| `/robots.ts` / `/sitemap.ts` | SEO técnico |

### Rotas SEO opcionais (fase 2, padrão Voo Livre)

- `/voo-de-parapente-santos`  
- `/voo-livre-santos`  
- `/quanto-custa-voo-de-parapente`  

### Home — ordem de seções sugerida

1. **Hero** — marca Turismo Aventura Santos + H1 + 1 frase + CTA WhatsApp + imagem full-bleed (sem cards/overlays)  
2. Prova rápida (anos / voos / certificação — só fatos confirmados)  
3. Sobre / local (Itararé ↔ Santos)  
4. Instrutor Montanha  
5. Como funciona (4 passos)  
6. Preços (3 tiers se possível; senão 2 + faixa)  
7. Galeria + vídeos  
8. Depoimentos (preferir Google reais)  
9. FAQ resumido  
10. CVLLP / regras  
11. Contato + barra WhatsApp  

---

## 5. Conteúdo comercial — preservar vs modernizar

### Preservar

- Nome da marca e logo  
- WhatsApp `13 99765-7796`  
- Âncora **R$ 400**  
- Upsell com fotos/vídeos  
- Galeria, YouTube, redes Montanha  
- Bloco legal CVLLP/RBAC  
- Google Ads `AW-16981690402` (reconfigurar na Vercel)  
- Hashtag `#TurismoAventuraSantos`  

### Confirmar com o cliente antes de publicar

| Item | Pergunta |
|------|----------|
| Endereço | Publicar R. Cinco, 1210 / Itararé? |
| Horário | 10h–18h (padrão peers)? |
| Premium | Valor fixo (ex.: 550) ou faixa? Existe 360º (650)? |
| Depoimentos | Substituir por reviews Google reais? |
| Relação com Voo Livre SV | Marca pessoal do Montanha vs landing do grupo? |
| Nome do piloto | “Montanha” / Marco Antonelli no H1 da página instrutor? |

### Não copiar cegamente

- Depoimentos genéricos sem verificação  
- Naming “VIP/Premium” se o mercado local padronizou Básico / Premium / 360º  
- Omitir que a decolagem é em **São Vicente** (marketing pode dizer Santos; operação deve ser clara)  

---

## 6. Fases de execução

### Fase 0 — Setup (1 sessão)

1. Copiar árvore de `parapentesantos-next` para este repo (ou `git remote` + cherry-pick da estrutura).  
2. Renomear package/`SITE_URL` → `https://www.turismoaventurasantos.com.br`.  
3. `ALLOW_INDEXING` desligado até o cutover.  
4. Deploy preview na Vercel ligado a este repo.  

### Fase 1 — Conteúdo e brand (MVP conversão)

1. Reescrever `src/content/site.ts` e `home.ts`.  
2. Trocar logo, fotos, paleta (refinar azul/laranja TAS).  
3. Página instrutor Montanha + redes.  
4. Migrar regras de segurança para `/seguranca`.  
5. Rota `/whatsapp` + Supabase (leads/cliques).  
6. Migrar gtag Ads.  

### Fase 2 — SEO e prova social

1. Meta, OG, JSON-LD, sitemap, robots, favicon.  
2. FAQ completo + landings locais se houver demanda Ads.  
3. Reviews Google (ou remoção dos fictícios).  
4. Webcam `/condicoes-hoje` (opcional, padrão peers).  

### Fase 3 — Cutover

1. DNS Hostinger → Vercel (`www` canônico; apex redirect).  
2. `NEXT_PUBLIC_ALLOW_INDEXING=true`.  
3. GSC + pedir indexação; atualizar GBP se houver.  
4. Pedir backlink no site do CVLLP.  
5. Desligar / arquivar HTML antigo na Hostinger.  
6. Checklist PSI / mobile / Core Web Vitals.  

---

## 7. Critérios de pronto

- [ ] Hero: marca dominante + 1 H1 + 1 frase + CTA + imagem full-bleed  
- [ ] Preço R$ 400 visível; Premium com valor ou faixa explícita  
- [ ] WhatsApp com tracking via `/whatsapp`  
- [ ] Endereço e horário publicados (se autorizados)  
- [ ] Regras CVLLP intactas  
- [ ] SEO técnico (title, description, OG, schema, sitemap, robots)  
- [ ] Preview Vercel OK; produção só após cutover  
- [ ] Sem depoimentos inventados no ar  

---

## 8. Fontes

- Site atual: https://turismoaventurasantos.com.br  
- Template: https://github.com/LucianoOtero/parapentesantos-next  
- Clone anterior do template: https://github.com/LucianoOtero/windcoast-next  
- Ops/Ads/landings: https://github.com/LucianoOtero/voolivre-sao-vicente  
- Peers ao vivo: voolivresaovicente.com.br · santosparapente.com.br · windcoast.com.br  

---

## 9. Próximo passo sugerido

Com autorização: **scaffolding a partir de `parapentesantos-next`** neste repo e preenchimento de `site.ts` com os dados confirmados do Turismo Aventura Santos / Montanha.
