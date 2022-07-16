import * as S from "./styles";
import { useContext, useEffect, useState } from "react";

import { SocketContext } from "../../services/socket";
import { Message, RoomClient } from "../../types/Socket";

export default function Lobby() {
  const socket = useContext(SocketContext);

  const [room, setRoom] = useState("");
  // const [username, setUsername] = useState("");
  const urlSearch = new URLSearchParams(window.location.search);
  const username = urlSearch.get("username") as string | "";

  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [clientsList, setClientsList] = useState<RoomClient[]>([]);

  useEffect(() => {
    socket.on("list_players", (data) => {
      setClientsList([...clientsList, data]);
    });
    socket.on("message", (newMessage) => {
      setMessagesList([...messagesList, newMessage]);
    });
  }, [messagesList, clientsList]);

  const handleKeyPress = (event: string, text: string) => {
    if (event === "Enter") {
      const data = {
        username,
        text,
      };

      socket.emit("message", data);
    }
  };

  console.log(clientsList);
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
      {messagesList?.map((data, key) => {
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
      <div>
        {clientsList?.map((c, key) => {
          return <div key={key}>{c.username}</div>;
        })}
      </div>
    </>
  );
}
