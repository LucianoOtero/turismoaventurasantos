import "server-only";
import { createClient } from "@supabase/supabase-js";

// Cliente com a chave secreta: só existe no servidor e ignora RLS.
// Devolve null se as variáveis não estiverem configuradas, para que o site
// continue funcionando (o WhatsApp abre mesmo sem registro).
export function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Previews gravam com marca própria, para não se misturar com os dados reais.
export const ambiente = () =>
  process.env.VERCEL_ENV === "production" ? "producao" : "preview";
