import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import * as S from "./styles";

const PORT = "http://localhost:8800";

let socket: Socket;

socket = io(PORT);

interface Message {
  text: string;
  username: string;
  room: string;
}

export default function Lobby() {
  const [room, setRoom] = useState("");
  // const [username, setUsername] = useState("");
  const urlSearch = new URLSearchParams(window.location.search);
  const username = urlSearch.get("username");

  const [messagesList, setMessagesList] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessagesList([...messagesList, newMessage]);
    });
    socket.on("username", (username) => {
      console.log("user: " + username);
    });
  }, [messagesList]);

  const handleKeyPress = (event: string, text: string) => {
    if (event === "Enter") {
      const data = {
        username,
        text,
      };

      socket.emit("message", data);
      // text = "";
    }
  };

  return (
    <>
      <select
        name="select_room"
        id="select_room"
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      >
        <option value="-1">Selecione a sala</option>
        <option value="Sala 1">Sala 1</option>
        <option value="Sala 2">Sala 2</option>
        <option value="Sala 3">Sala 3</option>
        <option value="Sala 4">Sala 4</option>
      </select>
      {messagesList?.map((data: any, key) => {
        return (
          <h5 key={key}>
            {data.username}: {data.text}
          </h5>
        );
      })}
      <input
        type="text"
        placeholder="Digite sua mensagem"
        id="message_input"
        onKeyPress={(event) => handleKeyPress(event.key, event.target.value)}
      />
    </>
  );
}
