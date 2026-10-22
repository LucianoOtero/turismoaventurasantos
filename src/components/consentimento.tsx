"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Google Analytics 4 com Consent Mode v2. O gtag.js só é baixado depois que o
// visitante aceita; sem escolha ou com recusa, nada é enviado ao Google.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-14F06LTYZ2";

const CHAVE = "ps_consent";
const MUDOU = "ps:consent";
const PEDIDO = "ps_pedido";

type Escolha = "granted" | "denied";
type Estado = Escolha | "pendente";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Vale para a visita quando o navegador não deixa gravar no localStorage.
let memoria: Estado | null = null;
let carregado = false;

function ler(): Estado {
  if (memoria) return memoria;
  try {
    const valor = localStorage.getItem(CHAVE);
    return valor === "granted" || valor === "denied" ? valor : "pendente";
  } catch {
    return "pendente";
  }
}

function definir(estado: Estado) {
  memoria = estado;
  try {
    if (estado === "pendente") localStorage.removeItem(CHAVE);
    else localStorage.setItem(CHAVE, estado);
  } catch {
    // Sem localStorage a escolha vale só para esta visita.
  }
  window.dispatchEvent(new Event(MUDOU));
}

function assinar(aviso: () => void) {
  window.addEventListener(MUDOU, aviso);
  return () => window.removeEventListener(MUDOU, aviso);
}

function apagarCookies() {
  const nomes = document.cookie
    .split(";")
    .map((c) => c.trim().split("=")[0])
    .filter((n) => n === "_ga" || n.startsWith("_ga_"));
  // O gtag grava no domínio mais alto que o navegador aceita; tenta todos.
  const partes = location.hostname.split(".");
  for (const nome of nomes) {
    for (let i = 0; i < partes.length - 1; i++) {
      document.cookie = `${nome}=; Max-Age=0; path=/; domain=.${partes.slice(i).join(".")}`;
    }
    document.cookie = `${nome}=; Max-Age=0; path=/`;
  }
}

function aplicar(estado: Estado) {
  if (estado === "pendente") return;

  if (carregado) {
    // Recusa depois de um aceite: o gtag.js já está na página, então é
    // preciso desligar o envio e apagar os cookies que ele criou.
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] =
      estado === "denied";
    window.gtag?.("consent", "update", { analytics_storage: estado });
    if (estado === "denied") apagarCookies();
    return;
  }
  if (estado === "denied") return;
  carregado = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // O gtag.js espera o objeto arguments, não um array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function evento(nome: string, dados?: Record<string, unknown>) {
  if (carregado) window.gtag?.("event", nome, dados);
}

export function Consentimento() {
  // No servidor e na hidratação o aviso não existe: o HTML estático não muda.
  const estado = useSyncExternalStore<Estado | "servidor">(
    assinar,
    ler,
    () => "servidor",
  );
  const pathname = usePathname();

  useEffect(() => {
    if (estado !== "servidor") aplicar(estado);
  }, [estado]);

  useEffect(() => {
    const aoClicar = (e: MouseEvent) => {
      const link = e.target instanceof Element ? e.target.closest("a") : null;
      const href = link?.getAttribute("href") ?? "";
      if (href.startsWith("/whatsapp"))
        evento("whatsapp_click", { pagina: location.pathname });
      else if (href.startsWith("tel:"))
        evento("telefone_click", { pagina: location.pathname });
    };
    // O pedido só conta na página de confirmação, e uma vez só.
    const aoEnviar = () => {
      try {
        sessionStorage.setItem(PEDIDO, "1");
      } catch {
        // Sem sessionStorage o envio não é medido.
      }
    };
    document.addEventListener("click", aoClicar);
    document.addEventListener("submit", aoEnviar);
    return () => {
      document.removeEventListener("click", aoClicar);
      document.removeEventListener("submit", aoEnviar);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/agendar/recebido") return;
    try {
      if (!sessionStorage.getItem(PEDIDO)) return;
      sessionStorage.removeItem(PEDIDO);
    } catch {
      return;
    }
    evento("generate_lead", { origem: "formulario" });
  }, [pathname]);

  if (estado !== "pendente") return null;

  return (
    <div
      role="region"
      aria-label="Cookies"
      className="fixed inset-x-0 bottom-14 z-40 border-t border-rule-inv bg-ink text-white shadow-xl md:bottom-0"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between md:gap-8 md:py-3">
        <p className="t-small text-white/85">
          Com o seu aceite, usamos cookies do Google Analytics para contar as
          visitas. Sem ele, nada é enviado ao Google.{" "}
          <Link href="/privacidade" className="underline underline-offset-4">
            Privacidade
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => definir("granted")}
            className="btn cursor-pointer px-4 py-2.5"
          >
            Aceitar
          </button>
          <button
            type="button"
            onClick={() => definir("denied")}
            className="btn cursor-pointer border border-white/50 bg-transparent px-4 py-2.5 text-white hover:bg-white/10"
          >
            Recusar
          </button>
        </div>
      </div>
    </div>
  );
}

export function PreferenciasCookies() {
  return (
    <button
      type="button"
      onClick={() => definir("pendente")}
      className="cursor-pointer underline underline-offset-4"
    >
      Preferências de cookies
    </button>
  );
}
