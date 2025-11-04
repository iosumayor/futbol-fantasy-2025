import { LigaRepository } from "@core/domain/LigasRepository";
import ligasData from "../../data/ligas.json";
import { Liga } from "@core/domain/Ligas";

export class JsonLigasRepository implements LigaRepository {
  async getAllLigas(): Promise<Liga[]> {
    const ligas: Liga[] = ligasData.map((liga: any) => ({
      id: liga.id,
      name: liga.name,
      description: liga.description,
    }));
    return ligas;
  }
  async getLigaById(id: number): Promise<Liga | null> {
    const ligas = await this.getAllLigas();
    const liga = ligas.find((l) => l.id === id) || null;
    return liga;
  }
}
