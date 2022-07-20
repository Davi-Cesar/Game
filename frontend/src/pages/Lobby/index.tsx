import * as S from "./styles";
import { ChangeEvent, useContext, useEffect, useState } from "react";

import { SocketContext } from "../../services/socket";
import { Message, Rooms } from "../../types/Socket";
import { useNavigate } from "react-router-dom";

export default function Lobby() {
  const socket = useContext(SocketContext);
  let navigate = useNavigate();

  const [room, setRoom] = useState(0);
  // const [username, setUsername] = useState("");
  const urlSearch = new URLSearchParams(window.location.search);
  const username = urlSearch.get("username") as string | "";

  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [roomList, setRoomList] = useState<Rooms[]>();
  const [clientsList, setClientsList] = useState<string[]>([]);

  useEffect(() => {
    socket.emit("list_players", (response) => {
      setClientsList(response);
    });
  }, []);

  useEffect(() => {
    socket.on("list_rooms", (data) => {
      setRoomList(data);
    });

    socket.on("status_room", (data) => {
      setStatus(data);
    });

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
  }, [messagesList, clientsList, socket, roomList]);

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

  function joinRoom() {
    socket.emit("join_room", {
      room,
      username,
    });

    navigate("/game?room:" + room);
  }

  const handleMessageInput = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <select
        name="select_room"
        id="select_room"
        onChange={(event) => {
          setRoom(+event.target.value);
        }}
      >
        <option value="Selecione a sala">Selecione a sala</option>

        {roomList?.map((data, key) =>
          data.status === "starting" ? (
            <option key={key} value={data.roomId} disabled>
              Sala {data.roomId} {data.status}
            </option>
          ) : (
            <option key={key} value={data.roomId}>
              Sala {data.roomId} {data.status}
            </option>
          )
        )}
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
      <button onClick={() => joinRoom()}>Entrar na sala</button>
      {clientsList.map((username, key) => (
        <div key={key}>{username}</div>
      ))}
    </>
  );
}
