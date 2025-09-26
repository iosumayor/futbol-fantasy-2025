import { Player } from "./Players";

export interface PlayerRepository {
  getAllPlayers(): Promise<Player[]>;
}
