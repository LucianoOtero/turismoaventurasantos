import type { ReactNode } from "react";
import Link from "next/link";
import { SiteFooter, SiteHeader, WhatsAppBar } from "@/components/site-chrome";
import { site, whatsappHref } from "@/content/site";
import { breadcrumbJsonLd, serializeJsonLd } from "@/lib/structured-data";

type Props = {
  path: string;
  label: string;
  title: string;
  lead: string;
  relacionadas: { href: string; label: string }[];
  children: ReactNode;
};

// Modelo das páginas internas: faixa de título, texto em coluna estreita,
// links para páginas vizinhas e chamada de agendamento.
export function ContentPage({ path, label, title, lead, relacionadas, children }: Props) {
  return (
    <div className="pb-14 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbJsonLd(title, path)),
        }}
      />
      <SiteHeader variant="solid" />

      <main id="conteudo">
        <section className="bg-ink text-white">
          <div className="mx-auto max-w-3xl px-5 pb-12 pt-10 md:pb-16 md:pt-14">
            <p className="t-label text-white/70">{label}</p>
            <h1 className="t-h2 mt-3">{title}</h1>
            <p className="t-lead mt-5 text-white/85">{lead}</p>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-5 py-12 md:py-16">{children}</article>

        <nav aria-label="Páginas relacionadas" className="border-t border-rule">
          <div className="mx-auto max-w-3xl px-5 py-10">
            <p className="t-label text-muted">Continue lendo</p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {relacionadas.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="font-semibold underline underline-offset-4">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <section className="bg-signal text-white">
          <div className="mx-auto flex max-w-3xl flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between">
            <h2 className="t-statement">Marque o seu voo</h2>
            <a href={whatsappHref()} rel="nofollow" className="btn btn-dark self-start">
              WhatsApp {site.contact.phoneDisplay}
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppBar />
    </div>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="t-statement mt-12 first:mt-0">{children}</h2>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4">{children}</p>;
}

export function Lista({ itens }: { itens: ReactNode[] }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-signal">
      {itens.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  const className = "font-semibold underline underline-offset-4";
  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
