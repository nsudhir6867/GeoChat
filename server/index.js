const express = require("express");
const cors = require("cors");
//Express app is created here
const app = express();
const http = require("http");

const { Server } = require("socket.io");

//Create server using http module and express app.
const server = http.createServer(app);
// As we are not passing any argument to cors, our app will accept connection from all types of origins.
app.use(cors());

//Connecting our nodejs application to socket.io server
const io = new Server(server, {
  cors: {
    origin: "*", //accepts all conncection types,
    method: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Hello server is working");
});

//List of all the online users, we will add users in this object from loginEventHandler function.
let onlineUsers = {};

io.on("connection", (socket) => {
  console.log(`user connected of the id: ${socket.id}`);
  //this event will be emitted at the client side when user provides the valid username.
  socket.on("user-login", (data) => {
    //after user emits the user-login event, we will recieve data.
    loginEventHandler(socket, data);
  });

  //We can add event listener on socket to listen when a connected user disconnect.
  socket.on("disconnect", () => {
    disconnectEventHandler(socket.id);
  });
});

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  console.log(`Server is working at port ${PORT}`);
});

//Socket events
//We invoke this funtion when a user disconnects from the server.
const disconnectEventHandler = (id) => {
  console.log(`User disconnected of the id: ${id}`);
  removeOnlineUser(id);
  broadCastDisconnectedUserDetails(id);
};

const removeOnlineUser = (id) => {
  if (onlineUsers[id]) {
    delete onlineUsers[id];
  }
  console.log(onlineUsers);
};

//Function to let the client know about the disconnected user.
const broadCastDisconnectedUserDetails = (disconnedSocketId) => {
  io.to("logged-users").emit("user-disconnected", disconnedSocketId);
};

//We invoke this function when a user connects to server.
const loginEventHandler = (socket, data) => {
  //Every user who logins to our application, will emit user-login event with username and coordinates, can join
  // the socket io room(logged-users);
  //User will automatically leave the logged-users room once he disconnects
  socket.join("logged-users");
  onlineUsers[socket.id] = {
    username: data.username,
    coords: data.coords,
  };
  console.log(onlineUsers);
  //here we will emit an event to all the user that has joined the logged-users room.
  // we will be listening for the online-users on client side.
  io.to("logged-users").emit(
    "online-users",
    convertOnlineUsersToArray(onlineUsers)
  );
};

//Helper function to convert obj to array
const convertOnlineUsersToArray = (obj) => {
  const onlineUsersArray = [];
  Object.entries(obj).forEach(([key, value]) => {
    onlineUsersArray.push({
      socketId: key,
      username: value.username,
      coords: value.coords,
    });
  });
  return onlineUsersArray;
};
