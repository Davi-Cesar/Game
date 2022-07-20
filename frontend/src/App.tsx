import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameMatch } from "./pages/GameMatch";
import Lobby from "./pages/Lobby";
import Login from "./pages/Login";
import Game from "./pages/Game";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/game-match" element={<GameMatch />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
