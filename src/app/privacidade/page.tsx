import type { Metadata } from "next";
import { A, ContentPage, H2, Lista, P } from "@/components/content-page";
import { PreferenciasCookies } from "@/components/consentimento";
import { site } from "@/content/site";
import { og } from "@/lib/metadata";

const PATH = "/privacidade";

export const metadata: Metadata = {
  title: "Privacidade e cookies",
  description:
    "Quais dados o site do Turismo Aventura Santos registra, para que servem e como pedir a exclusão.",
  alternates: { canonical: PATH },
  openGraph: og(PATH),
};

export default function Privacidade() {
  return (
    <ContentPage
      path={PATH}
      label="Privacidade"
      title="Privacidade e cookies"
      lead="O site registra o mínimo necessário para atender quem quer voar e para saber quantas pessoas o visitam. Aqui está o que é guardado e por quê."
      relacionadas={[
        { href: "/agendar", label: "Agendar" },
        { href: "/duvidas", label: "Dúvidas" },
      ]}
    >
      <H2>Pedido de contato</H2>
      <P>
        Quando você envia o formulário de <A href="/agendar">agendamento</A>,
        guardamos o nome, o número de WhatsApp e a data desejada, se informada.
        Esses dados servem só para o {site.instructor.name} chamar você e
        combinar o voo. O pedido também é avisado a ele por e-mail.
      </P>

      <H2>Clique no WhatsApp e no telefone</H2>
      <P>
        Ao tocar no botão do WhatsApp, o site registra que houve um clique, a
        página em que você estava e, se você chegou por um anúncio, o código
        desse anúncio. Não registramos nome, número nem endereço IP nesse
        clique. A conversa em si acontece no WhatsApp, fora do site.
      </P>

      <H2>Cookies e Google Analytics</H2>
      <P>
        O site só usa cookies de medição se você aceitar no aviso que aparece
        na primeira visita. Com o aceite, o Google Analytics conta as visitas e
        as páginas vistas. Os sinais de publicidade ficam desligados. Sem o
        aceite, nada é enviado ao Google.
      </P>
      <P>
        Você pode mudar de ideia quando quiser: <PreferenciasCookies />.
      </P>

      <H2>Quem processa os dados</H2>
      <Lista
        itens={[
          "Vercel: hospedagem do site, que mantém registros técnicos de acesso.",
          "Supabase: banco de dados onde ficam os pedidos de contato e os cliques.",
          "Google Analytics: medição de visitas, somente com o seu aceite.",
          "Cloudflare Turnstile: verificação contra robôs na página de agendamento, que analisa sinais do navegador para liberar o envio do formulário.",
          "Clube de Voo Livre do Litoral Paulista: a câmera ao vivo da rampa é transmitida pelo servidor do clube, que recebe a conexão do seu navegador quando você inicia o vídeo.",
        ]}
      />

      <H2>Seus direitos</H2>
      <P>
        Você pode pedir para ver, corrigir ou apagar os dados que enviou. Escreva
        para <A href={`mailto:${site.contact.email}`}>{site.contact.email}</A>{" "}
        ou chame no WhatsApp {site.contact.phoneDisplay}.
      </P>
    </ContentPage>
  );
}
