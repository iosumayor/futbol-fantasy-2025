import { ResultadosJornada } from "./ResultadosJornada";

export interface ResultadosJornadasRepository {
  getResultadosJornada(jornada: number): Promise<ResultadosJornada | null>;
}
