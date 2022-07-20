import { useContext, useEffect, useState } from "react";

import { SocketContext } from "../../services/socket";

export default function Lobby() {
  const socket = useContext(SocketContext);
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("join_room", (data) => {
      setRoom(data.room);
    });
  });

  //console.log(clientsList);
  return (
    <>
      <h2>{room}</h2>
    </>
  );
}
