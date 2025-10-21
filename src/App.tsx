import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./ui/pages/Home/Home";
import { Players } from "./ui/pages/Players";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PlayerDetails } from "@ui/pages/PlayerDetails/PlayerDetails";
import { NavBar } from "@ui/components/NavBar";
import { FormularioEntrada } from "@ui/pages/FormularioEntrada";
import { Login } from "@ui/pages/Login/Login";
import { CrearTuLiga } from "@ui/pages/CrearTuLiga/CrearTuLiga";
import { PrivateRoute } from "@core/auth/PrivateRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/players/:id" element={<PlayerDetails />} />
          <Route path="/formulario-entrada" element={<FormularioEntrada />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/crear-tu-liga"
            element={
              <PrivateRoute>
                <CrearTuLiga />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
