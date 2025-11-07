import { Button } from "@ui/components/Common/Button/Button";
import { useNavigate } from "react-router-dom";
import React from "react";
import styles from "./LigaNavBar.module.scss";

interface LigaNavBarProps {
  ligaId: number;
}

export const LigaNavBar: React.FC<LigaNavBarProps> = ({ ligaId }) => {
  const navigate = useNavigate();
  return (
    <nav className={styles.ligaNav}>
      <ul>
        <li>
          <Button
            variant="green"
            onClick={() => navigate(`/mi-liga/${ligaId}/mercado`)}
          >
            Mercado
          </Button>
        </li>
        <li>
          <Button
            variant="green"
            onClick={() => navigate(`/mi-liga/${ligaId}/clasificacion`)}
          >
            Clasificación
          </Button>
        </li>
        <li>
          <Button
            variant="green"
            onClick={() => navigate(`/mi-liga/${ligaId}/plantilla`)}
          >
            Mi Plantilla
          </Button>
        </li>
        <li>
          <Button
            variant="green"
            onClick={() => navigate(`/mi-liga/${ligaId}/once`)}
          >
            Once Titular
          </Button>
        </li>
      </ul>
    </nav>
  );
};
