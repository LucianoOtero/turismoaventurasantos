// Contador de voos mantido do site anterior por decisão do proprietário:
// 1.542 voos em 01/01/2026, mais 2 por dia. Calculado no servidor.

const BASE = 1542;
const POR_DIA = 2;
const INICIO = Date.UTC(2026, 0, 1);
const DIA_MS = 24 * 60 * 60 * 1000;

export const voosRealizados = (agora: Date = new Date()) => {
  const dias = Math.max(0, Math.floor((agora.getTime() - INICIO) / DIA_MS));
  return BASE + POR_DIA * dias;
};

export const voosRealizadosLabel = (agora?: Date) =>
  voosRealizados(agora).toLocaleString("pt-BR");
