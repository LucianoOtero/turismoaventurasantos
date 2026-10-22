"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { exigirAdmin } from "@/lib/admin";
import { supabaseSessao } from "@/lib/supabase-sessao";

const texto = (valor: FormDataEntryValue | null) =>
  typeof valor === "string" ? valor.trim() : "";

export async function entrar(formData: FormData) {
  const email = texto(formData.get("email"));
  const senha = formData.get("senha");
  const password = typeof senha === "string" ? senha : "";
  if (!email || !password) redirect("/admin/entrar?erro=dados");

  const supabase = await supabaseSessao();
  if (!supabase) redirect("/admin/entrar?erro=config");

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/admin/entrar?erro=dados");

  redirect("/admin");
}

export async function sair() {
  const supabase = await supabaseSessao();
  await supabase?.auth.signOut();
  redirect("/admin/entrar");
}

export async function apagarLead(formData: FormData) {
  const { supabase } = await exigirAdmin();

  const id = texto(formData.get("id"));
  if (/^[0-9a-f-]{36}$/.test(id)) {
    await supabase.from("leads").delete().eq("id", id);
  }
  revalidatePath("/admin");
}
