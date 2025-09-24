import React from "react";
import { Link } from "react-router-dom";

export const NavBar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Pagina de Inicio</Link>
        </li>
        <li>
          <Link to="/players">Jugadores</Link>
        </li>
      </ul>
    </nav>
  );
};
