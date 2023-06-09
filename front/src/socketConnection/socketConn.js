import io from "socket.io-client";
import {
  onlineUserHandler,
  userDisconnectedHandler,
} from "../store/actions/userActions";

import { videoRoomsListHandler } from "../store/actions/videoRoomActions";
import { call, disconnect } from "../realtimeCommunication/webRTCHandler";
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

  socket.on("video-rooms", (videoRooms) => {
    console.log("new list of rooms recieved", videoRooms);
    videoRoomsListHandler(videoRooms);
  });

  socket.on("video-room-init", (data) => {
    call(data);
  });

  socket.on("video-call-disconnect", () => {
    disconnect();
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

export const createVideoRoom = (data) => {
  socket.emit("video-room-create", data);
};

export const joinVideoRoom = (data) => {
  console.log("Emitting event to joint the room");
  socket.emit("video-room-join", data);
};

export const leaveVideoRoom = (data) => {
  console.log("video-room-leave emiited");
  socket.emit("video-room-leave", data);
};
