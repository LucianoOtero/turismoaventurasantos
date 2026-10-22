import type { Metadata } from "next";
import { A, ContentPage, H2, P } from "@/components/content-page";
import { formatBRL, site } from "@/content/site";
import { serializeJsonLd, serviceJsonLd } from "@/lib/structured-data";
import { og } from "@/lib/metadata";

const PATH = "/precos";

export const metadata: Metadata = {
  title: "Preço do voo de parapente em Santos",
  description: `Voo duplo de parapente a partir de ${formatBRL(site.packages[0].price)}. Veja os três pacotes, o que cada um inclui e as formas de pagamento.`,
  alternates: { canonical: PATH },
  openGraph: og(PATH),
};

export default function Precos() {
  const [basico, premium, v360] = site.packages;

  return (
    <ContentPage
      path={PATH}
      label="Valores"
      title="Quanto custa o voo de parapente"
      lead={`O voo duplo custa a partir de ${formatBRL(basico.price)}. O valor é final: não há taxa extra e é o mesmo em qualquer forma de pagamento.`}
      relacionadas={[
        { href: "/como-e-o-voo", label: "Como é o voo" },
        { href: "/duvidas", label: "Dúvidas" },
        { href: "/como-chegar", label: "Como chegar" },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd()) }}
      />

      <ul className="border-t border-rule">
        {site.packages.map((p) => (
          <li
            key={p.id}
            className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
          >
            <div>
              <h2 className="t-h3">{p.name}</h2>
              <p className="mt-1 text-muted">{p.includes.join(" · ")}</p>
            </div>
            <p className="t-figure">{formatBRL(p.price)}</p>
          </li>
        ))}
      </ul>

      <H2>Qual pacote escolher</H2>
      <P>
        O {basico.name} é para quem quer só voar. O {premium.name} acrescenta a
        filmagem completa do voo em HD, entregue em arquivo digital. O{" "}
        {v360.name} troca a filmagem comum por uma em 4K e 360 graus.
      </P>
      <P>
        {site.limits.phoneRule} Por isso, as imagens do voo só existem nos
        pacotes com filmagem.
      </P>

      <H2>Formas de pagamento</H2>
      <P>
        {site.payment.methods.join(", ")}. {site.payment.note}
      </P>

      <H2>Como agendar</H2>
      <P>
        O agendamento é feito pelo WhatsApp {site.contact.phoneDisplay}. Há
        voos {site.hours.label.toLowerCase()}. Em fins de semana e feriados,
        agende com antecedência.
      </P>

      <H2>E se o tempo não deixar voar</H2>
      <P>
        {site.weatherPolicy} Antes de sair de casa, dá para ver a rampa pela{" "}
        <A href="/condicoes-hoje">câmera ao vivo</A>.
      </P>
    </ContentPage>
  );
}
