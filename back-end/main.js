const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 9000;

let activeUsers = 0;
let totalUsers = 0;
let connections = [];

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());

wss.on('connection', (ws) => {
    connections.push(ws);
    totalUsers++;
    activeUsers = connections.length;
    
    sendActiveUserCount();

    ws.on('message', (message) => {
        // Handle received messages here
    });
    
    ws.on('close', () => {
        connections = connections.filter((conn) => conn !== ws);
        activeUsers = connections.length;
        sendActiveUserCount();
    });
});

function sendActiveUserCount() {
    const data = JSON.stringify({
        activeUsers: activeUsers,
        totalUsers: totalUsers
    });

    connections.forEach((conn) => {
        if (conn.readyState === WebSocket.OPEN) {
            conn.send(data);
        }
    });
}

// Start the server
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
