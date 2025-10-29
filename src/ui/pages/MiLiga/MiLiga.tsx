import React from "react";
import { useAllLigas } from "@core/services/ligasService";
import { Title } from "@ui/components/Common/Title/Title";
import { useNavigate } from "react-router-dom";

export const MiLiga: React.FC = () => {
  const { data: ligas, isLoading, error } = useAllLigas();
  const navigate = useNavigate();

  if (isLoading) return <div>Cargando ligas...</div>;
  if (error) return <div>Error al cargar ligas</div>;

  return (
    <div className={"container"}>
      <Title level={1}>Mis Ligas</Title>
      <ul className="ligasLista">
        {ligas?.map((liga) => (
          <li
            key={liga.id}
            className="item"
            onClick={() => navigate(`/liga/${liga.id}`)}
            tabIndex={0}
            role="button"
          >
            {liga.name}
            <p>{liga.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
