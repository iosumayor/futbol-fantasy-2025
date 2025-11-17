import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { Title } from "@ui/components/Common/Title/Title";
import { useLigaById } from "@core/services/ligasService";
import styles from "./PaginaGeneralMiLiga.module.scss";

const mockResultadosJornada = [
  {
    jornada: 1,
    partidos: [
      {
        local: "Real Madrid",
        visitante: "Barcelona",
        golesLocal: 2,
        golesVisitante: 1,
      },
      {
        local: "Valencia",
        visitante: "Sevilla",
        golesLocal: 0,
        golesVisitante: 0,
      },
      {
        local: "Atlético de Madrid",
        visitante: "Villarreal",
        golesLocal: 1,
        golesVisitante: 2,
      },
      {
        local: "Real Betis",
        visitante: "Real Sociedad",
        golesLocal: 3,
        golesVisitante: 1,
      },
    ],
  },
  {
    jornada: 2,
    partidos: [
      {
        local: "Barcelona",
        visitante: "Valencia",
        golesLocal: 3,
        golesVisitante: 2,
      },
      {
        local: "Sevilla",
        visitante: "Real Madrid",
        golesLocal: 1,
        golesVisitante: 2,
      },
      {
        local: "Villarreal",
        visitante: "Real Betis",
        golesLocal: 0,
        golesVisitante: 0,
      },
      {
        local: "Real Sociedad",
        visitante: "Atlético de Madrid",
        golesLocal: 2,
        golesVisitante: 2,
      },
    ],
  },
];

export const PaginaGeneralMiLiga: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useLigaById(Number(id));
  const [jornadaActual, setJornadaActual] = useState(
    mockResultadosJornada[0].jornada,
  );

  if (isLoading) return <div>Cargando liga...</div>;
  if (isError) return <div>Error al cargar la liga</div>;

  const jornadaSeleccionada = mockResultadosJornada.find(
    (j) => j.jornada === jornadaActual,
  );

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
          disabled={jornadaActual === mockResultadosJornada[0].jornada}
          onClick={() => setJornadaActual(jornadaActual - 1)}
        >
          ⬅
        </button>
        {mockResultadosJornada.map((jornada) => (
          <button
            key={jornada.jornada}
            className={`${styles.jornadaBtn} ${jornadaActual === jornada.jornada ? styles["jornadaBtn--active"] : ""}`}
            onClick={() => setJornadaActual(jornada.jornada)}
            aria-label={`Jornada ${jornada.jornada}`}
          >
            {jornada.jornada}
          </button>
        ))}
        <button
          className={styles.jornadaBtn}
          disabled={
            jornadaActual ===
            mockResultadosJornada[mockResultadosJornada.length - 1].jornada
          }
          onClick={() => setJornadaActual(jornadaActual + 1)}
        >
          ➡
        </button>
      </div>
      <div className={styles.resultadosLista}>
        <ul>
          {jornadaSeleccionada?.partidos.map((partido, index) => (
            <li key={index} className={styles.resultadoItem}>
              <span className={styles.equipo}>{partido.local}</span>
              <span className={styles.marcador}>
                {partido.golesLocal} - {partido.golesVisitante}
              </span>
              <span className={styles.equipo}>{partido.visitante}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
