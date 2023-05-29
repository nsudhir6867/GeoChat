import { v4 as uuid } from "uuid";
import { addChatMessage, addChatbox } from "../../Messenger/MessengerSlice";
import store from "../store";
import * as socketConn from "../../socketConnection/socketConn";

export const sendChatMessage = (recieverSocketId, content) => {
  const message = {
    content,
    recieverSocketId,
    id: uuid(),
  };

  //SocketConnection: to send the message to other user
  socketConn.sendChatMessage(message);
  store.dispatch(
    addChatMessage({
      socketId: recieverSocketId,
      content: content,
      myMessage: true,
      id: message.id,
    })
  );
};

export const chatMessageHandler = (messageData) => {
  store.dispatch(
    addChatMessage({
      socketId: messageData.senderSocketId,
      content: messageData.content,
      myMessage: false,
      id: messageData.id,
    })
  );
  openChatboxIfClosed(messageData.senderSocketId);
};

export const openChatboxIfClosed = (socketId) => {
  console.log("Here I am.......");
  const chatbox = store
    .getState()
    .messenger.chatboxes.find((cb) => cb.socketId === socketId);
  console.log("2 Here I am.......");
  const username = store
    .getState()
    .map.onlineUsers.find((user) => user.socketId === socketId)?.username;

  console.log("here ", socketId, username);
  console.log(".................................");
  if (!chatbox) {
    console.log("ReACHED HERE");
    store.dispatch(addChatbox({ socketId, username }));
  }
};
