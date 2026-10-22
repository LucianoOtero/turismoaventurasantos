import Image from "next/image";
import Link from "next/link";
import { HeroPicture } from "@/components/hero-picture";
import { SiteFooter, SiteHeader, WhatsAppBar } from "@/components/site-chrome";
import { depoimentos } from "@/content/depoimentos";
import { duvidas, etapas, mapsUrl } from "@/content/home";
import { formatBRL, site, whatsappHref } from "@/content/site";
import { voosRealizadosLabel } from "@/lib/contador";
import {
  localBusinessJsonLd,
  serializeJsonLd,
  serviceJsonLd,
} from "@/lib/structured-data";
import etapaBriefing from "@/assets/fotos/etapa-briefing.jpg";
import etapaDecolagem from "@/assets/fotos/etapa-decolagem.jpg";
import etapaPouso from "@/assets/fotos/etapa-pouso.jpg";
import etapaVoo from "@/assets/fotos/etapa-voo.jpg";
import galeria1 from "@/assets/fotos/galeria-1.jpeg";
import galeria2 from "@/assets/fotos/galeria-2.jpeg";
import galeria3 from "@/assets/fotos/galeria-3.jpeg";
import galeria4 from "@/assets/fotos/galeria-4.jpeg";
import galeria5 from "@/assets/fotos/galeria-5.jpeg";
import galeria6 from "@/assets/fotos/galeria-6.jpeg";
import heroRampa from "@/assets/fotos/hero-rampa.jpg";
import heroRampaVertical from "@/assets/fotos/hero-rampa-vertical.jpg";
import ilhaPraia from "@/assets/fotos/ilha-praia.jpg";
import montanha from "@/assets/fotos/montanha.webp";

export const revalidate = 86400;

const molduras = {
  retrato: {
    item: "sm:basis-[30%] sm:grow-[3] lg:basis-[15%]",
    img: "aspect-[3/4]",
    sizes: "(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 100vw",
  },
  paisagem: {
    item: "sm:basis-[60%] sm:grow-[6] lg:basis-[30%]",
    img: "aspect-[3/2]",
    sizes: "(min-width: 1024px) 38vw, (min-width: 640px) 66vw, 100vw",
  },
} as const;

const fotosEtapas = {
  briefing: {
    src: etapaBriefing,
    alt: "Piloto orientando o passageiro antes do voo",
    moldura: molduras.retrato,
  },
  decolagem: {
    src: etapaDecolagem,
    alt: "Parapente inflando na rampa para a decolagem",
    moldura: molduras.paisagem,
  },
  voo: {
    src: etapaVoo,
    alt: "Parapente em voo duplo, visto de baixo",
    moldura: molduras.retrato,
  },
  pouso: {
    src: etapaPouso,
    alt: "Piloto e passageiro na aproximação para o pouso",
    moldura: molduras.retrato,
  },
} as const;

const galeria = [
  { src: galeria1, alt: "Voo sobre a praia de Santos" },
  { src: galeria2, alt: "Vista da Serra do Mar em voo" },
  { src: galeria3, alt: "Passageiro em voo duplo" },
  { src: galeria4, alt: "Orla da Baixada Santista do alto" },
  { src: galeria5, alt: "Parapente sobre o litoral" },
  { src: galeria6, alt: "Momento de liberdade no voo" },
];

