import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Link } from "react-router-dom";

import * as S from "./styles";

const PORT = "http://localhost:8800";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

socket = io(PORT);

interface Message {
  text: string;
  username: string;
  room: string;
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function connectToRoom() {
    socket.emit(
      "select_room",
      {
        // room,
        email,
        username,
        password,
      }
      // (message: string[]) => {
      //   setMessages(message);
      // }
    );
    socket.on("list_players", (clients) => {
      console.log("Clients: " + [clients]);
    });
  }

  return (
    <>
      <form action="/lobby">
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
