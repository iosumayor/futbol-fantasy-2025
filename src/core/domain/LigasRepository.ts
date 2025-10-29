import { Liga } from "./Ligas";

export interface LigaRepository {
  getAllLigas(): Promise<Liga[]>;
  getLigaById(id: number): Promise<Liga | null>;
}
