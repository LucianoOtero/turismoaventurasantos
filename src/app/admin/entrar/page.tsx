import { site } from "@/content/site";
import { entrar } from "../actions";

const ERROS: Record<string, string> = {
  dados: "E-mail ou senha incorretos.",
  acesso: "Esta conta não tem acesso ao painel.",
  config: "O painel não está configurado neste ambiente.",
};

const campo =
  "mt-2 block w-full rounded-[2px] border border-ink/30 bg-paper px-4 py-3 text-ink";

export default async function Entrar({ searchParams }: PageProps<"/admin/entrar">) {
  const { erro } = await searchParams;
  const mensagemErro = typeof erro === "string" ? ERROS[erro] : undefined;

  return (
    <main className="mx-auto max-w-sm px-5 py-20">
      <p className="t-label text-muted">{site.name}</p>
      <h1 className="t-statement mt-3">Painel</h1>

      {mensagemErro && (
        <p role="alert" className="mt-6 border-l-2 border-signal bg-paper px-4 py-3 font-semibold">
          {mensagemErro}
        </p>
      )}

      <form action={entrar} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="font-semibold">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            className={campo}
          />
        </div>
        <div>
          <label htmlFor="senha" className="font-semibold">
            Senha
          </label>
          <input
            id="senha"
            name="senha"
            type="password"
            required
            autoComplete="current-password"
            className={campo}
          />
        </div>
        <button type="submit" className="btn btn-dark cursor-pointer">
          Entrar
        </button>
      </form>
    </main>
  );
}
