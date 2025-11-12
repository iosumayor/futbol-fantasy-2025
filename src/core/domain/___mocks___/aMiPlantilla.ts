import { aPlayer } from "./aPlayers";

export function aMiPlantilla(options: Partial<any> = {}): any {
  const defaultMiPlantilla: any = {
    userId: 1,
    ligaId: 1,
    jugadores: [aPlayer(), aPlayer(), aPlayer()],
  };
  return { ...defaultMiPlantilla, ...options };
}
