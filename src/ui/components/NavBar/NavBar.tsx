import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@core/auth/useAuth";
import { Button } from "@ui/components/Common/Button/Button";
import styles from "./NavBar.module.scss";

export const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <Button className={styles.navButton} onClick={() => navigate("/")}>
            Pagina de Inicio
          </Button>
        </li>
        <li>
          <Button
            className={styles.navButton}
            onClick={() => navigate("/players")}
          >
            Jugadores
          </Button>
        </li>
        {isAuthenticated && (
          <li>
            <Button
              className={styles.navButton}
              onClick={() => navigate("/crear-tu-liga")}
            >
              Crear Tu Liga
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};
