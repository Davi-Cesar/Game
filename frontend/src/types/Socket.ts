import { CharacterSides } from "./CharacterSides";

export interface RoomClient {
  client_id: string,
  username: string,
  email: string,
  password: string,
}

export interface PlayerInfo {
  client_id: string,
  username: string,
}

export interface JoinRoom {
  client_id: string,
  username: string,
  room: number
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

export interface Rooms {
  status: string;
  players: PlayerInfo[];
  roomId: number;
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
  // On
  message: (data: Message) => void;
  alert: (data: boolean) => void;
  username: (data: string) => void;
  join_room: (data: JoinRoom) => void;
  list_players: (data: Player) => void;
  status_room: (data: string) => void;
  list_rooms: (data: Rooms[]) => void;
  gameMove: (data: GameMove) => void;
  auth: (data: string) => void;
  hit: (data: Hit) => void;
  opponentLife: (data: OpponentLife) => void;
  endGame: (data: EndGame) => void;
}

export interface ClientToServerEvents {
  // Emit
  hello: () => void;
  message: (data: Message) => void;
  select_room: (data: RoomClient) => void;
  join_room: (data: JoinRoom) => void;
  list_players: (callback: (e: string[]) => void) => void;
  list_rooms: (callback: (e: Rooms[]) => void) => void;
  gameMove: (data: GameMove) => void;
  hit: (data: Hit) => void;
  opponentLife: (data: OpponentLife) => void;
  endGame: (data: EndGame) => void;
}
