# Turismo Aventura Santos

Novo website **turismoaventurasantos.com.br** — voo duplo de parapente / voo livre em Santos e São Vicente.

Base técnica: [`parapentesantos-next`](https://github.com/LucianoOtero/parapentesantos-next) (Next.js App Router + Tailwind 4 + Supabase + Vercel), com elementos de voo duplo também presentes em Voo Livre São Vicente. **Sem** conteúdo de curso da Wind Coast.

## Identidade

- **Logo:** `src/assets/logo-tas.jpeg` (site atual)
- **Cores:** azul `#0f4c81` / `#4ba3c3`, laranja `#f47d4c` / `#f9a03f`, amarelo `#ffd166`
- **Tipografia:** Bricolage Grotesque (títulos) + Manrope (texto)

## Rodar

```bash
npm install
npm run dev
```

Outros: `npm run lint`, `npm run typecheck`, `npm run build`.

## Onde ficam as coisas

- `src/content/site.ts` — fonte única (preços, contato, regras, vídeos)
- `src/content/home.ts` — nav, etapas, FAQ
- `src/app/` — rotas, sitemap, robots, `/whatsapp`
- `PLANO_CLONE.md` — plano de migração

## Variáveis de ambiente

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canônico. Padrão: `https://www.turismoaventurasantos.com.br` |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` só na produção do domínio oficial |

## Site atual

https://turismoaventurasantos.com.br
