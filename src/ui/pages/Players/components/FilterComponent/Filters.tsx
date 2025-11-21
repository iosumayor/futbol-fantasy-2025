import React from "react";
import styles from "./Filters.module.scss";
import { Button } from "@ui/components/Common/Button/Button";
import { PlayerPosition } from "@core/domain/Players";

interface FiltersProps {
  nameFilter: string;
  setNameFilter: (value: string) => void;
  showTeamFilter: boolean;
  setShowTeamFilter: (value: boolean) => void;
  teamFilter: string;
  setTeamFilter: (value: string) => void;
  showPositionFilter: boolean;
  setShowPositionFilter: (value: boolean) => void;
  positionFilter: PlayerPosition | "";
  setPositionFilter: (value: PlayerPosition | "") => void;
}

export const Filters: React.FC<FiltersProps> = ({
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
}) => {
  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <Button
        variant={showTeamFilter ? "green" : "blue"}
        onClick={() => setShowTeamFilter(!showTeamFilter)}
      >
        {showTeamFilter ? "Ocultar filtro equipo" : "Filtrar por equipo"}
      </Button>
      {showTeamFilter && (
        <input
          type="text"
          placeholder="Filtrar por equipo"
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
        />
      )}
      <Button
        variant={showPositionFilter ? "green" : "blue"}
        onClick={() => setShowPositionFilter(!showPositionFilter)}
      >
        {showPositionFilter
          ? "Ocultar filtro posición"
          : "Filtrar por posición"}
      </Button>
      {showPositionFilter && (
        <div className={styles.positionFilters}>
          {["Portero", "Defensa", "Centrocampista", "Delantero"].map((pos) => (
            <Button
              variant={positionFilter === pos ? "blue" : "black"}
              key={pos}
              onClick={() =>
                setPositionFilter(
                  pos as "Portero" | "Defensa" | "Centrocampista" | "Delantero",
                )
              }
            >
              {pos}
            </Button>
          ))}
          <Button variant="blue" onClick={() => setPositionFilter("")}>
            Quitar filtro
          </Button>
        </div>
      )}
    </div>
  );
};
