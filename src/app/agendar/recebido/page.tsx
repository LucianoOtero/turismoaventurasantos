import type { Metadata } from "next";
import { A, ContentPage, P } from "@/components/content-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Pedido recebido",
  robots: { index: false, follow: false },
};

export default function Recebido() {
  return (
    <ContentPage
      path="/agendar/recebido"
      label="Agendamento"
      title="Pedido recebido"
      lead={`O ${site.instructor.name} vai chamar você no WhatsApp para combinar o dia e o horário.`}
      relacionadas={[
        { href: "/como-e-o-voo", label: "Como é o voo" },
        { href: "/como-chegar", label: "Como chegar" },
        { href: "/duvidas", label: "Dúvidas" },
      ]}
    >
      <P>
        Enquanto isso, veja <A href="/como-e-o-voo">como é o voo</A> e o que
        levar no dia. {site.weatherPolicy}
      </P>
    </ContentPage>
  );
}
