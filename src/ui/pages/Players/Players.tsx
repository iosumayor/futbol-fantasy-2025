import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Players.module.scss";
import { usePlayers } from "../../../core/services/playersService";
import { Player } from "@core/domain/Players";

export const Players: React.FC = () => {
  const { data: players, isLoading, isError } = usePlayers();
  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("");
  const [showTeamFilter, setShowTeamFilter] = useState(false);
  const [teamFilter, setTeamFilter] = useState("");
  const [showPositionFilter, setShowPositionFilter] = useState(false);
  const [positionFilter, setPositionFilter] = useState<
    "Portero" | "Defensa" | "Centrocampista" | "Delantero" | ""
  >("");
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc">("asc");

  if (isLoading) return <div>Cargando jugadores...</div>;
  if (isError) return <div>Error al cargar jugadores</div>;

  const filters = [
    nameFilter
      ? (player: Player) =>
          player.name.toLowerCase().includes(nameFilter.toLowerCase())
      : undefined,
    showTeamFilter && teamFilter
      ? (player: Player) =>
          player.team.toLowerCase().includes(teamFilter.toLowerCase())
      : undefined,
    showPositionFilter && positionFilter
      ? (player: Player) => player.position === positionFilter
      : undefined,
  ].filter(Boolean);

  const filteredPlayers = (players ?? []).filter((player) =>
    filters.every((fn) => (fn as (player: Player) => boolean)(player)),
  );

  const sortedByPricePlayers = [...filteredPlayers].sort((a, b) =>
    priceOrder === "asc" ? a.price - b.price : b.price - a.price,
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Listado Jugadores</h2>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Filtrar por nombre"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <button
          className={showTeamFilter ? styles.active : ""}
          onClick={() => setShowTeamFilter((prev) => !prev)}
        >
          {showTeamFilter ? "Ocultar filtro equipo" : "Filtrar por equipo"}
        </button>
        {showTeamFilter && (
          <input
            type="text"
            placeholder="Filtrar por equipo"
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
          />
        )}
        <button
          className={showPositionFilter ? styles.active : ""}
          onClick={() => setShowPositionFilter((prev) => !prev)}
        >
          {showPositionFilter
            ? "Ocultar filtro posición"
            : "Filtrar por posición"}
        </button>
        {showPositionFilter && (
          <div className={styles.positionFilters}>
            {["Portero", "Defensa", "Centrocampista", "Delantero"].map(
              (pos) => (
                <button
                  key={pos}
                  className={positionFilter === pos ? styles.active : ""}
                  onClick={() =>
                    setPositionFilter(
                      pos as
                        | "Portero"
                        | "Defensa"
                        | "Centrocampista"
                        | "Delantero",
                    )
                  }
                >
                  {pos}
                </button>
              ),
            )}
            <button onClick={() => setPositionFilter("")}>Quitar filtro</button>
          </div>
        )}
      </div>
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
