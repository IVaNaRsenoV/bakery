const express = require("express");
const cors = require("cors");
const router = require("./controllers/controllers");
const { Server } = require("socket.io");
const http = require("http");
const cookieParser = require("cookie-parser");

const PORT = 5000;
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: "*"
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/get-cookie", (req, res) => {
    const cookieValue = req.cookies.token || "Куки не найдены";
    res.send(`Значение куки: ${cookieValue}`);
});

app.use("/users", router);

io.on("connection", (socket) => {
  socket.on("forum", (data) => {
    console.log(data);
    io.emit("forum", data);
  })
})

server.listen(PORT, (req, res) => {
  console.log(`PORT: ${PORT} server start 🎉`);
});