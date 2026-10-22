"use client";

import { useEffect, useRef } from "react";

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opcoes: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
  }
}

// Verificação anti-robô da Cloudflare. O script só é baixado na página do
// formulário; o widget grava o campo `cf-turnstile-response` dentro do <form>.
export function Turnstile({ siteKey }: { siteKey: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let id: string | undefined;
    let cancelado = false;

    const montar = () => {
      if (cancelado || id || !ref.current || !window.turnstile) return;
      id = window.turnstile.render(ref.current, {
        sitekey: siteKey,
        language: "pt-br",
        theme: "light",
        size: "flexible",
      });
    };

    let script = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
    if (window.turnstile) {
      montar();
    } else {
      if (!script) {
        script = document.createElement("script");
        script.src = SRC;
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", montar);
    }

    return () => {
      cancelado = true;
      script?.removeEventListener("load", montar);
      if (id) window.turnstile?.remove(id);
    };
  }, [siteKey]);

  // Altura reservada para o widget não empurrar o botão quando aparece.
  return <div ref={ref} className="min-h-[65px]" />;
}
