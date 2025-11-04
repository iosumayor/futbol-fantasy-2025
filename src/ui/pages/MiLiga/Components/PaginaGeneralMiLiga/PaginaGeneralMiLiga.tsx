import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import styles from "./PaginaGeneralMiLiga.module.scss";
import { Title } from "@ui/components/Common/Title/Title";
import { useLigaById } from "@core/services/ligasService";
import { Button } from "@ui/components/Common/Button/Button";

export const PaginaGeneralMiLiga: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      <nav className={styles.ligaNav}>
        <ul>
          <li>
            <Button
              variant="green"
              onClick={() => navigate(`/mi-liga/${id}/mercado`)}
            >
              Mercado
            </Button>
          </li>
          <li>
            <Button
              variant="green"
              onClick={() => navigate(`/mi-liga/${id}/clasificacion`)}
            >
              Clasificación
            </Button>
          </li>
          <li>
            <Button
              variant="green"
              onClick={() => navigate(`/mi-liga/${id}/plantilla`)}
            >
              Mi Plantilla
            </Button>
          </li>
          <li>
            <Button
              variant="green"
              onClick={() => navigate(`/mi-liga/${id}/once`)}
            >
              Once Titular
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
};
