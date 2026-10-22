import type { Metadata } from "next";
import Image from "next/image";
import { A, ContentPage, H2, Lista, P } from "@/components/content-page";
import { formatBRL, site } from "@/content/site";
import ilhaPraia from "@/assets/fotos/ilha-praia.jpg";
import { og } from "@/lib/metadata";

const PATH = "/parapente-perto-de-sao-paulo";

export const metadata: Metadata = {
  title: "Parapente perto de São Paulo",
  description:
    "A cerca de 75 km da capital, em São Vicente, você voa de parapente sobre a praia e volta no mesmo dia. Veja como organizar o passeio.",
  alternates: { canonical: PATH },
  openGraph: og(PATH),
};

export default function PertoDeSaoPaulo() {
  return (
    <ContentPage
      path={PATH}
      label="Para quem sai da capital"
      title="Parapente perto de São Paulo"
      lead="A cerca de 75 km da capital, em São Vicente, você voa de parapente sobre a praia e volta no mesmo dia."
      relacionadas={[
        { href: "/como-chegar", label: "Como chegar" },
        { href: "/como-e-o-voo", label: "Como é o voo" },
        { href: "/precos", label: "Preços" },
      ]}
    >
      <Image
        src={ilhaPraia}
        alt="Parapente em voo sobre a praia e o mar, em São Vicente"
        sizes="(min-width: 768px) 48rem, 100vw"
        placeholder="blur"
        className="aspect-[3/2] w-full object-cover"
      />

      <H2>Onde é o voo</H2>
      <P>
        A decolagem é na {site.takeoff}, em São Vicente, na divisa com Santos.
        O voo é sobre a orla e o pouso é na {site.landing}. Da capital, o
        caminho é pela Rodovia dos Imigrantes (SP-160) ou pela Anchieta
        (SP-150).
      </P>

      <H2>Como é</H2>
      <P>
        É um voo duplo: você vai com o instrutor {site.instructor.name}, que
        pilota o tempo todo. O voo dura {site.flight.durationLabel} e a
        experiência toda leva {site.flight.totalTimeLabel}. Veja o{" "}
        <A href="/como-e-o-voo">passo a passo do voo</A>.
      </P>

      <H2>Quanto custa</H2>
      <P>
        A partir de {formatBRL(site.packages[0].price)}, valor final. Com
        filmagem, {formatBRL(site.packages[1].price)} ou{" "}
        {formatBRL(site.packages[2].price)}. Os detalhes estão em{" "}
        <A href="/precos">preços</A>.
      </P>

      <H2>Como organizar o dia</H2>
      <Lista
        itens={[
          `Agende pelo WhatsApp ${site.contact.phoneDisplay}. Em fins de semana e feriados, com antecedência.`,
          <>
            No dia, antes de pegar a estrada, veja a rampa pela{" "}
            <A href="/condicoes-hoje">câmera ao vivo</A> e confirme o horário.
          </>,
          `Há voos ${site.hours.label.toLowerCase()}.`,
          "O pouso é na praia: dá para emendar o resto do dia por ali.",
        ]}
      />

      <H2>Quem pode voar</H2>
      <P>
        Peso máximo de {site.limits.maxWeightKg} kg e idade mínima de{" "}
        {site.limits.minAge} anos, com autorização do responsável para menores.
        As demais respostas estão em <A href="/duvidas">dúvidas</A>.
      </P>

      <H2>Se o tempo virar</H2>
      <P>{site.weatherPolicy}</P>
    </ContentPage>
  );
}
