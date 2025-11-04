import { useLigaById } from "@core/services/ligasService";
import { useAllPlayers } from "@core/services/playersService";
import { Title } from "@ui/components/Common/Title/Title";
import React from "react";
import { useParams } from "react-router-dom";
import styles from "./MercadoJugadores.module.scss";

export const MercadoJugadores: React.FC = () => {
  const { id } = useParams();
  const { data: liga, isLoading, isError } = useLigaById(Number(id));
  const {
    data: players,
    isLoading: playersLoading,
    isError: playersError,
  } = useAllPlayers();

  if (isLoading || playersLoading)
    return <div>Cargando mercado de jugadores...</div>;
  if (isError || playersError)
    return <div>Error al cargar el mercado de jugadores</div>;

  return (
    <div>
      <Title level={1} align="center">
        Mercado de Jugadores de {liga?.name}
      </Title>
      <ul className={styles.listado}>
        {players?.map((player) => (
          <li key={player.id} className={styles.item}>
            {player.image && (
              <img
                src={player.image}
                alt={player.name}
                className={styles.imagen}
              />
            )}
            <span className={styles.nombre}>{player.name}</span>
            <span className={styles.posicion}>Posición: {player.position}</span>
            <span className={styles.precio}>Precio: {player.price}€</span>
          </li>
        ))}
      </ul>
      {/* Aquí iría el resto del componente del mercado de jugadores */}
    </div>
  );
};
