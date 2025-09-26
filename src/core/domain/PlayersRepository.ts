import { Player } from "./Players";

export interface PlayerRepository {
  getAllPlayers(): Promise<Player[]>;
  getPlayerByTeam(team: string): Promise<Player[]>;
}
