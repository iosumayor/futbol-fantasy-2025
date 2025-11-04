import { JsonLigasRepository } from "@core/infrastructure/JsonLigasRepository";
import { useQuery } from "@tanstack/react-query";

const repo = new JsonLigasRepository();

export function useAllLigas() {
  return useQuery({
    queryKey: ["ligas"],
    queryFn: () => repo.getAllLigas(),
  });
}

export function useLigaById(id: number) {
  return useQuery({
    queryKey: ["liga", id],
    queryFn: () => repo.getLigaById(id),
  });
}
