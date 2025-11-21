import { MiPlantilla } from "@core/domain/MiPlantilla";
import { MiPlantillaRepository } from "@core/domain/MiPlantillaRepository";
import { PlayerPosition } from "@core/domain/Players";
import miPlantillaData from "../../data/miPlantilla.json";

export class JsonMiPlantillaRepository implements MiPlantillaRepository {
  async getMiPlantilla(
    userId: number,
    ligaId: number,
  ): Promise<MiPlantilla | null> {
    const plantilla = miPlantillaData.find(
      (p) => p.userId === userId && p.ligaId === ligaId,
    );
    if (!plantilla) return null;

    // Mapea los jugadores para forzar el tipo de position
    // Ya que al importar desde JSON pierde el tipo específico

    return {
      ...plantilla,
      jugadores: plantilla.jugadores.map((j) => ({
        ...j,
        position: j.position as PlayerPosition,
        image:
          j.image === undefined
            ? "https://assets.laliga.com/assets/public/backgrounds/avatar-noplayer-2.png"
            : j.image,
      })),
    };
  }
}
