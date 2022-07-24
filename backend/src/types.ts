export type CharacterSides = 'down' | 'left' | 'right' | 'up';

export interface RoomClient {
    client_id: string,
    username: string,
    password: string,
    email: string,
}

export interface PlayerInfo {
    client_id: string,
    username: string,
}

export interface Rooms {
    status: string;
    players: PlayerInfo[];
    roomId: number;
}

export interface JoinRoom {
    client_id: string,
    username: string,
    room: number
}  

export interface Message {
    text: string,
    username: string,
}

export interface Player {
    add: boolean,
    username: string,
}

export interface GameMove {
    playerId: string,
    side: CharacterSides,
    xAxis: number,
    yAxis: number,
    opponentId: string
}
  
export interface Hit {
    damage: number,
    opponentId: string
}
  
export interface OpponentLife {
    life: number,
    opponentId: string
}

export interface EndGame {
    winner: string,
    opponentId: string,
    roomId: number,
}

export interface ServerToClientEvents {
    // Emit
    message: (data: Message) => void;
    username: (data: string) => void;
    list_players: (data: Player) => void;
    gameMove: (data: GameMove) => void;
    join_room: (data: JoinRoom) => void;
    status_room: (data: string) => void;
    list_rooms: (data: Rooms[]) => void;
    auth: (data: string) => void;
    room: (data: string) => void;
    hit: (data: Hit) => void;
    opponentLife: (data: OpponentLife) => void;
    endGame: (data: EndGame) => void;
}

export interface ClientToServerEvents {
    // On
    hello: () => void;
    message: (data: Message) => void;
    select_room: (data: RoomClient, callback: (e: string[]) => string) => void;
    join_room: (data: JoinRoom) => void;
    list_rooms: (callback: (e: Rooms[]) => Rooms[]) => void;
    list_players: ( callback: (e: string[]) => string) => void;
    gameMove: (data: GameMove) => void;
    hit: (data: Hit) => void;
    opponentLife: (data: OpponentLife) => void;
    endGame: (data: EndGame) => void;
}
  
export interface InterServerEvents {
    ping: () => void;
}
  
export interface SocketData {
    name: string;
    age: number;
}