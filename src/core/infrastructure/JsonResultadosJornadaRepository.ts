import { ResultadosJornada } from "@core/domain/ResultadosJornada";
import { ResultadosJornadasRepository } from "@core/domain/ResultadosJornadasRepository";
import resultadosJornadaData from "../../data/resultadosJornada.json";

export class JsonResultadosJornadaRepository
  implements ResultadosJornadasRepository
{
  async getResultadosJornada(
    jornada: number,
  ): Promise<ResultadosJornada | null> {
    const resultado = resultadosJornadaData.find(
      (r: any) => r.jornada === jornada,
    );
    if (!resultado) return null;

    return {
      jornada: resultado.jornada,
      partidos: resultado.partidos.map((partido: any) => ({
        id: partido.id,
        local: {
          id: partido.local.id,
          name: partido.local.name,
          camisetaEquipo: partido.local.camisetaEquipo
            ? partido.local.camisetaEquipo
            : "https://img.ex.co/image/upload/q_auto:good,f_auto,fl_lossy,w_640,c_limit,dpr_1.5/v1694684162/jqegiy1qa7udulxetjdm.png",
        },
        visitante: {
          id: partido.visitante.id,
          name: partido.visitante.name,
          camisetaEquipo: partido.visitante.camisetaEquipo
            ? partido.visitante.camisetaEquipo
            : "https://img.ex.co/image/upload/q_auto:good,f_auto,fl_lossy,w_640,c_limit,dpr_1.5/v1694684162/jqegiy1qa7udulxetjdm.png",
        },
        golesLocal: partido.golesLocal,
        golesVisitante: partido.golesVisitante,
      })),
    };
  }
}
