import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss";

export const NavBar: React.FC = () => {
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
      </ul>
    </nav>
  );
};
