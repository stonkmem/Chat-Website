import { Server } from "socket.io";
// create http server forwarding network traffic to socketio server
const io = new Server(8001, {
    cors: {
      origin: "*",
    },
});

io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
});

const clients = new Set();

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

    socket.on("msged", (strrr) => {
        console.log("RECEIVED");
        io.emit("upd", strrr);
    });

});

io.on("removeClient", id => {
    let playerData = em.get(id);
    if (playerData) {
        playerData.sprite.remove();
        em.delete(id);
    }
});
