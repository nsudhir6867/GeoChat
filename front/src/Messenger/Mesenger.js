import React from "react";
import { useSelector } from "react-redux";
import "./Messenger.css";
import Chatbox from "./Chatbox/Chatbox";

// const DUMMY_CHATBOXES = [
//   {
//     username: "Martin",
//     socketId: 3213123,
//     message: [],
//   },
//   {
//     username: "Robinkant",
//     socketId: 3213123,
//     message: [],
//   },
// ];

const Messenger = () => {
  const chatboxs = useSelector((state) => state.messenger.chatboxes);
  return (
    <div className="messenger_container">
      {chatboxs.map((chatbox) => (
        <Chatbox
          key={chatbox.socketId}
          socketId={chatbox.socketId}
          username={chatbox.username}
        />
      ))}
    </div>
  );
};

export default Messenger;
