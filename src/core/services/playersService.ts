import { useQuery } from "@tanstack/react-query";
import { JsonPlayersRepository } from "../infrastructure/JsonPlayersRepository";

const repo = new JsonPlayersRepository();

export function usePlayers() {
  return useQuery({
    queryKey: ["players"],
    queryFn: () => repo.getAllPlayers(),
  });
}
