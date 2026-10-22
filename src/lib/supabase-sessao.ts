import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Cliente com a sessão de quem está logado (cookies) e a chave publicável:
// tudo o que ele lê ou apaga passa pelas políticas de RLS do banco.
export async function supabaseSessao() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;

  const jar = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll: () => jar.getAll(),
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => jar.set(name, value, options));
        } catch {
          // Em Server Component não dá para gravar cookie; quem renova a
          // sessão é o proxy.
        }
      },
    },
  });
}
