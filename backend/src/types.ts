export interface RoomClient {
    client_id: string,
    username: string,
    email: string,
    room: string
}

export interface Message {
    text: string,
    username: string,
}

export interface ServerToClientEvents {
    // Emit
    message: (data: Message) => void;
    alert: (data: boolean) => void;
    username: (data: string) => void;
    list_players: (data: RoomClient[]) => void;
}
  
export interface ClientToServerEvents {
    // On
    hello: () => void;
    message: (data: Message) => void;
    select_room: (data: RoomClient, callback: (e: Message[]) => void) => void;
    list_players: (data: RoomClient) => void;
}
  
export interface InterServerEvents {
    ping: () => void;
}
  
export interface SocketData {
    name: string;
    age: number;
}