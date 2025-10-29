import { useLigaById } from "@core/services/ligasService";
import { Title } from "@ui/components/Common/Title/Title";
import React from "react";
import { useParams } from "react-router-dom";

export const MercadoJugadores: React.FC = () => {
  const { id } = useParams();
  const { data: liga, isLoading, isError } = useLigaById(Number(id));

  if (isLoading) return <div>Cargando mercado de jugadores...</div>;
  if (isError) return <div>Error al cargar el mercado de jugadores</div>;
  return (
    <div>
      <Title level={1} align="center">
        Mercado de Jugadores de {liga?.name}
      </Title>
      {/* Aquí iría el resto del componente del mercado de jugadores */}
    </div>
  );
};
