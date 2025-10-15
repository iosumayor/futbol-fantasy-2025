import { useQuery } from "@tanstack/react-query";
import { JsonPlayersRepository } from "../infrastructure/JsonPlayersRepository";

const repo = new JsonPlayersRepository();

export function usePlayers() {
  return useQuery({
    queryKey: ["players"],
    queryFn: () => repo.getAllPlayers(),
  });
}

export function usePlayer(id: number) {
  return useQuery({
    queryKey: ["player", id],
    queryFn: () => repo.getPlayerById(id),
  });
}
