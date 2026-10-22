import "server-only";

const VERIFICACAO = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Confere no servidor o resultado do Turnstile. Sem a chave secreta (previews,
// desenvolvimento) a verificação não existe e o envio segue.
export async function verificarHumano(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  try {
    const resposta = await fetch(VERIFICACAO, {
      method: "POST",
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(5000),
    });
    const resultado: { success?: boolean } = await resposta.json();
    return resultado.success === true;
  } catch {
    return false;
  }
}
