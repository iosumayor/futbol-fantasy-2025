import { JsonResultadosJornadaRepository } from "../infrastructure/JsonResultadosJornadaRepository";
import { useQuery } from "@tanstack/react-query";

const repo = new JsonResultadosJornadaRepository();

export function useResultadosJornada(jornada: number) {
  return useQuery({
    queryKey: ["resultadosJornada", jornada],
    queryFn: () => repo.getResultadosJornada(jornada),
  });
}
