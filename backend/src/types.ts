export interface RoomClient {
    client_id: string,
    username: string,
    email: string,
    room: string
}

export interface Message {
    text: string,
    username: string,
    room: string
}

export interface ServerToClientEvents {
    // Emit
    message: (data: Message) => void;
    alert: (data: boolean) => void;
}
  
export interface ClientToServerEvents {
    // On
    hello: () => void;
    message: (data: Message) => void;
    select_room: (data: RoomClient, callback: (e: Message[]) => void) => void;
}
  
export interface InterServerEvents {
    ping: () => void;
}
  
export interface SocketData {
    name: string;
    age: number;
}