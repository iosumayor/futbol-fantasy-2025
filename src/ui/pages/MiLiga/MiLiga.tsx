import React from "react";
import styles from "./MiLiga.module.scss";
import { useAllLigas } from "@core/services/ligasService";
import { Title } from "@ui/components/Common/Title/Title";
import { useNavigate } from "react-router-dom";

export const MiLiga: React.FC = () => {
  const { data: ligas, isLoading, error } = useAllLigas();
  const navigate = useNavigate();

  if (isLoading) return <div>Cargando ligas...</div>;
  if (error) return <div>Error al cargar ligas</div>;

  return (
    <div className={styles.container}>
      <Title align="center" level={1}>
        Mis Ligas
      </Title>
      <ul className={styles.ligasLista}>
        {ligas?.map((liga) => (
          <li
            key={liga.id}
            className={styles.item}
            onClick={() => navigate(`/liga/${liga.id}`)}
            tabIndex={0}
            role="button"
          >
            {liga.name}
            {liga.description && <p>Descripcion: {liga.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};
