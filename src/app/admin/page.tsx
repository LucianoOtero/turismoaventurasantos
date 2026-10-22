import Link from "next/link";
import { site } from "@/content/site";
import { ambienteDaBusca, exigirAdmin } from "@/lib/admin";
import { apagarLead, sair } from "./actions";

// Sempre montada na hora: depende da sessão e nunca pode ir para o cache.
export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  created_at: string;
  nome: string;
  celular: string;
  data_desejada: string | null;
  origem: string;
  pagina: string | null;
  gclid: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
};

type Clique = {
  created_at: string;
  pagina: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
};

const DIA_MS = 86_400_000;

const dataHora = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const dataSimples = (iso: string) => iso.split("-").reverse().join("/");

const celularFormatado = (n: string) =>
  n.length === 11
    ? `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`
    : n.length === 10
      ? `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`
      : n;

const campanha = (l: Lead) =>
  [l.gclid ? "Google Ads" : null, l.utm_source, l.utm_campaign].filter(Boolean).join(" · ");

export default async function Painel({ searchParams }: PageProps<"/admin">) {
  const { supabase, email } = await exigirAdmin();
  const ambiente = ambienteDaBusca((await searchParams).ambiente);

  const agora = new Date();
  const desde30 = new Date(agora.getTime() - 30 * DIA_MS).toISOString();
  const desde7 = new Date(agora.getTime() - 7 * DIA_MS).toISOString();

  const [leadsRes, cliquesRes] = await Promise.all([
    supabase
      .from("leads")
      .select(
        "id, created_at, nome, celular, data_desejada, origem, pagina, gclid, utm_source, utm_campaign",
      )
      .eq("ambiente", ambiente)
      .order("created_at", { ascending: false })
      .limit(500),
    supabase
      .from("cliques")
      .select("created_at, pagina, gclid, gbraid, wbraid")
      .eq("ambiente", ambiente)
      .eq("canal", "whatsapp")
      .gte("created_at", desde30)
      .order("created_at", { ascending: false })
      .limit(5000),
  ]);

  const leads = (leadsRes.data ?? []) as Lead[];
  const cliques = (cliquesRes.data ?? []) as Clique[];
  const falha = leadsRes.error || cliquesRes.error;

  const porPagina = new Map<string, number>();
  for (const c of cliques) {
    const chave = c.pagina ?? "(desconhecida)";
    porPagina.set(chave, (porPagina.get(chave) ?? 0) + 1);
  }
  const paginas = [...porPagina.entries()].sort((a, b) => b[1] - a[1]);

  const desde = (iso: string, limite: string) => new Date(iso) >= new Date(limite);
  const numeros = [
    {
      rotulo: "Cliques no WhatsApp · 7 dias",
      valor: cliques.filter((c) => desde(c.created_at, desde7)).length,
    },
    { rotulo: "Cliques no WhatsApp · 30 dias", valor: cliques.length },
    {
      rotulo: "Vindos de anúncio · 30 dias",
      valor: cliques.filter((c) => c.gclid || c.gbraid || c.wbraid).length,
    },
    {
      rotulo: "Pedidos pelo formulário · 30 dias",
      valor: leads.filter((l) => desde(l.created_at, desde30)).length,
    },
  ];

  const outro = ambiente === "producao" ? "preview" : "producao";

  return (
    <>
      <header className="bg-ink text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <p className="t-label text-[0.9375rem] tracking-[0.08em]">Painel · {site.name}</p>
          <form action={sair} className="flex items-center gap-4">
            <span className="t-small text-white/70">{email}</span>
            <button type="submit" className="t-label cursor-pointer underline underline-offset-4">
              Sair
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">
        {ambiente === "preview" && (
          <p className="mb-8 border-l-2 border-signal bg-paper px-4 py-3 font-semibold">
            Mostrando registros de teste (previews). Eles não contam como contatos reais.
          </p>
        )}
        {falha && (
          <p role="alert" className="mb-8 border-l-2 border-signal bg-paper px-4 py-3 font-semibold">
            Não foi possível ler os dados agora. Recarregue a página.
          </p>
        )}

        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {numeros.map((n) => (
            <div key={n.rotulo} className="bg-paper p-5">
              <dt className="t-label text-muted">{n.rotulo}</dt>
              <dd className="t-figure mt-3">{n.valor.toLocaleString("pt-BR")}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="t-statement">Pedidos de contato</h1>
            <a
              href={`/admin/leads.csv?ambiente=${ambiente}`}
              className="t-label underline underline-offset-4"
            >
              Exportar CSV
            </a>
          </div>

          {leads.length === 0 ? (
            <p className="mt-6 bg-paper p-5 text-muted">Nenhum pedido registrado.</p>
          ) : (
            <div className="mt-6 overflow-x-auto bg-paper">
              <table className="t-small w-full text-left">
                <thead className="border-b border-rule">
                  <tr>
                    {["Recebido", "Nome", "WhatsApp", "Data desejada", "Origem"].map((c) => (
                      <th key={c} scope="col" className="t-label px-4 py-3 text-muted">
                        {c}
                      </th>
                    ))}
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="border-b border-rule align-top last:border-0">
                      <td className="whitespace-nowrap px-4 py-3">
                        {dataHora.format(new Date(l.created_at))}
                      </td>
                      <td className="px-4 py-3 font-semibold">{l.nome}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <a
                          href={`https://wa.me/55${l.celular}`}
                          className="underline underline-offset-4"
                        >
                          {celularFormatado(l.celular)}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {l.data_desejada ? dataSimples(l.data_desejada) : "—"}
                      </td>
                      <td className="px-4 py-3">
                        {l.origem}
                        {campanha(l) && <span className="block text-muted">{campanha(l)}</span>}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <details>
                          <summary className="underline underline-offset-4">Apagar</summary>
                          <form action={apagarLead} className="mt-2">
                            <input type="hidden" name="id" value={l.id} />
                            <button
                              type="submit"
                              className="cursor-pointer font-semibold underline underline-offset-4"
                            >
                              Confirmar exclusão
                            </button>
                          </form>
                        </details>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-12">
          <h2 className="t-statement">Cliques no WhatsApp por página</h2>
          <p className="mt-2 text-muted">Últimos 30 dias.</p>
          {paginas.length === 0 ? (
            <p className="mt-6 bg-paper p-5 text-muted">Nenhum clique registrado no período.</p>
          ) : (
            <div className="mt-6 max-w-xl bg-paper">
              <table className="t-small w-full text-left">
                <tbody>
                  {paginas.map(([pagina, total]) => (
                    <tr key={pagina} className="border-b border-rule last:border-0">
                      <th scope="row" className="px-4 py-3 font-normal">
                        {pagina}
                      </th>
                      <td className="px-4 py-3 text-right font-semibold">
                        {total.toLocaleString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <p className="t-small mt-12 text-muted">
          <Link href={`/admin?ambiente=${outro}`} className="underline underline-offset-4">
            {outro === "preview" ? "Ver registros de teste" : "Voltar aos registros reais"}
          </Link>
        </p>
      </main>
    </>
  );
}
