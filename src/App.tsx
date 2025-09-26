import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./ui/pages/Home/Home";
import { Players } from "./ui/pages/Players";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
