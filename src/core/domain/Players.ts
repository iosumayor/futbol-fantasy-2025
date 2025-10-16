export interface Player {
  id: number;
  name: string;
  position: "Portero" | "Defensa" | "Centrocampista" | "Delantero";
  team: string;
  points: number;
  price: number;
  image?: string;
  imageDetail?: string;
}
