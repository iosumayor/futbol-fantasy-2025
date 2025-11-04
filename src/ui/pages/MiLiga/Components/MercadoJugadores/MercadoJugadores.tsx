import { useLigaById } from "@core/services/ligasService";
import { useAllPlayers } from "@core/services/playersService";
import { Title } from "@ui/components/Common/Title/Title";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MercadoJugadores.module.scss";
import { Button } from "@ui/components/Common/Button/Button";

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
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedPlayer(null)}
        >
          <div
            className={styles.modalContent}
            ///SI clickas dentro del modal no se cierra
            ///Si clickas fuera si
            onClick={(e) => e.stopPropagation()}
          >
            <h2>¿Quieres fichar a {selectedPlayer.name}?</h2>
            <p>Equipo: {selectedPlayer.team}</p>
            <p>Precio: {selectedPlayer.price}€</p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <Button
                variant="green"
                onClick={() => {
                  // lógica para fichar al jugador
                  setSelectedPlayer(null);
                }}
              >
                Fichar
              </Button>
              <Button variant="red" onClick={() => setSelectedPlayer(null)}>
                Volver atrás
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
