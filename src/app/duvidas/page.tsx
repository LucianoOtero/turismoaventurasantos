import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";
import { duvidasPorTema } from "@/content/home";
import { og } from "@/lib/metadata";

const PATH = "/duvidas";

export const metadata: Metadata = {
  title: "Dúvidas sobre o voo de parapente",
  description:
    "Limite de peso, idade mínima, medo de altura, roupa, celular, chuva e pagamento: respostas diretas sobre o voo duplo de parapente em São Vicente.",
  alternates: { canonical: PATH },
  openGraph: og(PATH),
};

export default function Duvidas() {
  return (
    <ContentPage
      path={PATH}
      label="Perguntas e respostas"
      title="Dúvidas sobre o voo de parapente"
      lead="O que as pessoas mais perguntam antes de marcar: quem pode voar, como é no dia, o que acontece se o tempo virar e quanto custa."
      relacionadas={[
        { href: "/seguranca", label: "Segurança" },
        { href: "/como-e-o-voo", label: "Como é o voo" },
        { href: "/precos", label: "Preços" },
      ]}
    >
      {duvidasPorTema.map((grupo) => (
        <section key={grupo.tema} className="mt-12 first:mt-0">
          <h2 className="t-statement">{grupo.tema}</h2>
          <div className="mt-5 border-t border-rule">
            {grupo.itens.map((d) => (
              <details key={d.q} className="border-b border-rule py-4">
                <summary className="flex items-start justify-between gap-6 font-semibold">
                  {d.q}
                  <span className="mais text-xl leading-none text-signal transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-muted">{d.a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </ContentPage>
  );
}
