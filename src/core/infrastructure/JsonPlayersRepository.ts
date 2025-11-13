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
      image:
        player.image === undefined
          ? "https://assets.laliga.com/assets/public/backgrounds/avatar-noplayer-2.png"
          : player.image,
      imageDetail: player.imageDetail,
    }));

    return players;
  }

  async getPlayerById(id: number): Promise<Player | null> {
    const players = await this.getAllPlayers();
    const player = players.find((p) => p.id === id) || null;
    return player;
  }
}
