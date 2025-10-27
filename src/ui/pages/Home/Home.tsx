import { useAuth } from "@core/auth/useAuth";
import React from "react";
import { Title } from "@ui/components/Common/Title/Title";
import { useNavigate } from "react-router-dom";
import { Button } from "@ui/components/Common/Button/Button";
import styles from "./Home.module.scss";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  return (
    <div className={styles.homeContainer}>
      <Title level={1}>Fantasy Futbol</Title>
      <Title level={2}>Home</Title>
      <div className={styles.buttonGroup}>
        <Button variant="blue" onClick={() => navigate("/formulario-entrada")}>
          Crear usuario
        </Button>
        <Button variant="blue" onClick={() => navigate("/login")}>
          Iniciar sesión
        </Button>
        {isAuthenticated && (
          <>
            <Button variant="red" onClick={() => logout()}>
              Cerrar sesión
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
