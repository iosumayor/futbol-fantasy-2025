import { UsuariosByLiga } from "./UsuariosByLiga";

export interface UsuariosRepository {
  getUsuariosByLigaId(ligaId: number): Promise<UsuariosByLiga[]>;
}
