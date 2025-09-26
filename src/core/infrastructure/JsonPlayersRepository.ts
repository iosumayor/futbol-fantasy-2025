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
    }));

    return players;
  }

  async getPlayerByTeam(team: string): Promise<Player[]> {
    const players = await this.getAllPlayers();
    return players.filter((player) => player.team === team);
  }
}
