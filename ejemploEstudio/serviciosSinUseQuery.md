// Ejemplo de custom hook para obtener jugadores SIN React Query
// Puedes copiar este ejemplo en tu documentación .md

```tsx
import { useState, useEffect } from "react";
import { JsonPlayersRepository } from "../infrastructure/JsonPlayersRepository";

// Instancia del repositorio que accede a los datos
const repo = new JsonPlayersRepository();

/**
 * Hook para obtener todos los jugadores
 */
export function useAllPlayers() {
  // Estado para los jugadores, carga y error
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // useEffect para cargar los datos al montar el componente
  useEffect(() => {
    setIsLoading(true);
    repo
      .getAllPlayers()
      .then((data) => {
        setPlayers(data); // Guarda los jugadores
        setIsLoading(false); // Finaliza la carga
      })
      .catch(() => {
        setIsError(true); // Marca error si falla
        setIsLoading(false);
      });
  }, []);

  // Devuelve los datos y estados
  return { data: players, isLoading, isError };
}

/**
 * Hook para obtener un jugador por id
 */
export function usePlayer(id: number) {
  // Estado para el jugador, carga y error
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // useEffect para cargar el jugador cuando cambia el id
  useEffect(() => {
    setIsLoading(true);
    repo
      .getPlayerById(id)
      .then((data) => {
        setPlayer(data); // Guarda el jugador
        setIsLoading(false); // Finaliza la carga
      })
      .catch(() => {
        setIsError(true); // Marca error si falla
        setIsLoading(false);
      });
  }, [id]);

  // Devuelve los datos y estados
  return { data: player, isLoading, isError };
}
```
