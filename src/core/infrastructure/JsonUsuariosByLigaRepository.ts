import { UsuariosByLiga } from "@core/domain/UsuariosByLiga";
import { UsuariosRepository } from "@core/domain/UsuariosRepository";
import usuariosData from "../../data/usuariosByLiga.json";

export class JsonUsuariosByLigaRepository implements UsuariosRepository {
  async getUsuariosByLigaId(ligaId: number): Promise<UsuariosByLiga[]> {
    const usuariosByLiga: UsuariosByLiga[] = usuariosData.filter(
      (usuario) => usuario.ligaId === ligaId,
    );
    return usuariosByLiga;
  }
}
