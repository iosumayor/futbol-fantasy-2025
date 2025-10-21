import { useAuth } from "@core/auth/useAuth";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  return (
    <div className={styles.homeContainer}>
      <h2 className={styles.title}>Fantasy Futbol</h2>
      <h2 className={styles.subtitle}>Home</h2>
      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={() => navigate("/formulario-entrada")}
        >
          Crear usuario
        </button>
        <button className={styles.button} onClick={() => navigate("/login")}>
          Iniciar sesión
        </button>
        {isAuthenticated && (
          <button
            className={`${styles.button} ${styles.logoutButton}`}
            onClick={() => logout()}
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </div>
  );
};
