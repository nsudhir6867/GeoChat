import React from "react";
import chatIcon from "../../resources/chat-icon.svg";
const ChatButton = ({ socketId, username }) => {
  const handleAddChatBox = () => {};
  return (
    <img
      src={chatIcon}
      className="map_page_card_img"
      alt="chat"
      onClick={handleAddChatBox}
    ></img>
  );
};

export default ChatButton;
