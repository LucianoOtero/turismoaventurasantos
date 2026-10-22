import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader, WhatsAppBar } from "@/components/site-chrome";
import { WebcamPlayer } from "@/components/webcam-player";
import { site, whatsappHref } from "@/content/site";
import { og } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Câmera ao vivo da rampa em São Vicente",
  description:
    "Veja ao vivo a rampa do Clube de Voo Livre do Litoral Paulista, no Morro do Itararé, e confira as condições para voar de parapente hoje.",
  alternates: { canonical: "/condicoes-hoje" },
  openGraph: og("/condicoes-hoje"),
};

export default function CondicoesHoje() {
  return (
    <div className="pb-14 md:pb-0">
      <SiteHeader variant="solid" />

      <main id="conteudo">
        <section className="bg-ink text-white">
          <div className="mx-auto max-w-5xl px-5 pb-12 pt-10 md:pb-16 md:pt-14">
            <p className="t-label text-white/70">
              Condições de hoje · Morro do Itararé
            </p>
            <h1 className="t-h2 mt-3">Câmera ao vivo da rampa</h1>
            <p className="t-lead mt-5 max-w-2xl text-white/85">
              Veja como está a rampa do Clube de Voo Livre do Litoral Paulista
              agora, antes de sair de casa.
            </p>
            <div className="mt-8 border border-rule-inv">
              <WebcamPlayer src={site.webcam.streamUrl} />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-5xl gap-12 px-5 py-14 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="t-statement">Quando dá voo</h2>
            <p className="mt-4 text-muted">{site.webcam.conditions}</p>
            <p className="mt-4 text-muted">
              {site.hours.label}. {site.hours.note}
            </p>
          </div>
          <div>
            <h2 className="t-statement">Se o tempo virar</h2>
            <p className="mt-4 text-muted">{site.weatherPolicy}</p>
            <p className="mt-8 flex flex-wrap items-center gap-6">
              <a href={whatsappHref("hoje")} rel="nofollow" className="btn">
                Perguntar se dá voo hoje
              </a>
              <Link href="/#precos" className="t-label underline underline-offset-4">
                Ver preços
              </Link>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppBar />
    </div>
  );
}
