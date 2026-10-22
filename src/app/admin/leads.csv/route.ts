import type { NextRequest } from "next/server";
import { ambienteDaBusca, exigirAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

const COLUNAS = [
  "created_at",
  "nome",
  "celular",
  "email",
  "data_desejada",
  "origem",
  "pagina",
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
] as const;

// Aspas dobradas e, para planilhas, apóstrofo antes de valores que
// começariam uma fórmula.
function celula(valor: unknown) {
  let s = valor == null ? "" : String(valor);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replaceAll('"', '""')}"`;
}

export async function GET(request: NextRequest) {
  const { supabase } = await exigirAdmin();
  const ambiente = ambienteDaBusca(request.nextUrl.searchParams.get("ambiente"));

  const { data, error } = await supabase
    .from("leads")
    .select(COLUNAS.join(", "))
    .eq("ambiente", ambiente)
    .order("created_at", { ascending: false })
    .limit(10000);
  if (error) return new Response("Falha ao ler os pedidos.", { status: 500 });

  const linhas = (data as unknown as Record<string, unknown>[]).map((l) =>
    COLUNAS.map((c) => celula(l[c])).join(";"),
  );
  // BOM para o Excel abrir os acentos corretamente.
  const csv = "﻿" + [COLUNAS.join(";"), ...linhas].join("\r\n");
  const dia = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="pedidos-${dia}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
