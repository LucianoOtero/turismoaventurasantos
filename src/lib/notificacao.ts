import "server-only";
import { ambiente } from "@/lib/supabase-server";

type Pedido = { nome: string; celular: string; data_desejada: string | null };

const escapar = (texto: string) =>
  texto.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// Aviso por e-mail de um novo pedido. Só em produção e só se a chave do Resend
// e os endereços estiverem configurados; nunca derruba o envio do formulário.
export async function notificarPedido(pedido: Pedido) {
  const chave = process.env.RESEND_API_KEY;
  const de = process.env.LEAD_NOTIFY_FROM;
  const para = process.env.LEAD_NOTIFY_TO?.split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  if (!chave || !de || !para?.length || ambiente() !== "producao") return;

  const data = pedido.data_desejada ? escapar(pedido.data_desejada) : "não informada";

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${chave}` },
      body: JSON.stringify({
        from: de,
        to: para,
        subject: `Novo pedido de voo: ${pedido.nome.slice(0, 50)}`,
        html: [
          `<p><strong>Nome:</strong> ${escapar(pedido.nome)}</p>`,
          `<p><strong>WhatsApp:</strong> <a href="https://wa.me/55${pedido.celular}">${pedido.celular}</a></p>`,
          `<p><strong>Data desejada:</strong> ${data}</p>`,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(4000),
    });
  } catch {
    // O pedido já está gravado; o painel mostra mesmo sem o e-mail.
  }
}
