import "server-only";
import { redirect } from "next/navigation";
import { supabaseSessao } from "@/lib/supabase-sessao";

export type Ambiente = "producao" | "preview";

export const ambienteDaBusca = (valor: unknown): Ambiente =>
  valor === "preview" ? "preview" : "producao";

// Porta de entrada de tudo o que é do painel: página, exportação e ações.
// Além desta checagem, o banco só entrega dados a quem tem o papel admin.
export async function exigirAdmin() {
  const supabase = await supabaseSessao();
  if (!supabase) redirect("/admin/entrar?erro=config");

  const { data } = await supabase.auth.getClaims();
  const id = data?.claims?.sub;
  if (!id) redirect("/admin/entrar");

  const { data: papel } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", id)
    .eq("role", "admin")
    .maybeSingle();
  if (!papel) redirect("/admin/entrar?erro=acesso");

  const email = typeof data.claims.email === "string" ? data.claims.email : "";
  return { supabase, email };
}
