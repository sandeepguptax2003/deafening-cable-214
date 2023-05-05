const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http");
const server = http.createServer(app);
const { connection, client } = require("./configs/db");
const io = require("socket.io")(server);

const { userRoute } = require("./routes/user.route");
app.use(express.json());

//SOCKET LOGIC
const { socketio } = require("./socket/socketio");

socketio(io);

app.get("/", (req, res) => {
  res.send("welcome to ChatMate home page");
});

//ROUTES

// app.use("/user", userRoute);
app.post("/addContact", async (req, res) => {
  try {
    const contact = req.body; // Get the contact object from the request body
    const result = await db.collection("contacts").insertOne(contact); // Add the contact to MongoDB

    res.status(200).send(); // Send a success response
  } catch (err) {
    console.log(err);
    res.status(500).send(); // Send an error response
  }
});
// server side/backend code use this starts

// API endpoint for searching contacts
app.get("/search", (req, res) => {
  const query = req.query.q.toLowerCase();
  contacts.findOne({ name: { $regex: `^${query}` } }, (err, result) => {
    if (err) throw err;
    if (result) {
      res.send(result.name);
    } else {
      res.send("");
    }
  });
});
// server side/backend code use this ends

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
