import "./App.css";

import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { DefaultEventsMap } from "@socket.io/component-emitter";

const PORT = "http://localhost:8800";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

socket = io(PORT);

interface Message {
  text: string;
  username: string;
  room: string;
}

function App() {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [messagesList, setMessagesList] = useState<Message[]>([]);

  function connectToRoom() {
    socket.emit(
      "select_room",
      {
        room,
        email,
        username,
        password,
      }
      // (message: string[]) => {
      //   setMessages(message);
      // }
    );
  }
  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessagesList([...messagesList, newMessage]);
    });
    socket.on("list_players", (clients) => {
      console.log(clients);
    });
  }, [messagesList]);

  const handleKeyPress = (event: string, text: string) => {
    if (event === "Enter") {
      const data = {
        room,
        username,
        text,
      };
      console.log(data.text);
      socket.emit("message", data);
      // text = "";
    }
  };

  return (
    <>
      <div className="App">
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
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setUsername(event.target.value);
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

        {messagesList?.map((data: any, key) => {
          return (
            <h5 key={key}>
              {data.username}: {data.text}
            </h5>
          );
        })}

        <button onClick={() => connectToRoom()}>Entrar na Sala</button>
        <input
          type="text"
          placeholder="Digite sua mensagem"
          id="message_input"
          onKeyPress={(event) => handleKeyPress(event.key, event.target.value)}
        />
      </div>
    </>
  );
}

export default App;
