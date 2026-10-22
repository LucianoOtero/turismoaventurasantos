import { NextResponse, type NextRequest } from "next/server";
import { whatsappMensagens, whatsappUrl } from "@/content/site";
import { atribuicaoDoReferer } from "@/lib/atribuicao";
import { ambiente, supabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const ROBOS = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|lighthouse|headless/i;
const TEMPO_MAXIMO_MS = 1500;

const ehChave = (valor: string): valor is keyof typeof whatsappMensagens =>
  valor in whatsappMensagens;

// Registra o clique e manda para a conversa. O registro nunca segura o
// visitante: se o banco demorar ou falhar, o WhatsApp abre do mesmo jeito.
export async function GET(request: NextRequest) {
  const chave = request.nextUrl.searchParams.get("m") ?? "agendar";
  const mensagem = ehChave(chave) ? whatsappMensagens[chave] : whatsappMensagens.agendar;

  const destino = NextResponse.redirect(whatsappUrl(mensagem), 302);
  destino.headers.set("Cache-Control", "no-store");
  destino.headers.set("X-Robots-Tag", "noindex, nofollow");

  const agente = request.headers.get("user-agent") ?? "";
  const supabase = supabaseServer();
  if (!supabase || ROBOS.test(agente)) return destino;

  const origem = atribuicaoDoReferer(
    request.headers.get("referer"),
    request.headers.get("host"),
  );

  try {
    await Promise.race([
      supabase.from("cliques").insert({ canal: "whatsapp", ambiente: ambiente(), ...origem }),
      new Promise((resolve) => setTimeout(resolve, TEMPO_MAXIMO_MS)),
    ]);
  } catch {
    // Falha de registro não impede o contato.
  }

  return destino;
}
