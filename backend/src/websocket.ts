import { io } from './https';
import { Message, RoomClient } from './types';

const clients: RoomClient[] = []
const messages: Message[] = []

io.on('connection', (client) => {
    console.log("Client connection " + client.id);
    
    client.on("disconnect", () => {
        clients.find(user => user.client_id === client.id ? console.log("Client desconnected " + `${client.id}`) : "");
    });

    client.on("select_room", (data, callback) => {
        // client.join(data.room);
        // console.log("User: " + data.username +" join " + data.room)
        console.log("Users: " + data.username)

        //client.join(data.room);
        console.log(data)
        // Verificar se o usuario ja esta na sala
        let alert: boolean = false;
        const userInRoom: boolean | any = clients.find(user => user.username === data.username && user.client_id === data.client_id);
        
        const username: any = clients.find(user => user.username === data.username ? client.emit('alert', alert = true ) : client.emit('alert', alert));
        const useremail: any = clients.find(user => user.email === data.email ? client.emit('alert', alert = true ) : client.emit('alert', alert));
        
        userInRoom ? (userInRoom.client_id = client.id)
        : 
        (clients.push({
            client_id: data.client_id,
            username: data.username,
            email: data.email,
            password: client.id,
        }));

        console.log(clients)

        // if (userInRoom) {
        //     client.join('room1')

        //     console.log(client.rooms);
        // }
        
        
        // const messagesRoom = getMessagesRoom(data.room);
        // callback(messagesRoom);
        client.emit('username', data.username)
    });
    
    client.on("message", data => {
        const message: Message = {
            username: data.username,
            text: data.text,
        }
        
        messages.push(message)
        console.log(message)
        io.emit("message", message);
        
    });
    
    io.emit("list_players", clients);
    
    client.on("gameMove", data => {
        client.broadcast.emit('gameMove', data)        
    });

    client.on("hit", data => {
        client.broadcast.emit('hit', data)        
    });
});


// function getMessagesRoom(room: string) {
//     const messagesRoom = messages.filter(message => message.room === room);

//     return messagesRoom;
// }