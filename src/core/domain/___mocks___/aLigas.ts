import { Liga } from "@core/domain/Ligas";

export function aLiga(options: Partial<Liga> = {}): Liga {
  const defaultLiga: Liga = {
    id: 1,
    name: "irrelevantLiga",
    description: "irrelevantDescription",
  };
  return { ...defaultLiga, ...options };
}
