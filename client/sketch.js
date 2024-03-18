const socket = io.connect("ws://localhost:8001");
let ledger = [];
/*
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
// });*/

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

socket.on("upd", mssg => {
    ledger.push(mssg);
    document.getElementById("chat-display").innerHTML = '';
    let ul = document.createElement("ul");
    for (let data=0; data<ledger.length; data++) {
        let li = document.createElement("li");
        li.textContent = ledger[data];
        ul.appendChild(li);
    }
    document.getElementById("chat-display").appendChild(ul);
});

document.getElementById("buttonn").addEventListener("click", ()=>{
    let fMessage = document.getElementById("name").value + ": ";
    fMessage += document.getElementById("msg").value;
    if(document.getElementById("msg").value!=""){
        socket.emit("msged", fMessage);
        console.log("KillMe");
    }
    document.getElementById("msg").value = "";
});

document.getElementById("klar").addEventListener("click", () => {
    ledger=[];
    document.getElementById("chat-display").innerHTML = '';
    let ul = document.createElement("ul");
    for (let data=0; data<ledger.length; data++) {
        let li = document.createElement("li");
        li.textContent = ledger[data];
        ul.appendChild(li);
    }
    document.getElementById("chat-display").appendChild(ul);
});

socket.once("backup-history", (hist)=>{
    ledger=hist;
    document.getElementById("chat-display").innerHTML = '';
    let ul = document.createElement("ul");
    for (let data=0; data<ledger.length; data++) {
        let li = document.createElement("li");
        li.textContent = ledger[data];
        ul.appendChild(li);
    }
    document.getElementById("chat-display").appendChild(ul);
});
