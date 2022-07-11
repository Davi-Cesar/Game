import { io } from './https';
import { Message, RoomClient } from './types';


const clients: RoomClient[] = []
const messages: Message[] = []

io.on('connection', (client) => {
    console.log("Client connection " + client.id);
    
    client.on("disconnect", () => {
        clients.find(user => user.client_id === client.id ? console.log("Client desconnected " + `${client.id}`) : "");
    });

    client.on("select_room", (data) => {
        //client.join(data.room);
        console.log(data)
        // Verificar se o usuario ja esta na sala
        let alert: boolean = false;
        const userInRoom: boolean | any = clients.find(user => user.username === data.username && user.room === data.room);
        
        const username: any = clients.find(user => user.username === data.username ? client.emit('alert', alert = true ) : client.emit('alert', alert));
        const useremail: any = clients.find(user => user.email === data.email ? client.emit('alert', alert = true ) : client.emit('alert', alert));
        
        userInRoom ? (userInRoom.client_id = client.id)
        : 
        (clients.push({
            room: data.room,
            username: data.username,
            email: data.email,
            client_id: client.id,
        }));
        
        const messagesRoom = getMessagesRoom(data.room);
        //callback(messagesRoom);
    });

    client.on("message", data => {
        const message: Message = {
            room: data.room,
            username: data.username,
            text: data.text,
        }

        messages.push(message)

        io.to(data.room).emit("message", message);
        
    });
});


function getMessagesRoom(room: string) {
    const messagesRoom = messages.filter(message => message.room === room);

    return messagesRoom;
}