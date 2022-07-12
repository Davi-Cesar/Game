import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Lobby } from "./pages/Lobby";

const App = () => {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Lobby />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App