import { useAuth } from "@core/auth/useAuth";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  return (
    <div>
      <h2>Fantasy Futbol</h2>
      <h2>Home</h2>
      <button onClick={() => navigate("/formulario-entrada")}>
        Crear usuario
      </button>
      <button onClick={() => navigate("/login")}>Iniciar sesión</button>
      {isAuthenticated && (
        <button onClick={() => logout()}>Cerrar sesión</button>
      )}
    </div>
  );
};
