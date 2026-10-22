import type { Metadata } from "next";
import Image from "next/image";
import { A, ContentPage, H2, P } from "@/components/content-page";
import { site } from "@/content/site";
import etapaBriefing from "@/assets/fotos/etapa-briefing.jpg";
import etapaDecolagem from "@/assets/fotos/etapa-decolagem.jpg";
import etapaPouso from "@/assets/fotos/etapa-pouso.jpg";
import etapaVoo from "@/assets/fotos/etapa-voo.jpg";
import { og } from "@/lib/metadata";

const PATH = "/como-e-o-voo";

export const metadata: Metadata = {
  title: "Como é o voo de parapente",
  description:
    "Briefing, decolagem na rampa, até 10 minutos de voo e pouso na Praia do Itararé: o passo a passo do voo duplo de parapente em São Vicente.",
  alternates: { canonical: PATH },
  openGraph: og(PATH),
};

const etapas = [
  {
    titulo: "Briefing",
    foto: etapaBriefing,
    alt: "Instrutor orientando o passageiro antes do voo",
    retrato: true,
    texto:
      "Antes de decolar, o instrutor explica o equipamento, a corrida de decolagem e o pouso. É a hora de tirar dúvidas e de dizer se você tem medo de altura.",
  },
  {
    titulo: "Decolagem",
    foto: etapaDecolagem,
    alt: "Parapente inflando na rampa para a decolagem",
    retrato: false,
    texto: `Vocês dois ficam presos ao mesmo parapente, você à frente e o instrutor atrás. Com a vela inflada, é só correr alguns passos na ${site.takeoff} até sair do chão.`,
  },
  {
    titulo: "Voo",
    foto: etapaVoo,
    alt: "Parapente amarelo em voo duplo, visto de baixo",
    retrato: true,
    texto: `Você vai sentado e o instrutor pilota o tempo todo. São ${site.flight.durationLabel}, conforme as condições do dia, com vista para a orla de Santos e São Vicente e para a Baixada Santista.`,
  },
  {
    titulo: "Pouso",
    foto: etapaPouso,
    alt: "Instrutor e passageiro com as pernas erguidas, na aproximação para o pouso",
    retrato: true,
    texto: `O pouso é na ${site.landing}.`,
  },
];

export default function ComoEOVoo() {
  return (
    <ContentPage
      path={PATH}
      label="Do briefing ao pouso"
      title="Como é voar de parapente"
      lead={`Do briefing ao pouso na praia, reserve ${site.flight.totalTimeLabel}. O voo em si dura ${site.flight.durationLabel}.`}
      relacionadas={[
        { href: "/precos", label: "Preços" },
        { href: "/seguranca", label: "Segurança" },
        { href: "/duvidas", label: "Dúvidas" },
      ]}
    >
      {/* Cada foto na sua proporção: a de paisagem ocupa a largura toda; as de
          retrato dividem a linha com o texto, em lados alternados. As alturas
          ficam próximas, o que mantém o ritmo da página. */}
      <ol className="space-y-12 sm:space-y-16">
        {etapas.map((etapa, i) => {
          const texto = (
            <div>
              <h2 className="t-statement">
                <span className="text-signal">{i + 1}.</span> {etapa.titulo}
              </h2>
              <p className="mt-3">{etapa.texto}</p>
            </div>
          );
          return etapa.retrato ? (
            <li
              key={etapa.titulo}
              className="grid gap-5 sm:grid-cols-2 sm:items-center sm:gap-10"
            >
              <Image
                src={etapa.foto}
                alt={etapa.alt}
                sizes="(min-width: 768px) 22rem, (min-width: 640px) 50vw, 100vw"
                placeholder="blur"
                className={`aspect-[3/4] w-full object-cover ${i === 3 ? "sm:order-last" : ""}`}
              />
              {texto}
            </li>
          ) : (
            <li key={etapa.titulo} className="grid gap-5">
              <Image
                src={etapa.foto}
                alt={etapa.alt}
                sizes="(min-width: 768px) 48rem, 100vw"
                placeholder="blur"
                className="aspect-[3/2] w-full object-cover"
              />
              {texto}
            </li>
          );
        })}
      </ol>

      <H2>É salto ou é voo?</H2>
      <P>
        Muita gente procura por salto de parapente ou por pular de parapente,
        mas não há salto nem queda livre. O parapente decola com a vela já
        aberta, e o que você sente é um voo do começo ao fim.
      </P>

      <H2>O que levar</H2>
      <P>
        {site.limits.clothing} {site.limits.phoneRule}
      </P>

      <H2>Imagens do voo</H2>
      <P>
        Quem quer registrar o voo escolhe um dos pacotes com filmagem. Os
        valores estão na página de <A href="/precos">preços</A>.
      </P>
    </ContentPage>
  );
}
