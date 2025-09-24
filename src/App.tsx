import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./ui/pages/Home/Home";
import { Players } from "./ui/pages/Players";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
