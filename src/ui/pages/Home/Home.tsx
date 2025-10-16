import React from "react";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Fantasy Futbol</h2>
      <h2>Home</h2>
      <button onClick={() => navigate("/formulario-entrada")}>
        Crear usuario
      </button>
    </div>
  );
};
