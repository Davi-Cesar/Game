import * as S from './styles';
import { useState } from "react";

import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

const PORT = "http://localhost:8800";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
socket = io(PORT);

export const Lobby = () => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
