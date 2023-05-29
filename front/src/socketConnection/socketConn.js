import io from "socket.io-client";
import {
  onlineUserHandler,
  userDisconnectedHandler,
} from "../store/actions/userActions";
import { chatMessageHandler } from "../store/actions/messengerActions";
let socket = null;

export const conncectWithSocketIOServer = () => {
  socket = io("http://localhost:3003");
  socket.on("connect", () => {
    console.log("connected to socket server");
  });
  socket.on("online-users", (userData) => {
    console.log(userData);
    onlineUserHandler(socket.id, userData);
  });
  socket.on("chat-message", (messageData) => {
    console.log(messageData);
    chatMessageHandler(messageData);
  });
  socket.on("user-disconnected", (disconnectedUserSocketId) => {
    userDisconnectedHandler(disconnectedUserSocketId);
  });
};

export const login = (data) => {
  socket.emit("user-login", data);
};

export const sendChatMessage = (data) => {
  socket.emit("chat-message", data);
};
