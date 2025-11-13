import { useMiPlantilla } from "@core/services/miPlantillaService";
import { Fondo } from "./components/Fondo";
import React, { useState } from "react";
import { useAuth } from "@core/auth/useAuth";
import { useParams } from "react-router-dom";
import { Player } from "@core/domain/Players";
import { Title } from "@ui/components/Common/Title/Title";
import { Modal } from "@ui/components/Common/Modal/Modal";
import styles from "./MiOnce.module.scss";
import { Button } from "@ui/components/Common/Button/Button";

/// De momnento solo se prueba con una formacion
const posiciones = [
  { key: "portero", label: "Portero", position: "Portero" },
  { key: "defensa1", label: "Defensa", position: "Defensa" },
  { key: "defensa2", label: "Defensa", position: "Defensa" },
  { key: "defensa3", label: "Defensa", position: "Defensa" },
  { key: "defensa4", label: "Defensa", position: "Defensa" },
  { key: "medio1", label: "Centrocampista", position: "Centrocampista" },
  { key: "medio2", label: "Centrocampista", position: "Centrocampista" },
  { key: "medio3", label: "Centrocampista", position: "Centrocampista" },
  { key: "medio4", label: "Centrocampista", position: "Centrocampista" },
  { key: "delantero1", label: "Delantero", position: "Delantero" },
  { key: "delantero2", label: "Delantero", position: "Delantero" },
];

export const MiOnce: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const {
    data: miPlantilla,
    isLoading,
    isError,
  } = useMiPlantilla(Number(user?.id), Number(id));

  const [alineacion, setAlineacion] = useState<{ [key: string]: any }>({});
  const [posSeleccionada, setPosSeleccionada] = useState<string | null>(null);

  if (isLoading) {
    return <div>Cargando la plantilla...</div>;
  }

  if (isError) {
    return <div>Error al cargar la plantilla.</div>;
  }

  const jugadoresDisponibles = posSeleccionada
    ? miPlantilla?.jugadores.filter(
        (jugador) =>
          jugador.position ===
            posiciones.find((posicion) => posicion.key === posSeleccionada)
              ?.position &&
          !Object.values(alineacion).some(
            (asignado) => asignado?.id === jugador.id,
          ),
      )
    : [];

  const handleSeleccionJugador = (jugador: Player) => {
    setAlineacion((prev) => ({ ...prev, [posSeleccionada!]: jugador }));
    setPosSeleccionada(null);
  };

  return (
    <div>
      <Fondo>
        {posiciones.map((pos) => (
          <div
            key={pos.key}
            className={styles[pos.key]}
            onClick={() => setPosSeleccionada(pos.key)}
            style={{ cursor: "pointer" }}
          >
            {alineacion[pos.key]?.name || pos.label}
          </div>
        ))}
      </Fondo>
      {posSeleccionada && (
        <Modal
          onClose={() => setPosSeleccionada(null)}
          confirmText="Alinear"
          backText="Cancelar"
        >
          <Title level={3} align="center">
            Elige jugador para{" "}
            {posiciones.find((p) => p.key === posSeleccionada)?.label}
          </Title>
          {jugadoresDisponibles?.length === 0 ? (
            <div>No hay jugadores disponibles para esta posición.</div>
          ) : (
            jugadoresDisponibles?.map((jugador) => (
              <Button
                key={jugador.id}
                onClick={() => handleSeleccionJugador(jugador)}
              >
                {jugador.name}
              </Button>
            ))
          )}
        </Modal>
      )}
    </div>
  );
};
