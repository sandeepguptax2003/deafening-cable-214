// Load the required modules
const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http");
const { connection } = require("./configs/db");
const server = http.createServer(app);
const io = require("socket.io")(server);

//SOCKET LOGIC
const { socketio } = require("./socket/socketio");

socketio(io);

//LISTEN
const port = process.env.PORT || 3000;
server.listen(port, async () => {
  try {
    await connection();
  } catch (error) {
    console.log(error.message);
  }
  console.log(`listening on *:${port}`);
});
