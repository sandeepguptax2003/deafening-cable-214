const socketio = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.emit("message", "Hello, client!");

    socket.on("chat message", (msg) => {
      console.log("Received message:", msg);

      io.emit("chat message", msg);
    });

    // Handle disconnection of the client
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = { socketio };
