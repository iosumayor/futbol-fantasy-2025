import { Player } from "./Players";

export interface MiPlantilla {
  userId: number;
  ligaId: number;
  jugadores: Player[];
}
