import { Player } from "../Players";

export function aPlayer(options: Partial<Player> = {}): Player {
  const defaultPlayer: Player = {
    id: 1,
    name: "irrelevantPlayer",
    position: "Delantero",
    team: "Equipo Test",
    points: 0,
    price: 0,
    image:
      "https://assets.laliga.com/squad/2025/t178/p77318/128x128/p77318_t178_2025_1_002_000.jpg",
    imageDetail:
      "https://r2.thesportsdb.com/images/media/player/render/agtip81658424227.png/small",
  };

  ///Se utilizan dos imagens random para evitar que en los tests fallen por no encontrar la imagen

  return { ...defaultPlayer, ...options };
}
