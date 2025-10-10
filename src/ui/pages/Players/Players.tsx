import React, { useState } from "react";
import { NavBar } from "../../components/NavBar";
import { usePlayers } from "../../../core/services/playersService";

export const Players: React.FC = () => {
  const { data: players, isLoading, isError } = usePlayers();
  const [nameFilter, setNameFilter] = useState("");
  const [showTeamFilter, setShowTeamFilter] = useState(false);
  const [teamFilter, setTeamFilter] = useState("");
  const [showPositionFilter, setShowPositionFilter] = useState(false);
  const [positionFilter, setPositionFilter] = useState<
    "Portero" | "Defensa" | "Centrocampista" | "Delantero" | ""
  >("");

  if (isLoading) return <div>Cargando jugadores...</div>;
  if (isError) return <div>Error al cargar jugadores</div>;

  let filteredPlayers = players ?? [];
  if (nameFilter) {
    filteredPlayers = filteredPlayers.filter((player) =>
      player.name.toLowerCase().includes(nameFilter.toLowerCase()),
    );
  }
  if (showTeamFilter && teamFilter) {
    filteredPlayers = filteredPlayers.filter((player) =>
      player.team.toLowerCase().includes(teamFilter.toLowerCase()),
    );
  }
  if (showPositionFilter && positionFilter) {
    filteredPlayers = filteredPlayers.filter(
      (player) => player.position === positionFilter,
    );
  }

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
              onClick={() => setPositionFilter(pos as any)}
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
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.points} puntos</td>
              <td>{player.team}</td>
              <td>{player.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