export default function Home() {
  const { instructor } = site;

  const ficha = [
    [site.flight.durationLabel.replace("de ", ""), "de voo, conforme o dia"],
    [`${site.limits.maxWeightKg} kg`, "peso máximo do passageiro"],
    [`${site.limits.minAge} anos`, "idade mínima, com documento"],
    [
      `${instructor.yearsOfExperience}+`,
      `anos de voo do ${instructor.name}`,
    ],
    [voosRealizadosLabel(), "voos realizados na rampa"],
  ];

  return (
    <div className="pb-14 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(localBusinessJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd()) }}
      />

      <SiteHeader variant="overlay" />

      <main id="conteudo">
        <div className="relative bg-ink text-white md:flex md:min-h-[min(100svh,90rem)] md:flex-col">
          <section className="relative flex min-h-[min(100svh,54rem)] flex-col justify-end md:static md:min-h-0 md:flex-1">
            <HeroPicture
              mobile={heroRampaVertical}
              desktop={heroRampa}
              alt="Rampa de voo livre no Morro do Itararé"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            {/* Overlay mais leve: legibilidade do texto sem “apagar” a foto */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/10" />
            <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-32 md:pb-16">
              <p className="t-label text-sun">{site.name}</p>
              <h1 className="t-hero mt-4 max-w-[16ch]">{site.tagline}</h1>
              <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <p className="t-lead max-w-xl text-white/90">
                  Experimente a liberdade nos céus com a melhor vista do litoral
                  paulista. Você decola com o {instructor.name} da rampa do
                  clube e pousa na Praia do Itararé.
                </p>
                <div className="flex items-end gap-6">
                  <p>
                    <span className="t-label block text-white/70">
                      A partir de
                    </span>
                    <span className="t-stat mt-1 block text-sun">
                      {formatBRL(site.packages[0].price)}
                    </span>
                  </p>
                  <a
                    href={whatsappHref()}
                    rel="nofollow"
                    className="btn hidden md:inline-block"
                  >
                    Reserve seu voo
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section aria-label="Ficha do voo" className="relative">
            <ul className="mx-auto grid max-w-7xl grid-cols-2 border-t border-rule-inv px-5 md:grid-cols-5">
              {ficha.map(([valor, legenda]) => (
                <li
                  key={legenda}
                  className="border-b border-rule-inv py-6 pr-4 md:border-b-0 md:border-l md:py-7 md:pl-6 md:first:border-l-0 md:first:pl-0"
                >
                  <p className="t-stat">{valor}</p>
                  <p className="t-small mt-2 text-white/70">{legenda}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section id="galeria" className="mx-auto max-w-7xl px-5 py-16 md:py-24">
          <p className="t-label text-sky">Galeria de voos</p>
          <h2 className="t-h2 mt-3">Momentos inesquecíveis</h2>
          <p className="t-lead mt-4 max-w-2xl text-muted">
            Cada imagem conta uma história de liberdade, aventura e vistas do
            litoral paulista.{" "}
            <em className="text-ink">
              “Cada voo é uma história única. Venha escrever a sua!”
            </em>
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {galeria.map((foto) => (
              <li key={foto.alt} className="overflow-hidden">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </section>

        <section id="o-voo" className="bg-fog">
          <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
            <p className="t-label text-muted">Do briefing ao pouso</p>
            <h2 className="t-h2 mt-3">Como é o voo</h2>
            <ol className="mt-10 flex flex-col gap-x-6 gap-y-12 sm:flex-row sm:flex-wrap md:mt-12">
              {etapas.map((etapa, i) => {
                const foto = fotosEtapas[etapa.id];
                return (
                  <li key={etapa.id} className={`min-w-0 ${foto.moldura.item}`}>
                    <Image
                      src={foto.src}
                      alt={foto.alt}
                      sizes={foto.moldura.sizes}
                      placeholder="blur"
                      className={`w-full object-cover ${foto.moldura.img}`}
                    />
                    <h3 className="t-h3 mt-5">
                      <span className="text-signal">{i + 1}.</span>{" "}
                      {etapa.titulo}
                    </h3>
                    <p className="mt-2 max-w-md text-muted">{etapa.texto}</p>
                  </li>
                );
              })}
            </ol>
            <p className="mt-10">
              <Link
                href="/como-e-o-voo"
                className="t-label inline-block py-3 text-ink underline underline-offset-4"
              >
                Ver o voo passo a passo
              </Link>
            </p>
          </div>
        </section>

        <section id="precos" className="bg-ink text-white">
          <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
            <p className="t-label text-sun">Valor final, sem taxa extra</p>
            <h2 className="t-h2 mt-3">Nossos pacotes</h2>
            <ul className="mt-10 grid md:mt-12 md:grid-cols-3">
              {site.packages.map((p) => (
                <li
                  key={p.id}
                  className="border-t border-rule-inv py-8 md:border-l md:border-t-0 md:px-8 md:py-1 md:first:border-l-0 md:first:pl-0"
                >
                  <h3 className="t-label text-signal-soft">{p.name}</h3>
                  <p className="t-figure mt-3">{formatBRL(p.price)}</p>
                  <ul className="mt-5 space-y-1 text-white/80">
                    {p.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="mt-6">
                    <a
                      href={whatsappHref(
                        p.id === "vip"
                          ? "vip"
                          : p.id === "premium"
                            ? "premium"
                            : "360",
                      )}
                      rel="nofollow"
                      className="t-label text-sun underline underline-offset-4"
                    >
                      Quero este pacote
                    </a>
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-6 border-t border-rule-inv pt-8 md:mt-12 md:flex-row md:items-center md:justify-between">
              <p className="t-small max-w-2xl text-white/70">
                {site.payment.methods.join(", ")}. {site.payment.note}
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/precos"
                  className="t-label inline-block py-3 underline underline-offset-4"
                >
                  O que cada pacote inclui
                </Link>
                <a href={whatsappHref()} rel="nofollow" className="btn">
                  Agendar pelo WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="instrutor"
          className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-12 md:items-center md:py-24"
        >
          <Image
            src={montanha}
            alt={`${instructor.name} (${instructor.fullName}), piloto de voo duplo`}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[4/5] w-full object-cover md:col-span-5"
          />
          <div className="md:col-span-7 md:pl-8">
            <p className="t-label text-muted">Quem voa com você</p>
            <h2 className="t-h2 mt-3">{instructor.name}</h2>
            <p className="t-lead mt-6 max-w-xl">
              Todo voo do {site.name} é feito pelo {instructor.name} (
              {instructor.fullName}). Instrutor experiente, equipamentos de
              ponta e vistas panorâmicas do oceano, das praias e da Serra do
              Mar.
            </p>
            <dl className="mt-8 border-t border-rule">
              {[
                ["Certificação", instructor.certifications.join(" · ")],
                ["No clube", instructor.role],
                ["Especialidade", "Voo duplo com passageiro"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-6 border-b border-rule py-3.5">
                  <dt className="t-label w-32 shrink-0 pt-1 text-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <Link
                href="/instrutor"
                className="t-label text-ink underline underline-offset-4"
              >
                Sobre o piloto
              </Link>
              <Link
                href="/seguranca"
                className="t-label text-ink underline underline-offset-4"
              >
                Como cuidamos da segurança
              </Link>
            </p>
          </div>
        </section>

        <section id="videos" className="bg-fog">
          <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
            <p className="t-label text-sky">Vídeos incríveis</p>
            <h2 className="t-h2 mt-3">Assista ao voo</h2>
            <p className="t-lead mt-4 max-w-2xl text-muted">
              Momentos em voo sobre o litoral paulista — canal{" "}
              <a
                href={site.social.youtube}
                className="underline underline-offset-4"
                rel="noopener noreferrer"
                target="_blank"
              >
                @montanha.voolivre
              </a>
              .
            </p>
            <ul className="mt-10 grid gap-8 sm:grid-cols-3">
              {site.videos.map((video) => (
                <li key={video.id}>
                  <div className="aspect-video overflow-hidden bg-ink/10">
                    <iframe
                      title={video.title}
                      src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                      className="h-full w-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <h3 className="t-h3 mt-4">{video.title}</h3>
                  <p className="mt-1 text-sm text-muted">{video.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-paper">
          <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
            <h2 className="t-h2">O que nossos clientes dizem</h2>
            <ul className="mt-10 gap-10 md:mt-12 md:columns-3">
              {depoimentos.map((d) => (
                <li
                  key={d.nome}
                  className="mb-8 break-inside-avoid border-l-2 border-signal pl-5"
                >
                  <blockquote>{d.texto}</blockquote>
                  <p className="t-label mt-3 text-muted">{d.nome}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="clube" className="bg-fog">
          <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
            <p className="t-label text-sky">Nosso clube</p>
            <h2 className="t-h2 mt-3">
              CVLLP — Clube de Voo Livre do Litoral Paulista
            </h2>
            <p className="t-lead mt-4 max-w-2xl text-muted">
              Somos afiliados ao clube que reúne os pilotos e entusiastas do voo
              livre no litoral paulista. É daqui que a gente decola — e é aqui
              que você vai voar.
            </p>
            <ul className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                {
                  t: "Comunidade de pilotos",
                  d: "Um grupo apaixonado pelo voo livre que se encontra na rampa todo fim de semana.",
                },
                {
                  t: "Sítio de voo estruturado",
                  d: "Rampa homologada, área de pouso e infraestrutura no Morro do Itararé.",
                },
                {
                  t: "Segurança regulamentada",
                  d: "Operação sob RBAC 103 e regras do clube. Veja as observações de voo seguro.",
                },
              ].map((item) => (
                <li key={item.t} className="border-t border-rule pt-5">
                  <h3 className="t-h3">{item.t}</h3>
                  <p className="mt-2 text-muted">{item.d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link
                href="/seguranca"
                className="t-label text-ink underline underline-offset-4"
              >
                Observações gerais para um voo seguro
              </Link>
            </p>
          </div>
        </section>

        <section className="relative bg-ink text-white">
          <Image
            src={ilhaPraia}
            alt="Parapente em voo sobre a praia e o mar"
            sizes="100vw"
            placeholder="blur"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
            <div>
              <p className="t-label text-sun">Tempo e condições</p>
              <h2 className="t-statement mt-3 max-w-[22ch]">
                Sem condição segura, o voo é remarcado sem custo
              </h2>
              <p className="mt-5 max-w-md text-white/85">
                {site.hours.label}. {site.hours.note}
              </p>
              <p className="mt-6">
                <Link href="/condicoes-hoje" className="btn">
                  Ver a rampa ao vivo
                </Link>
              </p>
            </div>
            <div id="como-chegar">
              <p className="t-label text-sun">Como chegar</p>
              <address className="t-statement mt-3 not-italic">
                {site.address.street}
                <br />
                {site.address.city} — {site.address.state}
              </address>
              <p className="mt-5">
                <a
                  href={mapsUrl}
                  className="t-label underline underline-offset-4"
                >
                  Abrir no Google Maps
                </a>
              </p>
              <p className="mt-3">
                <Link
                  href="/como-chegar"
                  className="t-label underline underline-offset-4"
                >
                  Como chegar, de Santos ou de São Paulo
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section id="duvidas" className="mx-auto max-w-3xl px-5 py-16 md:py-24">
          <h2 className="t-h2">Dúvidas</h2>
          <div className="mt-8 border-t border-rule md:mt-10">
            {duvidas.map((d) => (
              <details key={d.q} className="border-b border-rule py-4">
                <summary className="flex items-start justify-between gap-6 font-semibold">
                  {d.q}
                  <span className="mais text-xl leading-none text-signal transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-muted">{d.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8">
            <Link
              href="/duvidas"
              className="t-label text-ink underline underline-offset-4"
            >
              Ver todas as dúvidas
            </Link>
          </p>
        </section>

        <section id="social" className="bg-fog">
          <div className="mx-auto max-w-7xl px-5 py-14 md:flex md:items-center md:justify-between">
            <div>
              <p className="t-label text-sky">Siga nossa aventura</p>
              <h2 className="t-h2 mt-2">{site.social.hashtag}</h2>
            </div>
            <ul className="mt-6 flex flex-wrap gap-6 md:mt-0">
              {[
                ["Instagram", site.social.instagram],
                ["Facebook", site.social.facebook],
                ["YouTube", site.social.youtube],
                ["TikTok", site.social.tiktok],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-label text-ink underline underline-offset-4"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-signal text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between">
            <h2 className="t-h2">Marque o seu voo</h2>
            <div className="flex flex-wrap items-center gap-6">
              <a href={whatsappHref()} rel="nofollow" className="btn btn-dark">
                WhatsApp {site.contact.phoneDisplay}
              </a>
              <a
                href={`tel:${site.contact.phoneE164}`}
                className="t-label inline-block py-3 underline underline-offset-4"
              >
                Ligar
              </a>
              <Link
                href="/agendar"
                className="t-label inline-block py-3 underline underline-offset-4"
              >
                Prefiro que me chamem
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppBar />
    </div>
  );
}
