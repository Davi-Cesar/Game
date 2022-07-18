import * as S from "./styles";
import { ChangeEvent, useContext, useEffect, useState } from "react";

import { SocketContext } from "../../services/socket";
import { Message } from "../../types/Socket";

export default function Lobby() {
  const socket = useContext(SocketContext);

  const [room, setRoom] = useState("");
  // const [username, setUsername] = useState("");
  const urlSearch = new URLSearchParams(window.location.search);
  const username = urlSearch.get("username") as string | "";
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [clientsList, setClientsList] = useState<string[]>([]);

  useEffect(() => {
    socket.emit("list_players", (response) => {
      console.log(response);
      setClientsList(response);
    });
  }, []);

  useEffect(() => {
    socket.on("list_players", (data) => {
      if (data.add) {
        setClientsList([...clientsList, data.username]);
      } else {
        const updatedClientsList = clientsList.filter(
          (client) => client !== data.username
        );
        setClientsList(updatedClientsList);
      }
    });
    socket.on("message", (newMessage) => {
      setMessagesList([...messagesList, newMessage]);
    });
  }, [messagesList, clientsList, socket]);

  const handleKeyPress = (event: string, text: string) => {
    if (event === "Enter") {
      const data = {
        username,
        text,
      };

      socket.emit("message", data);
      setMessage("");
    }
  };

  const handleMessageInput = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  //console.log(clientsList);
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
        value={message}
        onChange={handleMessageInput}
        onKeyPress={(event) => handleKeyPress(event.key, event.target.value)}
      />

      {clientsList.map((username, key) => (
        <div key={key}>{username}</div>
      ))}
    </>
  );
}
