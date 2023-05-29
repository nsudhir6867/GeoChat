import React, { useState } from "react";
import { sendChatMessage } from "../../store/actions/messengerActions";
import { useSelector } from "react-redux";

const NewMessage = ({ socketId }) => {
  const [message, setMessage] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);

  const messageValueChangleHandler = (event) => {
    setMessage(event.target.value);
  };
  const keyPressedHandler = (event) => {
    console.log("send message");
    console.log(event);
    if (event.code === "Enter" && message.length > 0) {
      proceedChatMessage();
      setMessage("");
    }
  };
  const proceedChatMessage = () => {
    console.log("I am here");
    if (onlineUsers.find((user) => user.socketId === socketId)) {
      sendChatMessage(socketId, message);
    } else {
      setInputDisabled(true);
    }
  };
  return (
    <div className="chatbox_new_message_container">
      <input
        className="chatbox_new_message_input"
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={messageValueChangleHandler}
        onKeyDown={keyPressedHandler}
        disabled={inputDisabled}
      />
    </div>
  );
};

export default NewMessage;
