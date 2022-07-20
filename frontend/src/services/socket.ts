import io, { Socket } from "socket.io-client";
import { createContext } from "react";

import { ClientToServerEvents, ServerToClientEvents } from "../types/Socket";
import { SOCKET_URL } from "../constants/general";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);

export const SocketContext = createContext(socket);