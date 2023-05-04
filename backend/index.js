// Load the required modules
const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http");
const { connection } = require("./configs/db");
const server = http.createServer(app);
const io = require("socket.io")(server);
const {connection, client} = require("./configs/db");
const {userrouter} = require("./routes/user.route");
app.use(express.json());
//SOCKET LOGIC
const { socketio } = require("./socket/socketio");

socketio(io);



//========================



app.get("/",(req,res)=>{
  res.send("welcome to ChatMate home page")
})

app.use("/user",userrouter);
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

