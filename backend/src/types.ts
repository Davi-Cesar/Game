export type CharacterSides = 'down' | 'left' | 'right' | 'up';

export interface RoomClient {
    client_id: string,
    username: string,
    password: string,
    email: string,
}

export interface Message {
    text: string,
    username: string,
}

export interface GameMove {
    player: string,
    xAxis: number,
    yAxis: number
}

export interface ServerToClientEvents {
    // Emit
    message: (data: Message) => void;
    alert: (data: boolean) => void;
    username: (data: string) => void;
    list_players: (data: RoomClient) => void;
    gameMove: (data: GameMove) => void;
    
}
  
export interface ClientToServerEvents {
    // On
    hello: () => void;
    message: (data: Message) => void;
    select_room: (data: RoomClient, callback: (e: Message[]) => void) => void;
    list_players: (data: RoomClient) => void;
    gameMove: (data: GameMove) => void;
}
  
export interface InterServerEvents {
    ping: () => void;
}
  
export interface SocketData {
    name: string;
    age: number;
}