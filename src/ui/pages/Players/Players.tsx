import React, { useState } from "react";
import { NavBar } from "../../components/NavBar";
import { usePlayers } from "../../../core/services/playersService";

export const Players: React.FC = () => {
  const { data: players, isLoading, isError } = usePlayers();
  const [filterByTeam, setFilterByTeam] = useState<string>("");

  if (isLoading) {
    return <div>Cargando jugadores...</div>;
  }
  if (isError) {
    return <div>Error al cargar jugadores</div>;
  }

  const filteredPlayers = players?.filter((player) =>
    player.team.toLowerCase().includes(filterByTeam.toLowerCase()),
  );

  return (
    <div>
      <h2>Listado Jugadores</h2>
      <NavBar />
      <input
        type="text"
        placeholder="Filtrar por equipo"
        value={filterByTeam}
        onChange={(e) => setFilterByTeam(e.target.value)}
      />
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
          {filteredPlayers?.map((player) => (
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
