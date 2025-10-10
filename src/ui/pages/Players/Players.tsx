import React, { useState } from "react";
import { NavBar } from "../../components/NavBar";
import { usePlayers } from "../../../core/services/playersService";

export const Players: React.FC = () => {
  const { data: players, isLoading, isError } = usePlayers();
  const [filterType, setFilterType] = useState<"name" | "team" | "position">(
    "name",
  );
  const [filterValue, setFilterValue] = useState<string>("");

  if (isLoading) {
    return <div>Cargando jugadores...</div>;
  }
  if (isError) {
    return <div>Error al cargar jugadores</div>;
  }

  const filteredPlayers = players?.filter((player) =>
    player[filterType].toLowerCase().includes(filterValue.toLowerCase()),
  );

  return (
    <div>
      <h2>Listado Jugadores</h2>
      <NavBar />
      <div>
        <label>
          Filtrar por:
          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as "name" | "team" | "position")
            }
          >
            <option value="name">Nombre</option>
            <option value="team">Equipo</option>
            <option value="position">Posición</option>
          </select>
        </label>
      </div>
      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
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
