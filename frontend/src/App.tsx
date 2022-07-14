import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameMatch } from "./pages/GameMatch";
import Lobby from "./pages/Lobby";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/game-match" element={<GameMatch />} />
          <Route path="/lobby" element={<Lobby />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
