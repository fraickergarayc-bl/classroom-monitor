require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/auth");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("🚀 Classroom Monitor funcionando");
});

let students = [];

io.on("connection", (socket) => {

    console.log("🟢 Nuevo usuario conectado:", socket.id);

    students.push(socket.id);

    io.emit("students-update", students);

    socket.on("disconnect", () => {

        console.log("🔴 Usuario desconectado:", socket.id);

        students = students.filter(
            id => id !== socket.id
        );

        io.emit("students-update", students);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});