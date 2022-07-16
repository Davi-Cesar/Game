import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { SocketContext } from "../../services/socket";

export default function Login() {
  const socket = useContext(SocketContext);

  let navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function connectToRoom() {
    socket.emit(
      "select_room",
      {
        client_id: socket.id,
        username,
        email,
        password,
      }
      // (message: string[]) => {
      //   setMessages(message);
      // }
    );
    
    socket.on("list_players", (clients) => {
      console.log("Clients: " + [clients]);
    });

    navigate('/lobby')
  }

  return (
    <>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Name..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          name="password"
          placeholder="Password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="text"
          name="email"
          placeholder="Email..."
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        {/* <Link to="/lobby"> */}
        <button type="submit" onClick={() => connectToRoom()}>
          Entrar na Sala
        </button>
        {/* </Link> */}
      </form>
    </>
  );
}
