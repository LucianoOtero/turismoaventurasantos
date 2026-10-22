import type { Metadata } from "next";
import { A, ContentPage, H2, Lista, P } from "@/components/content-page";
import { formatBRL, site } from "@/content/site";
import { og } from "@/lib/metadata";

const PATH = "/quanto-custa-voo-de-parapente";

export const metadata: Metadata = {
  title: "Quanto custa um voo de parapente",
  description: `Voo VIP ${formatBRL(site.packages[0].price)}, Premium ${formatBRL(site.packages[1].price)} e 360º ${formatBRL(site.packages[2].price)}. Turismo Aventura Santos — Morro do Itararé.`,
  alternates: { canonical: PATH },
  openGraph: og(PATH),
};

export default function QuantoCusta() {
  return (
    <ContentPage
      path={PATH}
      label="Preços"
      title="Quanto custa um voo de parapente"
      lead={`No ${site.name}, o voo duplo parte de ${formatBRL(site.packages[0].price)}. A diferença entre os pacotes é o registro em foto e vídeo.`}
      relacionadas={[
        { href: "/precos", label: "Pacotes completos" },
        { href: "/voo-de-parapente-santos", label: "Voo em Santos" },
        { href: "/agendar", label: "Agendar" },
      ]}
    >
      <H2>Pacotes</H2>
      {site.packages.map((p) => (
        <div key={p.id} className="mt-8 border-t border-rule pt-6">
          <h3 className="t-h3">
            {p.name} — {formatBRL(p.price)}
          </h3>
          <Lista itens={[...p.includes]} />
        </div>
      ))}

      <H2>O que está incluso em todos</H2>
      <Lista
        itens={[
          "Briefing de segurança",
          "Taxa operacional do CVLLP",
          "Seguro (piloto e passageiro)",
          "Equipamentos homologados",
          "Piloto certificado",
        ]}
      />

      <H2>Pagamento</H2>
      <P>
        {site.payment.methods.join(", ")}. {site.payment.note}
      </P>
      <P>
        Detalhes em <A href="/precos">preços</A>. Para marcar, use{" "}
        <A href="/agendar">agendar</A> ou WhatsApp.
      </P>
    </ContentPage>
  );
}
