import { useQuery } from "@tanstack/react-query";
import { JsonUsuariosByLigaRepository } from "@core/infrastructure/JsonUsuariosByLigaRepository";

const repo = new JsonUsuariosByLigaRepository();

export function useUsuariosByLigaId(ligaId: number) {
  return useQuery({
    queryKey: ["usuariosByLiga", ligaId],
    queryFn: () => repo.getUsuariosByLigaId(ligaId),
  });
}
