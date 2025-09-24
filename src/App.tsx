import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./ui/pages/Home/Home";
import { Players } from "./ui/pages/Players";

function App() {
  return (
    <div className="App">
      <h1>Fantasy Fútbol App</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
