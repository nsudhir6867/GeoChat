import React from "react";
import NavBar from "./NavBar";
import Messages from "./Messages";
import NewMessage from "./NewMessage";

const Chatbox = (props) => {
  return (
    <div className="chatbox_container">
      <NavBar {...props} />
      <Messages socketId={props.socketId} />
      <NewMessage socketId={props.socketId} />
    </div>
  );
};

export default Chatbox;
