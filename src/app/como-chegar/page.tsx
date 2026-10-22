import type { Metadata } from "next";
import { A, ContentPage, H2, P } from "@/components/content-page";
import { TELEFERICO_URL, mapsUrl } from "@/content/home";
import { site } from "@/content/site";
import { og } from "@/lib/metadata";

const PATH = "/como-chegar";

export const metadata: Metadata = {
  title: "Como chegar à rampa em São Vicente",
  description:
    "Endereço da rampa de decolagem no Morro do Itararé, em São Vicente, e como chegar saindo de Santos ou de São Paulo.",
  alternates: { canonical: PATH },
  openGraph: og(PATH),
};

export default function ComoChegar() {
  const { address } = site;

  return (
    <ContentPage
      path={PATH}
      label="Localização"
      title="Como chegar à rampa de voo livre em São Vicente"
      lead={`O ponto de encontro é a ${site.takeoff}, em ${address.city}, na divisa com Santos.`}
      relacionadas={[
        { href: "/condicoes-hoje", label: "Câmera ao vivo da rampa" },
        { href: "/parapente-perto-de-sao-paulo", label: "Parapente perto de São Paulo" },
        { href: "/precos", label: "Preços" },
      ]}
    >
      <H2>Endereço</H2>
      <address className="t-lead mt-4 not-italic">
        {address.street}
        <br />
        {address.city} — {address.state}, {address.postalCode}
      </address>
      <p className="mt-6">
        <a href={mapsUrl} className="btn">
          Abrir no Google Maps
        </a>
      </p>
      <P>
        O morro também é chamado de Morro do Voturuá e é conhecido na região
        como o morro da asa-delta. O pouso é na {site.landing}, logo abaixo.
      </P>

      <H2>Vindo de Santos</H2>
      <P>
        Embora o nome seja Turismo Aventura Santos, a rampa fica em São Vicente,
        colada à divisa entre as duas cidades. De carro ou por aplicativo, use
        o endereço acima.
      </P>

      <H2>Vindo de São Paulo</H2>
      <P>
        São cerca de 75 km até a Baixada Santista, pela Rodovia dos Imigrantes
        (SP-160) ou pela Anchieta (SP-150). Há mais detalhes na página{" "}
        <A href="/parapente-perto-de-sao-paulo">parapente perto de São Paulo</A>.
      </P>

      <H2>De teleférico</H2>
      <P>
        O teleférico de São Vicente sai da Praia do Itararé e sobe até o alto
        do morro. Horários e preços mudam; confira na{" "}
        <A href={TELEFERICO_URL}>página da prefeitura</A> antes de ir.
      </P>

      <H2>Antes de sair de casa</H2>
      <P>
        Confirme o horário pelo WhatsApp {site.contact.phoneDisplay} e veja a
        rampa pela <A href="/condicoes-hoje">câmera ao vivo</A>.{" "}
        {site.weatherPolicy}
      </P>
    </ContentPage>
  );
}
