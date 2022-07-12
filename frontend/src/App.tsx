import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameMatch } from "./pages/GameMatch";
import { Lobby } from "./pages/Lobby";

const App = () => {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Lobby />} />
            <Route path="/game-match" element={<GameMatch />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App