import { io } from './https';
import { EndGame, GameMove, JoinRoom, Message, PlayerInfo, RoomClient, Rooms } from './types';

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

var serviceAccount = require("./config/jrm-game-firebase-adminsdk-t0q6w-283b791a51.json");

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();


const clients: RoomClient[] = []
const usernames: string[] = []
const messages: Message[] = []
const rooms: Rooms[] = []


for (var i = 0; i < 5; i++) {
    rooms.push({ status: "empty", players: [], roomId: i + 1 });
}

io.on('connection', (client) => {
    console.log("Client connection " + client.id);
    // io.emit("list_rooms", rooms);
    
    client.on("disconnect", () => {
        const clientFound = clients.find((user) => 
        user.client_id === client.id
        );
        if(clientFound !== undefined){
            console.log("Client desconnected " + `${client.id}`);
            client.broadcast.emit("list_players", {
                add: false,
                username: clientFound.username
            });
            io.emit("list_rooms", rooms);
        } else {
            console.log("Client: " + `${client.id}` + ", was not found!");
        }
    });
    
    client.on("select_room", (data) => { 
        // console.log("User: " + data.username +" join " + data.room)
        // Verificar se o usuario ja esta na sala
        
        
        const userInRoom: boolean | any = clients.find(user => user.username === data.username && user.client_id === data.client_id);
        io.emit("status_room", "empty")
        
        userInRoom ? (userInRoom.client_id = client.id)
        : 
        (clients.push({
            client_id: data.client_id,
            username: data.username,
            email: data.email,
            password: client.id,
        }));
        usernames.push(data.username)

        const docRef = db.collection("users").doc(data.username);

        docRef.set({
            nickname: data.username,
            email: data.email,
            password: data.password,
            });
            io.emit("list_rooms", rooms);
   
        client.broadcast.emit("list_players",
            {
                add: true,
                username: data.username
            });
        

        
    });
    
    client.on("list_players", (callback) => {
        const clientsAll = getClients();
        callback(clientsAll);
    })

    client.on("list_rooms", (callback) => {
        const roomsList = getRooms();
        callback(roomsList);
    })
    
    client.on("join_room", (data) => {
        let nameRoom = data.room + "";
        client.join(nameRoom);
        const join: JoinRoom = {
            client_id: data.client_id,
            username: data.username,
            room: data.room
        }
        io.to(nameRoom).emit("join_room", join);
        joinRoom(data, data.room)
    })
    
    client.on("message", data => {
        const message: Message = {
            username: data.username,
            text: data.text,
        }
        
        messages.push(message)

        // console.log(message)
        
        io.emit("message", message); 
    });
    
    client.on("gameMove", data => {
        client.to(data.opponentId).emit('gameMove', data)    
    });

    client.on("hit", data => {
        client.to(data.opponentId).emit('hit', data)        
    });

    client.on("opponentLife", data => {
        client.to(data.opponentId).emit('opponentLife', data)        
    });
    
    client.on("endGame", data => { 
        client.to(""+data.roomId).emit('endGame', data) 
        clearRoom(data.roomId);  
        console.log(data); 
    });

});

function getMessagesRoom() {
    const messagesRoom = messages.filter(message => message.text);

    return messagesRoom;
}

function getClients() {
    const users = usernames.filter(() => usernames);

    return users;
}

function getRooms() {
    return rooms;
}

function joinRoom(player: PlayerInfo, roomId: number) {
    rooms.forEach((room) => {
        if(room.roomId === roomId && room.players.length <= 1) {
            room.players.push(player);
            room.status = "waiting"
            io.emit("list_rooms", rooms);
        } if (room.roomId === roomId && room.players.length === 2) {
            room.players.push(player);
            room.status = "starting"
            io.emit("list_rooms", rooms);
        } 
        //console.log(room);
    });
}
function clearRoom(roomId: number) {
    rooms.forEach((room) => {
        if(room.roomId == roomId){
            room.players = [];
            room.status = "empty";
            io.emit("list_rooms", rooms); 
            console.log("Entrei na sala");
        }
    });
}