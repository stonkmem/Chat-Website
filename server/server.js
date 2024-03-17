import { Server } from "socket.io";

// create http server forwarding network traffic to socketio server
const io = new Server(8001, {
    cors: {
      origin: "*",
    },
});

const clients = new Set();
let clientCode=0;

let ledger = [];

function Client(socket) {
    this.socket = socket;
}

console.log("Server running...")

io.on("connection", socket => {
    console.log("New connection!");
    let client = new Client(socket);
    clients.add(client);

    socket.on("disconnect", () => {
        clients.delete(client);
        clients.forEach(c => {
            c.socket.emit("removeClient", socket.id);
        })
    });
});

io.on("removeClient", id => {
    let playerData = em.get(id);
    if (playerData) {
        playerData.sprite.remove();
        em.delete(id);
    }
});

io.on("sent", (strrr) => {
    ledger.add(strrr);
    io.emit("upd", ledger);
});