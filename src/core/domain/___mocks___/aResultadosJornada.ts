import { ResultadosJornada } from "../ResultadosJornada";

export function aResultadosJornada(
  options: Partial<ResultadosJornada> = {},
): ResultadosJornada {
  const defaultResultadosJornada: ResultadosJornada = {
    jornada: 99,
    partidos: [
      {
        id: 999,
        local: {
          id: 100,
          name: "Irrelevant Local",
          camisetaEquipo: "/assets/irrelevantLocalCami.png",
        },
        visitante: {
          id: 101,
          name: "Irrelevant Visitante",
          camisetaEquipo: "/assets/irrelevantVisitanteCami.png",
        },
        golesLocal: 9,
        golesVisitante: 8,
      },
    ],
  };
  return { ...defaultResultadosJornada, ...options };
}
