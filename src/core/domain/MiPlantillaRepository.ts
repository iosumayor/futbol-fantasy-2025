import { MiPlantilla } from "./MiPlantilla";

export interface MiPlantillaRepository {
  getMiPlantilla(userId: number, ligaId: number): Promise<MiPlantilla | null>;
}
