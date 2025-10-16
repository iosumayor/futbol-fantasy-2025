import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./ui/pages/Home/Home";
import { Players } from "./ui/pages/Players";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PlayerDetails } from "@ui/pages/PlayerDetails/PlayerDetails";
import { NavBar } from "@ui/components/NavBar";

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
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
