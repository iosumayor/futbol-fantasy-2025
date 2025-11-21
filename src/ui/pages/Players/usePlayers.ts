import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllPlayers } from "@core/services/playersService";
import { Player, PlayerPosition } from "@core/domain/Players";

export function usePlayers() {
  const { data: players, isLoading, isError } = useAllPlayers();
  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("");
  const [showTeamFilter, setShowTeamFilter] = useState(false);
  const [teamFilter, setTeamFilter] = useState("");
  const [showPositionFilter, setShowPositionFilter] = useState(false);
  const [positionFilter, setPositionFilter] = useState<PlayerPosition | "">("");
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc">("asc");

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
    priceOrder === "asc"
      ? (a.price ?? 0) - (b.price ?? 0)
      : (b.price ?? 0) - (a.price ?? 0),
  );

  return {
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
  };
}
