import express from 'express';
import cors from 'cors';
import list from './api/route.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());
app.use('/api/v1/jabber', list);

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.id).emit("receive_message", data);
  });

  socket.on("delete_message", async (data) => {
    const { messageId, id } = data;
    io.to(id).emit("delete_message", { messageId });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

export { app, server };
