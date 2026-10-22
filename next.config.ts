import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // O CSS inteiro tem cerca de 6 KB: embutido no HTML, a primeira pintura
    // deixa de esperar uma segunda requisição.
    inlineCss: true,
  },
  async redirects() {
    return [
      {
        // O endereço provisório da Vercel não deve concorrer com o domínio oficial.
        source: "/:path*",
        has: [{ type: "host", value: "parapentesantos-next.vercel.app" }],
        destination: "https://www.santosparapente.com.br/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  images: {
    // AVIF primeiro: arquivos menores para as fotos, que são o maior peso da página.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
