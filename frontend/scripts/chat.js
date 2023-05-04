const socket = io("http://localhost:8080/", { transports: ["websocket"] });

const messages = document.getElementById("messages");
const inputMessage = document.getElementById("input-message");
const sendBtn = document.getElementById("send-btn");

function addMessage(msg) {
  const messageElement = document.createElement("div");
  messageElement.innerText = msg;
  messages.appendChild(messageElement);
}

inputMessage.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMsg();
  }
});

sendBtn.addEventListener("click", () => {
  sendMsg();
});

function sendMsg() {
  const message = inputMessage.value;
  if (message) {
    socket.emit("chat message", message);
    inputMessage.value = "";
    addMessage(`You: ${message}`);
  }
}

socket.on("message", (msg) => {
  addMessage(msg);
});

socket.on("chat message", (msg) => {
  addMessage(`Client: ${msg}`);
});

// RECIEVING DATA FROM SERVER
// socket.on("message", (msg) => {
//   console.log(msg);
// });

// socket.emit("chat message", "hii server");

// socket.on("chat message", (msg) => {
//   console.log(msg);
// });
