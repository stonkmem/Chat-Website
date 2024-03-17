const socket = io.connect("ws://localhost:8001");
// window.onload = () => {
//     const join_option_input = prompt('Select: "CREATE" or "JOIN"', "CREATE");
//     if (join_option_input === "CREATE") {
//         socket.emit("requestCreateRoom");
//     } else if (join_option_input === "JOIN") {
//         const room_code_input = prompt("Enter Room Code");
//         socket.emit("requestJoinRoom", room_code_input);
//     } else {
//         window.onload();
//     }
// };

// socket.on("setRoomCode", (code) => {
//     currentRoomCode = code;
// });

socket.on("upd", ledger => {
    for (let data=0; data<ledger.length; data++) {
        let liNode = document.createElement("ELEM");
        let txtNode = document.createTextNode(ledger[data]);
        liNode.appendChild(txtNode);
        document.getElementById("chat-display").appendChild(liNode);
    }
});

// document.getElementById("buttonn").addEventListener("click", huh);
console.log(document.getElementById("demo").value);
function huh() {
    console.log('help');
    let fMessage = document.getElementById("name") + " ";
    fMessage += document.getElementById("msg").value;
    socket.emit("sent", fMessage);
    document.getElementById("msg").value = "";
}