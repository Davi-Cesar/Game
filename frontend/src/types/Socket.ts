import { CharacterSides } from "./CharacterSides";

export interface RoomClient {
  client_id: string,
  username: string,
  email: string,
  password: string,
}

export interface JoinRoom {
  username: string,
  room: string
}

export interface Message {
  [x: string]: any;
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
  yAxis: number
}

export interface ServerToClientEvents {
  // On
  message: (data: Message) => void;
  alert: (data: boolean) => void;
  username: (data: string) => void;
  join_room: (data: JoinRoom) => void;
  list_players: (data: Player) => void;
  gameMove: (data: GameMove) => void;
  room: (data: string) => void;
}

export interface ClientToServerEvents {
  // Emit
  hello: () => void;
  message: (data: Message) => void;
  select_room: (data: RoomClient) => void;
  join_room: (data: JoinRoom) => void;
  list_players: ( callback: (e: string[]) => void) => void;
  gameMove: (data: GameMove) => void;
}
