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

    console.log("🟢 Conexión:", socket.id);

socket.on("student-join", (data) => {

    console.log(data);

    students.push({
        id: socket.id,
        name: data.name
    });

    io.emit("students-update", students);
});
    socket.on("disconnect", () => {

        students = students.filter(
            student => student.id !== socket.id
        );

        io.emit("students-update", students);

        console.log("🔴 Desconectado");
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});