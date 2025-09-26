import { Player } from "../Players";

export function aPlayer(options: Partial<Player> = {}): Player {
  const defaultPlayer: Player = {
    id: 1,
    name: "irrelevantPlayer",
    position: "delantero",
    team: "Equipo Test",
    points: 0,
  };

  return { ...defaultPlayer, ...options };
}
