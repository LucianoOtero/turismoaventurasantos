import type { Metadata } from "next";
import { ContentPage, H2, P } from "@/components/content-page";
import { Turnstile } from "@/components/turnstile";
import { site, whatsappHref } from "@/content/site";
import { enviarPedido } from "./actions";
import { og } from "@/lib/metadata";

const PATH = "/agendar";

export const metadata: Metadata = {
  title: "Agendar voo de parapente",
  description:
    "Agende seu voo duplo de parapente em São Vicente pelo WhatsApp ou deixe seu contato para o piloto chamar você.",
  alternates: { canonical: PATH },
  openGraph: og(PATH),
};

// Só existe em produção: nos previews o endereço muda a cada branch e o
// widget recusaria o domínio.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const ERROS: Record<string, string> = {
  dados: "Confira o nome e o número de WhatsApp, com DDD, e envie de novo.",
  envio: "Não foi possível registrar o pedido agora. Chame direto no WhatsApp, por favor.",
  verificacao:
    "Não deu para confirmar que o envio veio de uma pessoa. Tente de novo ou chame direto no WhatsApp.",
};

const campo =
  "mt-2 block w-full rounded-[2px] border border-ink/30 bg-paper px-4 py-3 text-ink";

export default async function Agendar({ searchParams }: PageProps<"/agendar">) {
  const { erro } = await searchParams;
  const mensagemErro = typeof erro === "string" ? ERROS[erro] : undefined;

  return (
    <ContentPage
      path={PATH}
      label="Agendamento"
      title="Agendar voo de parapente"
      lead={`O jeito mais rápido é o WhatsApp. Se preferir, deixe seu contato e o ${site.instructor.name} chama você.`}
      relacionadas={[
        { href: "/precos", label: "Preços" },
        { href: "/duvidas", label: "Dúvidas" },
        { href: "/condicoes-hoje", label: "Câmera ao vivo da rampa" },
      ]}
    >
      <H2>Pelo WhatsApp</H2>
      <P>
        {site.hours.label}. {site.hours.note}
      </P>
      <p className="mt-6">
        <a href={whatsappHref()} rel="nofollow" className="btn">
          Abrir conversa no WhatsApp
        </a>
      </p>

      <H2>Prefere que a gente chame?</H2>
      <P>Só o nome e o WhatsApp são necessários.</P>

      {mensagemErro && (
        <p role="alert" className="mt-6 border-l-2 border-signal bg-fog px-4 py-3 font-semibold">
          {mensagemErro}
        </p>
      )}

      <form action={enviarPedido} className="mt-6 max-w-md space-y-5">
        <div>
          <label htmlFor="nome" className="font-semibold">
            Nome
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            className={campo}
          />
        </div>
        <div>
          <label htmlFor="celular" className="font-semibold">
            WhatsApp, com DDD
          </label>
          <input
            id="celular"
            name="celular"
            type="tel"
            required
            minLength={10}
            maxLength={20}
            autoComplete="tel-national"
            placeholder="(13) 99999-9999"
            className={campo}
          />
        </div>
        <div>
          <label htmlFor="data" className="font-semibold">
            Data desejada <span className="font-normal text-muted">(opcional)</span>
          </label>
          <input id="data" name="data" type="date" className={campo} />
        </div>
        {/* Campo-isca contra robôs: fora da tela e fora da ordem de tabulação. */}
        <div aria-hidden="true" className="absolute left-[-9999px]">
          <label htmlFor="site">Não preencha este campo</label>
          <input id="site" name="site" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
        <button type="submit" className="btn btn-dark cursor-pointer">
          Enviar pedido
        </button>
      </form>
    </ContentPage>
  );
}
