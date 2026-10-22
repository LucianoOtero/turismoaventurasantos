const CAMPOS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
] as const;

type Campo = (typeof CAMPOS)[number];
type Atribuicao = { pagina: string | null } & Record<Campo, string | null>;

const limpar = (valor: string | null, max: number) => (valor ? valor.slice(0, max) : null);

const vazio = () =>
  Object.fromEntries(CAMPOS.map((c) => [c, null])) as Record<Campo, string | null>;

// Lê a página de origem e os parâmetros de anúncio da URL de onde veio o
// clique (cabeçalho Referer). Só vale para páginas do próprio site.
export function atribuicaoDoReferer(referer: string | null, host: string | null): Atribuicao {
  if (!referer) return { pagina: null, ...vazio() };

  try {
    const url = new URL(referer);
    if (host && url.host !== host) return { pagina: null, ...vazio() };

    const campos = vazio();
    for (const c of CAMPOS) campos[c] = limpar(url.searchParams.get(c), 255);

    return { pagina: limpar(url.pathname, 200), ...campos };
  } catch {
    return { pagina: null, ...vazio() };
  }
}
