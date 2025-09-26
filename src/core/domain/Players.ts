export interface Player {
  id: number;
  name: string;
  position: "Portero" | "Defensa" | "Mediocampista" | "Delantero";
  team: string;
  points: number;
}
