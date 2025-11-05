import { useLigaById } from "@core/services/ligasService";
import { useAllPlayers } from "@core/services/playersService";
import { Title } from "@ui/components/Common/Title/Title";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MercadoJugadores.module.scss";
import { Button } from "@ui/components/Common/Button/Button";
import { Modal } from "@ui/components/Common/Modal/Modal";

export const MercadoJugadores: React.FC = () => {
  const { id } = useParams();
  const { data: liga, isLoading, isError } = useLigaById(Number(id));
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const {
    data: players,
    isLoading: playersLoading,
    isError: playersError,
  } = useAllPlayers();

  if (isLoading || playersLoading)
    return <div>Cargando mercado de jugadores...</div>;
  if (isError || playersError)
    return <div>Error al cargar el mercado de jugadores</div>;

  ///TODO: Faltaría añadir la lógica de que se muestre los jugadores 24 horas
  ///Para luego cambiar a un nuevo mercado
  const randomizedPlayers = players
    ?.sort(() => Math.random() - 0.5)
    .slice(0, 8);

  return (
    <div>
      <Title level={1} align="center">
        Mercado de Jugadores de {liga?.name}
      </Title>
      <ul className={styles.listado}>
        {randomizedPlayers?.map((player) => (
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
            <Button
              variant="blue"
              onClick={() => setSelectedPlayer(player)}
              style={{ marginLeft: "auto" }}
            >
              Fichar
            </Button>
          </li>
        ))}
      </ul>
      {selectedPlayer && (
        <Modal
          onClose={() => setSelectedPlayer(null)}
          confirmText="Fichar"
          backText="Volver atrás"
        >
          <h2>¿Quieres fichar a {selectedPlayer.name}?</h2>
          <p>Equipo: {selectedPlayer.team}</p>
          <p>Precio: {selectedPlayer.price}€</p>
        </Modal>
      )}
    </div>
  );
};
