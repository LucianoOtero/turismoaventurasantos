"use server";

import { redirect } from "next/navigation";
import { notificarPedido } from "@/lib/notificacao";
import { ambiente, supabaseServer } from "@/lib/supabase-server";
import { verificarHumano } from "@/lib/turnstile";

const texto = (valor: FormDataEntryValue | null) =>
  typeof valor === "string" ? valor.trim() : "";

export async function enviarPedido(formData: FormData) {
  // Campo-isca: gente não vê nem preenche. Robô recebe a tela de sucesso.
  if (texto(formData.get("site"))) redirect("/agendar/recebido");

  const nome = texto(formData.get("nome"));
  let celular = texto(formData.get("celular")).replace(/\D/g, "");
  if (celular.length > 11 && celular.startsWith("55")) celular = celular.slice(2);
  const data = texto(formData.get("data"));
  const data_desejada = /^\d{4}-\d{2}-\d{2}$/.test(data) ? data : null;

  const valido =
    nome.length >= 2 && nome.length <= 100 && celular.length >= 10 && celular.length <= 11;
  if (!valido) redirect("/agendar?erro=dados");

  const humano = await verificarHumano(texto(formData.get("cf-turnstile-response")));
  if (!humano) redirect("/agendar?erro=verificacao");

  const supabase = supabaseServer();
  if (!supabase) redirect("/agendar?erro=envio");

  const { error } = await supabase.from("leads").insert({
    nome,
    celular,
    data_desejada,
    origem: "formulario",
    pagina: "/agendar",
    ambiente: ambiente(),
  });
  if (error) redirect("/agendar?erro=envio");

  await notificarPedido({ nome, celular, data_desejada });
  redirect("/agendar/recebido");
}
