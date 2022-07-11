const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const room = urlSearch.get("select_room");
const todos = urlSearch;

console.log(window.location.search)
// socket.emit("select_room", {
//     room,
// });

const roomDiv = document.getElementById("name_room");
roomDiv.innerHTML = `<h3 class="room">${room}</h3>`

