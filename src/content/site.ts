// Fonte única dos dados do negócio. Páginas, metadados e JSON-LD leem daqui,
// para que preço, horário, limites e contato nunca divirjam entre si.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.turismoaventurasantos.com.br"
).replace(/\/$/, "");

// Só o domínio oficial deve ser indexado; previews ficam fora da busca.
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const site = {
  name: "Turismo Aventura Santos",
  tagline: "Voo Livre em Santos",
  description:
    "Voo duplo de parapente com decolagem no Morro do Itararé, a minutos de Santos. A partir de R$ 400, com o piloto Montanha — vista do litoral paulista.",

  contact: {
    whatsapp: "5511949202000",
    whatsappMessage:
      "Olá! Quero agendar um voo duplo com o Turismo Aventura Santos. Pode me passar os horários?",
    phoneDisplay: "(11) 94920-2000",
    phoneE164: "+5511949202000",
    email: "montanha.voolivre@gmail.com",
  },

  social: {
    instagram: "https://www.instagram.com/Montanha.voolivre",
    facebook: "https://www.facebook.com/marco.antonelli.9889",
    youtube: "https://www.youtube.com/@montanha.voolivre",
    tiktok: "https://www.tiktok.com/@montanha.voolivre",
    hashtag: "#TurismoAventuraSantos",
  },

  address: {
    street: "R. Cinco, 1210 - Morro do Itararé",
    city: "São Vicente",
    state: "SP",
    postalCode: "11321-000",
    country: "BR",
  },

  takeoff: "rampa do Clube de Voo Livre do Litoral Paulista, no Morro do Itararé",
  landing: "Praia do Itararé, em São Vicente",

  hours: {
    label: "Todos os dias, das 10:00 até o pôr do sol",
    note: "Com agendamento prévio e sujeito às condições do tempo.",
    opens: "10:00",
    closes: "18:00",
  },

  flight: {
    durationLabel: "de 3 a 20 minutos",
    totalTimeLabel: "cerca de 1 hora, contando briefing e preparação",
  },

  limits: {
    maxWeightKg: 130,
    minAge: 14,
    minorsRule:
      "Menores de 18 anos voam acompanhados do responsável legal, que assina a autorização. Idade mínima: 14 anos, com documento.",
    phoneRule: "Por segurança, não é permitido levar o celular no voo.",
    clothing:
      "Roupa confortável e tênis ou calçado com solado emborrachado. É proibido traje de banho e chinelo, sandália ou papete.",
  },

  weatherPolicy:
    "Se o tempo não oferecer condição segura, o voo é reagendado sem nenhum custo.",

  webcam: {
    streamUrl: "https://camera.clubecvllp.com.br/cam1/index.m3u8",
    conditions:
      "Os voos pedem vento moderado, entre 15 e 30 km/h, soprando do mar para o morro. Não há voo com chuva, neblina intensa ou vento muito forte.",
  },

  instructor: {
    name: "Montanha",
    fullName: "Marco Antonelli",
    yearsOfExperience: 20,
    flights: 3000,
    certifications: [
      "Confederação Brasileira de Voo Livre (CBVL)",
      "Piloto Experimente certificado",
    ],
    role: "Piloto de voo duplo no Clube de Voo Livre do Litoral Paulista",
  },

  packages: [
    {
      id: "vip",
      name: "Voo VIP",
      price: 400,
      includes: [
        "Instrutor certificado",
        "Equipamentos de segurança",
        "Briefing completo",
        "Vista do litoral paulista",
      ],
    },
    {
      id: "premium",
      name: "Voo Premium",
      price: 550,
      includes: [
        "Tudo do Voo VIP",
        "Fotos e vídeos do voo",
        "Entrega digital",
      ],
    },
    {
      id: "360",
      name: "Voo 360º",
      price: 650,
      includes: [
        "Tudo do Voo VIP",
        "Filmagem 4K em 360º",
        "Entrega digital",
      ],
    },
  ],

  payment: {
    methods: ["Dinheiro", "PIX", "Cartão de crédito", "Cartão de débito"],
    note: "Mesmo valor em qualquer forma de pagamento. No cartão, em até 12x com juros.",
  },

  videos: [
    {
      id: "uPf9EtKCzHI",
      title: "Aventura de Parapente",
      description: "As melhores vistas sobre o litoral.",
    },
    {
      id: "tmO50jn4kTM",
      title: "Experiência de Voo Livre",
      description: "A sensação de liberdade nas alturas.",
    },
    {
      id: "x_eGDmcUyr4",
      title: "Vista do Litoral",
      description: "O litoral paulista em perspectiva única.",
    },
  ],

  safetyRules: [
    "Idade mínima para Voo de Introdução: 14 anos, com apresentação de documento.",
    "É PROIBIDO trajes de banho (sunga, biquíni…) e calçados inadequados (chinelo, sandália, papete…).",
    "É OBRIGATÓRIO o uso de tênis ou calçado com solado emborrachado.",
    "O voo tem duração de 3 a 20 minutos, conforme condições meteorológicas, momento da decolagem e movimento na rampa.",
    "É PROIBIDO a prática de voo triplo (piloto + 2 passageiros).",
    "Nos voos de Introdução estão inclusos: taxa operacional do CVLLP, seguro (piloto e aluno passageiro), EQPS homologados e revisados, e piloto Experimente certificado.",
    "O CVLLP não se responsabiliza por serviços de fotos e vídeos ofertados pelos pilotos.",
    "O CVLLP segue o RBAC 103 (ANAC) e a Lei Municipal 2656-A (PMSV).",
  ],
} as const;

export type Package = (typeof site.packages)[number];

export const whatsappMensagens = {
  agendar: site.contact.whatsappMessage,
  hoje: "Olá! Dá voo de parapente hoje com o Turismo Aventura Santos?",
  vip: "Olá! Quero agendar o Voo VIP.",
  premium: "Olá! Quero agendar o Voo Premium (com fotos e vídeos).",
  "360": "Olá! Quero agendar o Voo 360º.",
} as const;

export const whatsappUrl = (message: string = site.contact.whatsappMessage) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const whatsappHref = (
  chave: keyof typeof whatsappMensagens = "agendar",
) => (chave === "agendar" ? "/whatsapp" : `/whatsapp?m=${chave}`);

export const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
