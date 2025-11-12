import { MiPlantilla } from "../MiPlantilla";
import { aPlayer } from "./aPlayers";

export function aMiPlantilla(options: Partial<MiPlantilla> = {}): MiPlantilla {
  const defaultMiPlantilla: MiPlantilla = {
    userId: 1,
    ligaId: 1,
    jugadores: [aPlayer(), aPlayer(), aPlayer()],
  };
  return { ...defaultMiPlantilla, ...options };
}
