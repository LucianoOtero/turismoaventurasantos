import type { Metadata } from "next";
import { A, ContentPage, H2, Lista, P } from "@/components/content-page";
import { formatBRL, site } from "@/content/site";
import { og } from "@/lib/metadata";

const PATH = "/voo-de-parapente-santos";

export const metadata: Metadata = {
  title: "Voo de parapente em Santos",
  description:
    "Voo duplo perto de Santos: a rampa do Morro do Itararé fica a cerca de 15 minutos da orla. A partir de R$ 400 com o Turismo Aventura Santos.",
  alternates: { canonical: PATH },
  openGraph: og(PATH),
};

export default function VooParapenteSantos() {
  return (
    <ContentPage
      path={PATH}
      label="Santos · Baixada Santista"
      title="Voo de parapente em Santos: a orla vista do céu"
      lead="Se você está em Santos e quer voar de parapente, a rampa mais próxima é a do Morro do Itararé, em São Vicente — na divisa das duas cidades, a cerca de 15 minutos da orla santista."
      relacionadas={[
        { href: "/quanto-custa-voo-de-parapente", label: "Quanto custa" },
        { href: "/como-chegar", label: "Como chegar" },
        { href: "/precos", label: "Preços" },
      ]}
    >
      <H2>Onde acontece o voo</H2>
      <P>
        A decolagem é na {site.takeoff}. O pouso é na {site.landing}. Saindo do
        Gonzaga ou da orla, você chega de carro em cerca de 15 minutos pela
        Avenida Presidente Wilson, sentido São Vicente.
      </P>

      <H2>O que você vê</H2>
      <P>
        A orla de Santos, a Ilha Porchat, a ponte pênsil de São Vicente e, em
        dias limpos, o litoral sul. O voo dura {site.flight.durationLabel},
        pilotado pelo {site.instructor.name}.
      </P>

      <H2>Quanto custa</H2>
      <P>
        A partir de {formatBRL(site.packages[0].price)}. Pacotes com fotos e
        filmagem em HD ou 360º —{" "}
        <A href="/quanto-custa-voo-de-parapente">veja os preços</A> ou{" "}
        <A href="/precos">a página completa de pacotes</A>.
      </P>

      <H2>Perguntas frequentes</H2>
      <Lista
        itens={[
          "A decolagem é em São Vicente, na divisa com Santos — a cerca de 15 minutos da orla.",
          "Não é preciso experiência: o voo é duplo com piloto certificado.",
          `Horário: ${site.hours.label}. ${site.weatherPolicy}`,
        ]}
      />
    </ContentPage>
  );
}
