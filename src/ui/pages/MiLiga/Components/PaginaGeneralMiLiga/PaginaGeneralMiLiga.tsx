import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { Title } from "@ui/components/Common/Title/Title";
import { useLigaById } from "@core/services/ligasService";
import styles from "./PaginaGeneralMiLiga.module.scss";
import { useResultadosJornada } from "@core/services/resultadosJornadaService";

export const PaginaGeneralMiLiga: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useLigaById(Number(id));
  const [jornadaActual, setJornadaActual] = useState(1);
  const {
    data: resultadosJornadaData,
    isLoading: isLoadingResultados,
    isError: isErrorResultados,
  } = useResultadosJornada(jornadaActual);

  if (isLoading || isLoadingResultados)
    return <div>Cargando resultados...</div>;
  if (isError || isErrorResultados)
    return <div>Error al cargar los resultados</div>;

  if (isLoading || isLoadingResultados)
    return <div>Cargando resultados...</div>;
  if (isError || isErrorResultados)
    return <div>Error al cargar los resultados</div>;

  const TOTAL_JORNADAS = 4;

  return (
    <>
      <Title align="center" level={1}>
        {data?.name}
      </Title>
      <></>
      {data?.description && (
        <>
          <Title align="center" level={2}>
            {data.description}
          </Title>
          <Title align="center" level={3}>
            Resultados de la Jornada {jornadaActual}
          </Title>
        </>
      )}
      <div className={styles.jornadasNav}>
        <button
          className={styles.jornadaBtn}
          disabled={jornadaActual === 1}
          onClick={() => setJornadaActual(jornadaActual - 1)}
        >
          ⬅
        </button>
        {Array.from({ length: TOTAL_JORNADAS }, (_, i) => (
          <button
            key={i + 1}
            className={`${styles.jornadaBtn} ${jornadaActual === i + 1 ? styles["jornadaBtn--active"] : ""}`}
            onClick={() => setJornadaActual(i + 1)}
            aria-label={`Jornada ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={styles.jornadaBtn}
          disabled={jornadaActual === TOTAL_JORNADAS}
          onClick={() => setJornadaActual(jornadaActual + 1)}
        >
          ➡
        </button>
      </div>
      <div className={styles.resultadosLista}>
        <ul>
          {resultadosJornadaData?.partidos.map((partido, index) => (
            <li key={index} className={styles.resultadoItem}>
              <span className={styles.equipo}>
                {partido.local.camisetaEquipo && (
                  <img
                    src={partido.local.camisetaEquipo}
                    alt={`${partido.local.name} camiseta`}
                  />
                )}
                {partido.local.name}
              </span>
              <span className={styles.marcador}>
                {partido.golesLocal} - {partido.golesVisitante}
              </span>
              <span className={styles.equipo}>
                {partido.visitante.camisetaEquipo && (
                  <img
                    src={partido.visitante.camisetaEquipo}
                    alt={`${partido.visitante.name} camiseta`}
                  />
                )}
                {partido.visitante.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
