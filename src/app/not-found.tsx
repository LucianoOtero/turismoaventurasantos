import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-24">
      <p className="t-label text-muted">Erro 404</p>
      <h1 className="t-h2 mt-3">Página não encontrada</h1>
      <p className="t-lead mt-5">O endereço que você abriu não existe neste site.</p>
      <p className="mt-8">
        <Link href="/" className="btn">
          Voltar para a página inicial
        </Link>
      </p>
    </main>
  );
}
