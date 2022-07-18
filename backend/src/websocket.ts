import { io } from './https';
import { Message, RoomClient } from './types';


const clients: RoomClient[] = []
const usernames: string[] = []
const messages: Message[] = []


io.on('connection', (client) => {
    console.log("Client connection " + client.id);
    
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
        } else {
            console.log("Client: " + `${client.id}` + ", was not found!");
        }
    });

    client.on("select_room", (data, callback) => {
        // client.join(data.room);
        // console.log("User: " + data.username +" join " + data.room)
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
        usernames.push(data.username)
        //console.log(io.allSockets())
        //client.broadcast.emit("list_players", data)
        const clientsAll = getClients();
        const messagesAll = getMessagesRoom();
        //callback(messagesAll);
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

    client.on("message", data => {
        const message: Message = {
            username: data.username,
            text: data.text,
        }
        
        messages.push(message)
        console.log(message)
        io.emit("message", message); 
    });
    
    client.on("gameMove", data => {
        client.broadcast.emit('gameMove', data)        
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