import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@core/auth/useAuth";
import styles from "./NavBar.module.scss";

export const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <button className={styles.navButton} onClick={() => navigate("/")}>
            Pagina de Inicio
          </button>
        </li>
        <li>
          <button
            className={styles.navButton}
            onClick={() => navigate("/players")}
          >
            Jugadores
          </button>
        </li>
        {isAuthenticated && (
          <li>
            <button
              className={styles.navButton}
              onClick={() => navigate("/crear-tu-liga")}
            >
              Crear Tu Liga
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
