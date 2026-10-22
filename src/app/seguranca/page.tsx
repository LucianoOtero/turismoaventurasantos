import type { Metadata } from "next";
import { A, ContentPage, H2, Lista, P } from "@/components/content-page";
import { site } from "@/content/site";
import { og } from "@/lib/metadata";

const PATH = "/seguranca";

export const metadata: Metadata = {
  title: "Voar de parapente é seguro?",
  description:
    "Quem pilota, regras do CVLLP, quando não há voo e limites do passageiro no voo duplo do Turismo Aventura Santos.",
  alternates: { canonical: PATH },
  openGraph: og(PATH),
};

export default function Seguranca() {
  const { instructor } = site;

  return (
    <ContentPage
      path={PATH}
      label="Segurança"
      title="Voar de parapente é seguro?"
      lead="Voo livre é esporte de aventura e tem risco. O que deixa o voo duplo sob controle é quem pilota, a decisão de não voar em dia ruim e o respeito às regras do CVLLP."
      relacionadas={[
        { href: "/instrutor", label: "O piloto" },
        { href: "/duvidas", label: "Dúvidas" },
        { href: "/condicoes-hoje", label: "Câmera ao vivo da rampa" },
      ]}
    >
      <H2>Quem pilota</H2>
      <P>
        Todo voo é feito pelo {instructor.name} ({instructor.fullName}),
        certificado e especializado em voo duplo com passageiro. No voo duplo,
        é ele quem pilota do começo ao fim; o passageiro não comanda nada.
      </P>

      <H2>Observações gerais para um voo seguro</H2>
      <Lista itens={[...site.safetyRules]} />

      <H2>Quando não tem voo</H2>
      <P>{site.webcam.conditions}</P>
      <P>
        A decisão de voar ou não é do piloto, no dia. {site.weatherPolicy}
      </P>

      <H2>Limites do passageiro</H2>
      <Lista
        itens={[
          `Peso máximo de ${site.limits.maxWeightKg} kg.`,
          `Idade mínima de ${site.limits.minAge} anos. ${site.limits.minorsRule}`,
          "Quem tem problema cardíaco ou está grávida deve consultar um médico antes de voar.",
        ]}
      />

      <H2>O que cabe a você</H2>
      <Lista
        itens={[
          "Ouvir o briefing antes da decolagem e seguir as orientações do piloto.",
          "Correr alguns passos na decolagem, até sair do chão.",
          site.limits.clothing,
          `Deixar o celular em terra. ${site.limits.phoneRule}`,
        ]}
      />

      <H2>Parapente e asa-delta</H2>
      <P>
        No parapente e na asa-delta, a decolagem é de uma rampa e o voo começa
        ali mesmo: não há queda livre. Veja{" "}
        <A href="/como-e-o-voo">como é o voo de parapente</A>, passo a passo.
      </P>
    </ContentPage>
  );
}
