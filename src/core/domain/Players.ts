export interface Player {
  id: number;
  name: string;
  position: "portero" | "defensa" | "mediocampista" | "delantero";
  team: string;
  points: number;
}
