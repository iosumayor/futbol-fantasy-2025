import { JsonMiPlantillaRepository } from "@core/infrastructure/JsonMiPlantillaRepository";
import { useQuery } from "@tanstack/react-query";

const repo = new JsonMiPlantillaRepository();

export function useMiPlantilla(userId: number, ligaId: number) {
  return useQuery({
    queryKey: ["plantilla", userId, ligaId],
    queryFn: () => repo.getMiPlantilla(userId, ligaId),
  });
}
