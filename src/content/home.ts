import { formatBRL, site } from "./site";

export const nav = [
  { href: "/como-e-o-voo", label: "O voo" },
  { href: "/precos", label: "Preços" },
  { href: "/seguranca", label: "Segurança" },
  { href: "/duvidas", label: "Dúvidas" },
  { href: "/como-chegar", label: "Como chegar" },
];

export const paginas = [
  { href: "/como-e-o-voo", label: "Como é o voo" },
  { href: "/precos", label: "Preços" },
  { href: "/seguranca", label: "Segurança" },
  { href: "/duvidas", label: "Dúvidas" },
  { href: "/como-chegar", label: "Como chegar" },
  { href: "/instrutor", label: "O piloto" },
  { href: "/voo-de-parapente-santos", label: "Voo de parapente em Santos" },
  { href: "/parapente-perto-de-sao-paulo", label: "Parapente perto de São Paulo" },
  { href: "/quanto-custa-voo-de-parapente", label: "Quanto custa" },
  { href: "/condicoes-hoje", label: "Câmera ao vivo da rampa" },
  { href: "/agendar", label: "Agendar" },
  { href: "/privacidade", label: "Privacidade" },
];

export const etapas = [
  {
    id: "briefing",
    titulo: "Briefing",
    texto:
      "Antes de decolar, o piloto explica o equipamento, a corrida de decolagem e o pouso.",
  },
  {
    id: "decolagem",
    titulo: "Decolagem",
    texto: `Você corre alguns passos ao lado do piloto na ${site.takeoff}.`,
  },
  {
    id: "voo",
    titulo: "Voo",
    texto: `São ${site.flight.durationLabel} com vista para a Baixada Santista.`,
  },
  {
    id: "pouso",
    titulo: "Pouso",
    texto: `O pouso é na ${site.landing}.`,
  },
] as const;

export const duvidas = [
  {
    q: "O voo é em Santos ou em São Vicente?",
    a: `A decolagem é na ${site.takeoff}, em São Vicente, na divisa com Santos. O pouso é na ${site.landing}.`,
  },
  {
    q: "Quanto custa um voo de parapente?",
    a: `O ${site.packages[0].name} custa ${formatBRL(site.packages[0].price)}. Com filmagem, ${formatBRL(site.packages[1].price)} ou ${formatBRL(site.packages[2].price)}. ${site.payment.note}`,
  },
  {
    q: "Tem limite de peso?",
    a: `O peso máximo do passageiro é de ${site.limits.maxWeightKg} kg.`,
  },
  {
    q: "Qual a idade mínima? Criança pode voar?",
    a: `A partir de ${site.limits.minAge} anos. ${site.limits.minorsRule} Não há idade máxima para quem está em boas condições de saúde.`,
  },
  {
    q: "Quanto tempo dura o voo?",
    a: `O voo dura ${site.flight.durationLabel}, conforme as condições do dia. Reserve ${site.flight.totalTimeLabel}.`,
  },
  {
    q: "E se o tempo não estiver bom?",
    a: site.weatherPolicy,
  },
  {
    q: "Posso levar o celular para filmar?",
    a: `${site.limits.phoneRule} Quem quer imagens escolhe o ${site.packages[1].name} ou o ${site.packages[2].name}.`,
  },
  {
    q: "O que devo vestir?",
    a: site.limits.clothing,
  },
];

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.street}, ${site.address.city} - ${site.address.state}`,
)}`;

export const duvidasPorTema = [
  {
    tema: "Antes de marcar",
    itens: [
      duvidas[2],
      duvidas[3],
      {
        q: "Preciso de preparo físico?",
        a: "Não. Basta conseguir correr alguns passos na decolagem. Quem tem problema cardíaco ou está grávida deve consultar um médico antes de voar.",
      },
      {
        q: "Tenho medo de altura. Dá para voar?",
        a: "Voar sentado, preso ao piloto, é uma sensação diferente da de olhar para baixo do alto de um prédio, e muita gente com medo de altura voa e se surpreende. Conte ao piloto no briefing.",
      },
      {
        q: "Preciso agendar?",
        a: "Sim, pelo WhatsApp. Em fins de semana e feriados, agende com antecedência.",
      },
    ],
  },
  {
    tema: "O voo",
    itens: [
      duvidas[0],
      {
        q: "É salto de parapente? Vou pular?",
        a: "Não há salto nem queda livre. O parapente decola com a vela já aberta: você corre alguns passos na rampa, ao lado do piloto, e sai voando.",
      },
      duvidas[4],
      duvidas[5],
    ],
  },
  {
    tema: "No dia",
    itens: [duvidas[7], duvidas[6]],
  },
  {
    tema: "Preço e pagamento",
    itens: [
      duvidas[1],
      {
        q: "Quais formas de pagamento são aceitas?",
        a: `${site.payment.methods.join(", ")}. ${site.payment.note}`,
      },
    ],
  },
];

export const TELEFERICO_URL =
  "https://www.saovicente.sp.gov.br/visite-sao-vicente-1/o-que-fazer/teleferico-de-sao-vicente-1";
