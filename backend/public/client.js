// const socket = io("http://localhost:8800");
const socket = io();

const urlSearch = new URLSearchParams(window.location.search);

const username = urlSearch.get("username");
const password = urlSearch.get("email");
const email = urlSearch.get("password");

const room = urlSearch.get("select_room");

console.log(window.location.search)

socket.emit("select_room", {
    room,
    email,
    username,
    password,
}, messages => {
    messages.forEach(message => {
        createMessage(message);
    });
});

const roomDiv = document.getElementById("name_room");

roomDiv.innerHTML = `<h3 class="room">${room}</h3>`

document.getElementById("run_back").addEventListener("click", () => {
    window.location.href = "index.html"
});

document.getElementById("message_input").addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        const message = event.target.value;

        event.preventDefault();
        const data = {
            room,
            username,
            message,
        }
        
        socket.emit("message", data);
        
        event.target.value = ""
    }
});


socket.on("alert", verify =>  {
    if(verify === true) {

        window.location.href = "index.html"
       // alert(verify + " username ja existe")
    }
});

socket.on("message", data => {
    createMessage(data);
});

function createMessage(data) {
    const messageDiv = document.getElementById("messages");

    messageDiv.innerHTML += `
        <div class="new_message">
            <label class="form_label">
                <strong> ${data.username}: </strong> <span> ${data.text} </span>
            </label>
        </div>
    `
}