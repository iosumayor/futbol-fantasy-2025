import { PlayerRepository } from "../domain/PlayersRepository";
import { Player } from "../domain/Players";
import playersData from "../../data/player.json";

export class JsonPlayersRepository implements PlayerRepository {
  async getAllPlayers(): Promise<Player[]> {
    const players: Player[] = playersData.map((player: any) => ({
      id: player.id,
      name: player.name,
      position: player.position,
      team: player.team,
      points: player.points ?? 0,
      price: player.precio ?? 0,
      image: player.image,
    }));

    return players;
  }
}
