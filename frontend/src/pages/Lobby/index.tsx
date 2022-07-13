import * as S from './styles';
import { useContext, useState } from "react";

import { SocketContext } from '../../services/socket';

export const Lobby = () => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const socket = useContext(SocketContext);

  function connectRoom() {
    console.log("aqui");

    socket.emit("select_room", {
      room,
      email,
      name,
      password,
    });
  }

  return (
    <S.Container>
      <input
        type="text"
        placeholder="Name..."
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Password..."
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Email..."
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <button onClick={() => connectRoom()}>Entrar na Sala</button>
    </S.Container>
  );
}
