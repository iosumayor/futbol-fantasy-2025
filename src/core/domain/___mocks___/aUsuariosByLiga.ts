import { UsuariosByLiga } from "../UsuariosByLiga";

export function aUsuariosByLiga(
  options: Partial<UsuariosByLiga> = {},
): UsuariosByLiga {
  const defaultUsuario: UsuariosByLiga = {
    id: 1,
    username: "irrelevantUsuario",
    points: 0,
    ligaId: 1,
  };
  return { ...defaultUsuario, ...options };
}
