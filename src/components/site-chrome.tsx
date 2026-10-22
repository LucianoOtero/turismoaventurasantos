import Image from "next/image";
import Link from "next/link";
import { PreferenciasCookies } from "@/components/consentimento";
import { nav, paginas } from "@/content/home";
import { site, whatsappHref } from "@/content/site";
import logo from "@/assets/logo-tas.jpeg";

// "overlay" fica sobre a foto do hero; "solid" é a faixa das páginas internas.
export function SiteHeader({ variant }: { variant: "overlay" | "solid" }) {
  const position =
    variant === "overlay" ? "absolute inset-x-0 top-0 z-20" : "relative z-20 bg-ink";

  return (
    <header className={`${position} text-white`}>
      <a
        href="#conteudo"
        className="btn sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:px-5 focus:py-3"
      >
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2.5 md:gap-6">
        <Link href="/" className="flex items-center gap-3 md:gap-4">
          {/*
            Mesma escala do header do Voo Livre SV: h-16 / md:h-20 (64–80px)
            no hero; nas páginas internas (solid) fica um pouco menor, como o
            estado “scrolled” de lá (h-12 / md:h-14).
          */}
          <Image
            src={logo}
            alt={site.name}
            width={80}
            height={80}
            sizes="80px"
            className={`w-auto rounded-full object-cover ring-2 ring-white/40 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] ${
              variant === "overlay"
                ? "h-16 md:h-20"
                : "h-12 md:h-14"
            }`}
            priority
          />
          <span className="font-[family-name:var(--font-display)] text-base font-extrabold tracking-tight min-[400px]:text-lg md:text-xl">
            {site.name}
          </span>
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="t-label hover:text-signal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={whatsappHref()}
          rel="nofollow"
          className="btn ml-auto hidden md:inline-block lg:ml-0"
        >
          Agendar
        </a>
        <details className="relative lg:hidden">
          <summary className="t-label border border-white/50 px-3 py-2">Menu</summary>
          <nav aria-label="Principal, celular">
            <ul className="absolute right-0 mt-2 w-56 bg-ink py-2 shadow-xl">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="t-label block px-4 py-3">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/condicoes-hoje" className="t-label block px-4 py-3">
                  Câmera ao vivo
                </Link>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="t-small mx-auto max-w-7xl px-5 py-10">
        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {paginas.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="hover:text-white">
                  {p.label}
                </Link>
              </li>
            ))}
            <li>
              <PreferenciasCookies />
            </li>
          </ul>
        </nav>
        <div className="mt-8 flex flex-col gap-2 border-t border-rule-inv pt-6 md:flex-row md:justify-between">
          <p>
            {site.name} · {site.address.street}, {site.address.city} —{" "}
            {site.address.state}
          </p>
          <p>
            <a
              href={`mailto:${site.contact.email}`}
              className="underline underline-offset-4"
            >
              {site.contact.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// Barra fixa de agendamento, só no celular. A página que a usa reserva o
// espaço com `pb-14 md:pb-0` no contêiner.
export function WhatsAppBar({ chave }: { chave?: "agendar" | "hoje" }) {
  return (
    <a
      href={whatsappHref(chave)}
      rel="nofollow"
      className="btn fixed inset-x-0 bottom-0 z-30 rounded-none py-4 text-center md:hidden"
    >
      Agendar pelo WhatsApp
    </a>
  );
}
