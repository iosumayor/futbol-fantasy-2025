import { usePlayer } from "@core/services/playersService";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PlayerDetails.module.scss";
import { Title } from "@ui/components/Common/Title/Title";

export const PlayerDetails: React.FC = () => {
  const { id } = useParams();
  const { data: player, isLoading, isError } = usePlayer(Number(id));
  const navigate = useNavigate();

  if (isLoading) return <div>Cargando detalles del jugador...</div>;
  if (isError) return <div>Error al cargar detalles del jugador</div>;
  return (
    <>
      <button
        className={styles.returnButton}
        type="button"
        onClick={() => navigate("/players")}
        aria-label="Volver al listado de jugadores"
      >
        ← Volver al listado de jugadores
      </button>
      <div className={styles.detailsContainer}>
        <div className={styles.left}>
          {player?.imageDetail && (
            <img
              className={styles.playerImage}
              src={player.imageDetail}
              alt={player.name}
            />
          )}
          <Title level={2}>{player?.name}</Title>
        </div>
        <div className={styles.right}>
          <p>Posición: {player?.position}</p>
          <p>Equipo: {player?.team}</p>
          <p>Puntos: {player?.points}</p>
          <p>Precio: {player?.price}</p>
        </div>
      </div>
    </>
  );
};
