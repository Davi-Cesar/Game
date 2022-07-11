const socket = io();

window.location.search = window.location.search + "room"
const urlSearch = new URLSearchParams(window.location.search);
const room = urlSearch.get("select_room");

document.getElementById("btn").addEventListener("click", (event) => {
    if(event.key === "click") {
        search();
    }
});

function search() {
    console.log(window.location.search = window.location.search + room)
}