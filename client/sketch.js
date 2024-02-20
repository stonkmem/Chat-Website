import React, {useState, useEffect} from 'react'
let ball;
let currentRoomCode = 0;

const socket = io.connect("ws://localhost:8001");
function setup() {
}

window.onload = () => {
    const join_option_input = prompt('Select: "CREATE" or "JOIN"', "CREATE");
    if (join_option_input === "CREATE") {
        socket.emit("requestCreateRoom");
    } else if (join_option_input === "JOIN") {
        const room_code_input = prompt("Enter Room Code");
        socket.emit("requestJoinRoom", room_code_input);
    } else {
        window.onload();
    }
};

socket.on("setRoomCode", (code) => {
    currentRoomCode = code;
});

function draw() {
	socket.emit("position", ball.pos.x, ball.pos.y);
    if (!currentRoomCode) {
        alert("STOP TROLLING")
    }
}

function move() {
    const SPEED = 10;
    if (kb.pressing("w")) {
        ball.pos.y -= SPEED;
    }
    if (kb.pressing("a")) {
        ball.pos.x -= SPEED;
    }
    if (kb.pressing("s")) {
        ball.pos.y += SPEED;
    }
    if (kb.pressing("d")) {
        ball.pos.x += SPEED;
    }
}

socket.on("buildMap", (mapData) => {
    for (const blockData of Object.values(mapData.blocks)) {
        let group = new Group();
        Object.assign(group, blockData);
        new Tiles(
            blockData.tileMap,
            blockData.startX,
            blockData.startY,
            blockData.w,
            blockData.h
        );
    }
});

socket.on("playerDataUpdate", (id, playerData) => {
    for (let data of playerData) {
        if (data.id === id)
            continue;
        if (!em.exists(data.id)) {
            em.registerNewPlayer(data);
        } else {
            em.updatePlayerData(data);
        }
    }
});