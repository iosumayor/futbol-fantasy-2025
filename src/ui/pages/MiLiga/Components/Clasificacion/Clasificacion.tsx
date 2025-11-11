import React from "react";
import { useLigaById } from "@core/services/ligasService";
import { Title } from "@ui/components/Common/Title/Title";
import { useParams } from "react-router-dom";
import styles from "./Clasificacion.module.scss";
import { useUsuariosByLigaId } from "@core/services/usuariosByLigaService";

export const Clasificacion: React.FC = () => {
  const { id } = useParams();
  const { data: liga, isLoading, isError } = useLigaById(Number(id));
  const {
    data: usuarios,
    isLoading: usuariosLoading,
    isError: usuariosError,
  } = useUsuariosByLigaId(Number(id));

  if (isLoading || usuariosLoading)
    return <div>Cargando clasificacion de la liga...</div>;
  if (isError || usuariosError)
    return <div>Error al cargar la clasificacion de la liga</div>;

  const usuariosOrdenadosPorPuntos = usuarios?.sort(
    (a, b) => b.points - a.points,
  );

  return (
    <div>
      <Title align="center" level={1}>
        Clasificacion de la liga de {liga?.name}
      </Title>
      <ul className={styles.clasificacionList}>
        {usuariosOrdenadosPorPuntos?.map((usuarios, index) => (
          <li key={usuarios.id} className={styles.clasificacionItem}>
            <span className={styles.position}>{index + 1}.</span>
            <span className={styles.username}>{usuarios.username}</span>
            <span className={styles.points}>{usuarios.points} puntos</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
