import React, { useState } from "react";
import { NavBar } from "../../components/NavBar";
import { usePlayers } from "../../../core/services/playersService";
import { Player } from "@core/domain/Players";

export const Players: React.FC = () => {
  const { data: players, isLoading, isError } = usePlayers();
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
    filters.every((fn) => fn!(player)),
  );

  const sortedByPricePlayers = [...filteredPlayers].sort((a, b) =>
    priceOrder === "asc" ? a.price - b.price : b.price - a.price,
  );

  return (
    <div>
      <h2>Listado Jugadores</h2>
      <NavBar />
      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <button onClick={() => setShowTeamFilter((v) => !v)}>
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
      <button onClick={() => setShowPositionFilter((v) => !v)}>
        {showPositionFilter
          ? "Ocultar filtro posición"
          : "Filtrar por posición"}
      </button>
      {showPositionFilter && (
        <div>
          {["Portero", "Defensa", "Centrocampista", "Delantero"].map((pos) => (
            <button
              key={pos}
              onClick={() =>
                setPositionFilter(
                  pos as "Portero" | "Defensa" | "Centrocampista" | "Delantero",
                )
              }
              style={{
                fontWeight: positionFilter === pos ? "bold" : "normal",
              }}
            >
              {pos}
            </button>
          ))}
          <button onClick={() => setPositionFilter("")}>Quitar filtro</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Puntos</th>
            <th>Equipo</th>
            <th>Posición</th>
            <th>
              Precio
              <button
                aria-label="Ordenar por precio"
                onClick={() =>
                  setPriceOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
                style={{
                  marginLeft: 4,
                  fontWeight: "bold",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {priceOrder === "asc" ? "↑" : "↓"}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedByPricePlayers.map((player) => (
            <tr key={player.id}>
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
