import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { createContext } from "react";

import { SOCKET_URL } from "../constants/general";

export const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io(SOCKET_URL);

export const SocketContext = createContext(socket);