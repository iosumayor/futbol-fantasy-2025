import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import styles from "./PaginaGeneralMiLiga.module.scss";

export const PaginaGeneralMiLiga: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <nav className={styles.ligaNav}>
      <ul>
        <li onClick={() => navigate(`/mi-liga/${id}/mercado`)}>Mercado</li>
        <li onClick={() => navigate(`/mi-liga/${id}/clasificacion`)}>
          Clasificación
        </li>
        <li onClick={() => navigate(`/mi-liga/${id}/plantilla`)}>
          Mi Plantilla
        </li>
        <li onClick={() => navigate(`/mi-liga/${id}/once`)}>Once Titular</li>
      </ul>
    </nav>
  );
};
