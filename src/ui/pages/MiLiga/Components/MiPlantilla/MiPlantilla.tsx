import { useParams } from "react-router-dom";
import { useAuth } from "@core/auth/useAuth";
import { useMiPlantilla } from "@core/services/miPlantillaService";
import { useUsuariosByLigaId } from "@core/services/usuariosByLigaService";
import styles from "./MiPlantilla.module.scss";
import { Title } from "@ui/components/Common/Title/Title";
import { Button } from "@ui/components/Common/Button/Button";
import { Modal } from "@ui/components/Common/Modal/Modal";
import React, { useState } from "react";

export const MiPlantilla: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const {
    data: miPlantilla,
    isLoading,
    isError,
  } = useMiPlantilla(Number(user?.id), Number(id));
  const { data: usuarios } = useUsuariosByLigaId(Number(id));

  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  if (isLoading) return <div>Cargando mi plantilla...</div>;
  if (isError) return <div>Error al cargar mi plantilla</div>;

  const positionOrder = ["Portero", "Defensa", "Centrocampista", "Delantero"];
  const jugadoresOrdenados =
    miPlantilla?.jugadores
      ?.slice()
      .sort(
        (a, b) =>
          positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position),
      ) ?? [];

  const jugadorSeleccionado = jugadoresOrdenados.find(
    (j) => j.id === selectedPlayerId,
  );

  return (
    <div className={styles.container}>
      {jugadoresOrdenados.length === 0 ? (
        <div>No tienes jugadores en tu plantilla.</div>
      ) : (
        <>
          <Title level={1} align="center">
            {`Mi Plantilla de ${usuarios?.find((u) => u.id === Number(user?.id))?.username ?? ""}`}
          </Title>
          <table className={styles.statsTable}>
            <thead>
              <tr>
                <th>Posición</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Equipo</th>
                <th>Puntos</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {jugadoresOrdenados.map((player) => (
                <tr key={player.id}>
                  <td>{player.position}</td>
                  <td>
                    {player.image ? (
                      <img
                        src={player.image}
                        alt={player.name}
                        className={styles.imagen}
                      />
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td>{player.name}</td>

                  <td>{player.team}</td>
                  <td>{player.points}</td>
                  <td>{player.price}M</td>
                  <td>
                    <Button onClick={() => setSelectedPlayerId(player.id)}>
                      Vender
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {jugadorSeleccionado && (
        <Modal
          onClose={() => setSelectedPlayerId(null)}
          confirmText="Confirmar venta"
          backText="Cancelar"
          onConfirm={() => {
            // Falta la lógica de venta
            setSelectedPlayerId(null);
          }}
        >
          <h2>¿Quieres vender a {jugadorSeleccionado.name}?</h2>
          <p>Equipo: {jugadorSeleccionado.team}</p>
          <p>Precio: {jugadorSeleccionado.price}M</p>
        </Modal>
      )}
    </div>
  );
};
