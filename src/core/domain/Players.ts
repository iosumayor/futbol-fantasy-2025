export type PlayerPosition =
  | "Portero"
  | "Defensa"
  | "Centrocampista"
  | "Delantero";

export interface Player {
  id: number;
  name: string;
  shirtname?: string;
  position: PlayerPosition;
  team: string;
  points: number;
  price?: number;
  image?: string;
  imageDetail?: string;
}
