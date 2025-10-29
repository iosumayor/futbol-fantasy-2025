```tsx
/// 1. Respuesta estándar (array de objetos)
import { PlayerRepository } from "../domain/PlayersRepository";
import { Player } from "../domain/Players";

export class ApiPlayersRepository implements PlayerRepository {
  async getAllPlayers(): Promise<Player[]> {
    const response = await fetch("https://api.tuservidor.com/players");
    const players: Player[] = await response.json();
    return players;
  }

  async getPlayerById(id: number): Promise<Player | null> {
    const response = await fetch(`https://api.tuservidor.com/players/${id}`);
    if (!response.ok) return null;
    const player: Player = await response.json();
    return player;
  }
}

///2. Respuesta con metadatos ({ data: [...], meta: {...} })

import { PlayerRepository } from "../domain/PlayersRepository";
import { Player } from "../domain/Players";

export class ApiPlayersRepository implements PlayerRepository {
  async getAllPlayers(): Promise<Player[]> {
    const response = await fetch("https://api.tuservidor.com/players");
    const result = await response.json();
    return result.data; // los datos están en result.data
  }

  async getPlayerById(id: number): Promise<Player | null> {
    const response = await fetch(`https://api.tuservidor.com/players/${id}`);
    if (!response.ok) return null;
    const result = await response.json();
    return result.data;
  }
}

/// 3. Respuesta paginada

import { PlayerRepository } from "../domain/PlayersRepository";
import { Player } from "../domain/Players";

export class ApiPlayersRepository implements PlayerRepository {
  async getAllPlayers(page: number = 1): Promise<Player[]> {
    const response = await fetch(
      `https://api.tuservidor.com/players?page=${page}`
    );
    const result = await response.json();
    return result.data; // los datos están en result.data
  }

  async getPlayerById(id: number): Promise<Player | null> {
    const response = await fetch(`https://api.tuservidor.com/players/${id}`);
    if (!response.ok) return null;
    const result = await response.json();
    return result.data;
  }
}

/// 4. Usando Axios

import { PlayerRepository } from "../domain/PlayersRepository";
import { Player } from "../domain/Players";
import axios from "axios";

export class ApiPlayersRepository implements PlayerRepository {
  async getAllPlayers(): Promise<Player[]> {
    const { data } = await axios.get("https://api.tuservidor.com/players");
    return data.data ?? data; // depende del formato de la API
  }

  async getPlayerById(id: number): Promise<Player | null> {
    try {
      const { data } = await axios.get(
        `https://api.tuservidor.com/players/${id}`
      );
      return data.data ?? data;
    } catch {
      return null;
    }
  }
}
```
