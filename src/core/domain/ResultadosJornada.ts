export interface Equipo {
  id: number;
  name: string;
  camisetaEquipo?: string;
}

export interface PartidoJornada {
  id: number;
  local: Equipo;
  visitante: Equipo;
  golesLocal: number;
  golesVisitante: number;
}

export interface ResultadosJornada {
  jornada: number;
  partidos: PartidoJornada[];
}
