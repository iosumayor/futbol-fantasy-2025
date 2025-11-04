import { Button } from "@ui/components/Common/Button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AuthNavBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <li>
        <Button variant="navBar" onClick={() => navigate("/crear-tu-liga")}>
          Crear Tu Liga
        </Button>
      </li>
      <li>
        <Button variant="navBar" onClick={() => navigate("/mi-liga")}>
          Mis Ligas
        </Button>
      </li>
    </>
  );
};
