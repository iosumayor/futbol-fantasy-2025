import React from "react";
import styles from "./Players.module.scss";
import { usePlayers } from "./usePlayers";
import { Title } from "@ui/components/Common/Title/Title";
import { Filters } from "./components/FilterComponent";
///TODO: se podria crear algun componennte para la tabla
///Pensar si valdria la pena

export const Players: React.FC = () => {
  const {
    sortedByPricePlayers,
    priceOrder,
    setPriceOrder,
    navigate,
    nameFilter,
    setNameFilter,
    showTeamFilter,
    setShowTeamFilter,
    teamFilter,
    setTeamFilter,
    showPositionFilter,
    setShowPositionFilter,
    positionFilter,
    setPositionFilter,
    isLoading,
    isError,
  } = usePlayers();

  if (isLoading) return <div>Cargando jugadores...</div>;
  if (isError) return <div>Error al cargar jugadores</div>;

  return (
    <div className={styles.container}>
      <Title level={1} align="center">
        Listado Jugadores
      </Title>
      <Filters
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        showTeamFilter={showTeamFilter}
        setShowTeamFilter={setShowTeamFilter}
        teamFilter={teamFilter}
        setTeamFilter={setTeamFilter}
        showPositionFilter={showPositionFilter}
        setShowPositionFilter={setShowPositionFilter}
        positionFilter={positionFilter}
        setPositionFilter={setPositionFilter}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Puntos</th>
            <th>Equipo</th>
            <th>Posición</th>
            <th>
              Precio
              <button
                aria-label="Ordenar por precio"
                className={styles.priceButton}
                onClick={() =>
                  setPriceOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
              >
                {priceOrder === "asc" ? "↑" : "↓"}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedByPricePlayers.map((player) => (
            <tr
              key={player.id}
              className={styles.clickableRow}
              onClick={() => navigate(`/players/${player.id}`)}
            >
              <td>
                {player.image && (
                  <img
                    src={player.image}
                    alt={player.name}
                    className={styles.playerImage}
                  />
                )}
              </td>
              <td>{player.name}</td>
              <td>{player.points} puntos</td>
              <td>{player.team}</td>
              <td>{player.position}</td>
              <td>{player.price} €</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
