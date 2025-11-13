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
const formaciones = {
  "4-4-2": [
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
  ],
  "4-3-3": [
    { key: "portero", label: "Portero", position: "Portero" },
    { key: "defensa1", label: "Defensa", position: "Defensa" },
    { key: "defensa2", label: "Defensa", position: "Defensa" },
    { key: "defensa3", label: "Defensa", position: "Defensa" },
    { key: "defensa4", label: "Defensa", position: "Defensa" },
    { key: "medio1", label: "Centrocampista", position: "Centrocampista" },
    { key: "medio2", label: "Centrocampista", position: "Centrocampista" },
    { key: "medio3", label: "Centrocampista", position: "Centrocampista" },
    { key: "delantero1", label: "Delantero", position: "Delantero" },
    { key: "delantero2", label: "Delantero", position: "Delantero" },
    { key: "delantero3", label: "Delantero", position: "Delantero" },
  ],
};

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
  const [formacion, setFormacion] = useState<keyof typeof formaciones>("4-4-2");

  const posiciones = formaciones[formacion];

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

  const handleFormacionChange = (nuevaFormacion: keyof typeof formaciones) => {
    setFormacion(nuevaFormacion);
    setAlineacion((prev) => {
      /// Hace un array con las nuevas posiciones
      const nuevasPosiciones = formaciones[nuevaFormacion].map((p) => p.key);
      /// con prev, toma los valores de las anteriores posiciones que siguen existiendo
      const nuevaAlineacion: typeof prev = {};
      /// aplica los valores a la nuevas posiciones, asignando los valores previos si existen
      nuevasPosiciones.forEach((key) => {
        if (prev[key]) nuevaAlineacion[key] = prev[key];
      });
      return nuevaAlineacion;
    });
  };

  return (
    <div>
      <select
        value={formacion}
        onChange={(e) =>
          handleFormacionChange(e.target.value as keyof typeof formaciones)
        }
        title="Elige tu formacion"
        id="formacion-select"
      >
        <option value="4-4-2">Formación 4-4-2</option>
        <option value="4-3-3">Formación 4-3-3</option>
      </select>
      <Fondo>
        {posiciones.map((pos) => (
          <div
            key={pos.key}
            className={
              styles[`${pos.key}_formacion${formacion.replace(/-/g, "")}`]
            }
            onClick={() => setPosSeleccionada(pos.key)}
            style={{ cursor: "pointer" }}
          >
            {alineacion[pos.key] ? (
              <>
                <img
                  src={alineacion[pos.key]?.image}
                  alt={alineacion[pos.key]?.name}
                  className={styles.imagen}
                />
                <div className={styles.nombreBox}>
                  <span className={styles.nombreJugador}>
                    {alineacion[pos.key]?.shirtname ||
                      alineacion[pos.key]?.name}
                  </span>
                </div>
              </>
            ) : (
              <Button>+</Button>
            )}
          </div>
        ))}
      </Fondo>
      {posSeleccionada && (
        <Modal onClose={() => setPosSeleccionada(null)} backText="Cancelar">
          <Title level={3} align="center">
            Elige jugador para{" "}
            {posiciones.find((p) => p.key === posSeleccionada)?.label}
          </Title>
          {jugadoresDisponibles?.length === 0 ? (
            <div>No hay jugadores disponibles para esta posición.</div>
          ) : (
            <ul className={styles.selectorListado}>
              {jugadoresDisponibles?.map((jugador) => (
                <li key={jugador.id} className={styles.selectorItem}>
                  <img
                    src={jugador.image}
                    alt={jugador.name}
                    className={styles.imagen}
                  />
                  <span>{jugador.name}</span>
                  <Button onClick={() => handleSeleccionJugador(jugador)}>
                    Seleccionar
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Modal>
      )}
    </div>
  );
};
