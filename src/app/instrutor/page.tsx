import type { Metadata } from "next";
import Image from "next/image";
import { A, ContentPage, H2, P } from "@/components/content-page";
import { site } from "@/content/site";
import montanha from "@/assets/fotos/montanha.webp";
import { og } from "@/lib/metadata";

const PATH = "/instrutor";

export const metadata: Metadata = {
  title: `${site.instructor.name}, piloto de voo duplo`,
  description: `Quem pilota os voos do ${site.name}: ${site.instructor.name} (${site.instructor.fullName}), certificado CBVL, voo duplo no Morro do Itararé.`,
  alternates: { canonical: PATH },
  openGraph: og(PATH),
};

export default function Instrutor() {
  const { instructor } = site;

  return (
    <ContentPage
      path={PATH}
      label="Quem voa com você"
      title={`${instructor.name}, piloto de voo duplo`}
      lead={`Todo voo do ${site.name} é feito pelo ${instructor.name} (${instructor.fullName}).`}
      relacionadas={[
        { href: "/seguranca", label: "Segurança" },
        { href: "/como-e-o-voo", label: "Como é o voo" },
        { href: "/precos", label: "Preços" },
      ]}
    >
      <Image
        src={montanha}
        alt={`${instructor.name}, piloto de voo duplo`}
        sizes="(min-width: 768px) 28rem, 100vw"
        className="aspect-[4/5] w-full max-w-md object-cover"
      />

      <H2>Experiência</H2>
      <P>
        O {instructor.name} voa na rampa do CVLLP, no Morro do Itararé, com
        especialidade em voo duplo com passageiro — a vista do oceano, das
        praias e da Serra do Mar.
      </P>

      <H2>Certificação e clube</H2>
      <dl className="mt-4 border-t border-rule">
        {[
          ["Nome", instructor.fullName],
          ["Certificação", instructor.certifications.join(" · ")],
          ["No clube", instructor.role],
        ].map(([k, v]) => (
          <div
            key={k}
            className="grid gap-1 border-b border-rule py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-6"
          >
            <dt className="t-label pt-1 text-muted">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <H2>Redes</H2>
      <P>
        Siga {site.social.hashtag} no{" "}
        <A href={site.social.instagram}>Instagram</A>,{" "}
        <A href={site.social.youtube}>YouTube</A> e{" "}
        <A href={site.social.tiktok}>TikTok</A>.
      </P>

      <H2>No voo</H2>
      <P>
        É o {instructor.name} quem faz o briefing, pilota e decide, no dia, se
        há condição de voar. Veja como isso funciona em{" "}
        <A href="/seguranca">segurança</A>.
      </P>
    </ContentPage>
  );
}
