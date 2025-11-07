import { useParams } from "react-router-dom";
import React from "react";
import { Title } from "@ui/components/Common/Title/Title";
import { useLigaById } from "@core/services/ligasService";

export const PaginaGeneralMiLiga: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useLigaById(Number(id));

  if (isLoading) return <div>Cargando liga...</div>;
  if (isError) return <div>Error al cargar la liga</div>;

  return (
    <>
      <Title align="center" level={1}>
        {data?.name}
      </Title>
      {data?.description && (
        <Title align="center" level={2}>
          {data.description}
        </Title>
      )}
    </>
  );
};
