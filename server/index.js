const express = require("express");
const cors = require("cors");
//Express app is created here
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const { PeerServer } = require("peer");

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
let videoRooms = {};

io.on("connection", (socket) => {
  console.log(`user connected of the id: ${socket.id}`);
  //this event will be emitted at the client side when user provides the valid username.
  socket.on("user-login", (data) => {
    //after user emits the user-login event, we will recieve data.
    loginEventHandler(socket, data);
  });

  socket.on("chat-message", (data) => chatMessageHandler(socket, data));

  socket.on("video-room-create", (data) => {
    createVideoRoomHandler(socket, data);
  });

  socket.on("video-room-join", (data) => {
    videoRoomJoinHandler(socket, data);
  });

  socket.on("video-room-leave", (data) => {
    console.log("video=room-leave listened");
    videoRoomLeaveHandler(socket, data);
  });

  //We can add event listener on socket to listen when a connected user disconnect.
  socket.on("disconnect", () => {
    disconnectEventHandler(socket);
  });
});

//PeerJs server
const peerServer = PeerServer({ port: 9000, path: "/peer" });

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  console.log(`Server is working at port ${PORT}`);
});

//Socket events

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
  broadcastVideoRooms();
};

//We invoke this funtion when a user disconnects from the server.
const disconnectEventHandler = (socket) => {
  console.log(`User disconnected of the id: ${socket.id}`);
  checkIfUserIsInCall(socket);
  removeOnlineUser(socket.id);
  broadCastDisconnectedUserDetails(socket.id);
};

const chatMessageHandler = (socket, data) => {
  console.log("message recieved");
  console.log("sending message to the other user.");
  const { recieverSocketId, content, id } = data;
  if (onlineUsers[recieverSocketId]) {
    io.to(recieverSocketId).emit("chat-message", {
      senderSocketId: socket.id,
      content,
      id,
    });
  }
};

const createVideoRoomHandler = (socket, data) => {
  console.log("new room", data);
  const { peerId, newRoomId } = data;
  //Adding new room
  videoRooms[newRoomId] = {
    participants: [
      //This participant is the creator of the video room
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId: peerId, //When a user joins the room later, he should know which user he should connect, that's why we use peer id
      },
    ],
  };

  //Now we have to inform all the other users that new room has been created.
  broadcastVideoRooms();
};

const videoRoomJoinHandler = (socket, data) => {
  const { roomId, peerId } = data;
  if (videoRooms[roomId]) {
    videoRooms[roomId].participants.forEach((participant) => {
      socket.to(participant.socketId).emit("video-room-init", {
        newParticipantPeerId: peerId,
      });
    });
    videoRooms[roomId].participants = [
      ...videoRooms[roomId].participants,
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId,
      },
    ];
    broadcastVideoRooms();
  }
};

const videoRoomLeaveHandler = (socket, data) => {
  const { roomId } = data;
  console.log("before leaving");
  console.log(videoRooms[roomId]);
  if (videoRooms[roomId]) {
    videoRooms[roomId].participants = videoRooms[roomId].participants.filter(
      (p) => p.socketId !== socket.id
    );
  }
  console.log("after leaving");
  console.log(videoRooms[roomId]);
  if (videoRooms[roomId].participants.length > 0) {
    //Emit an event to the user which is in the room that he should also close his peer connection.
    socket
      .to(videoRooms[roomId].participants[0].socketId)
      .emit("video-call-disconnect");
  }

  if (videoRooms[roomId].participants.length < 1) {
    delete videoRooms[roomId];
  }

  broadcastVideoRooms();
};

const removeOnlineUser = (id) => {
  if (onlineUsers[id]) {
    delete onlineUsers[id];
  }
  console.log(onlineUsers);
};

const checkIfUserIsInCall = (socket) => {
  Object.entries(videoRooms).forEach(([key, value]) => {
    const participant = value.participants.find(
      (p) => p.socketId === socket.id
    );
    if (participant) {
      removeUserFromVideoRoom(socket.id, key);
    }
  });
};

const removeUserFromVideoRoom = (socketId, roomId) => {
  videoRooms[roomId].participants = videoRooms[roomId].participants.filter(
    (p) => p.socketId !== socketId
  );
  //Remove room if no participants left in the room.
  if (videoRooms[roomId].participants.length < 1) {
    delete videoRooms[roomId];
  } else {
    //If still there is a user in the room - inform him to clear his peer connection
    io.to(videoRooms[roomId].participants[0].socketId).emit(
      "video-call-disconnect"
    );
  }
  broadcastVideoRooms();
};

//Function to let the client know about the disconnected user.
const broadCastDisconnectedUserDetails = (disconnedSocketId) => {
  io.to("logged-users").emit("user-disconnected", disconnedSocketId);
};

//Function to broadcast to the other users that room has been created.
const broadcastVideoRooms = () => {
  io.to("logged-users").emit("video-rooms", videoRooms);
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
