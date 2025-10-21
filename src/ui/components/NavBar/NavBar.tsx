import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@core/auth/useAuth";
import styles from "./NavBar.module.scss";

export const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <Link to="/" className={styles.navButton}>
            Pagina de Inicio
          </Link>
        </li>
        <li>
          <Link to="/players" className={styles.navButton}>
            Jugadores
          </Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/crear-tu-liga" className={styles.navButton}>
              Crear Tu Liga
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
