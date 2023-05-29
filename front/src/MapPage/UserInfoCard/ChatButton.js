import React from "react";
import chatIcon from "../../resources/chat-icon.svg";
import { useDispatch } from "react-redux";
import { addChatbox } from "../../Messenger/MessengerSlice";

const ChatButton = ({ socketId, username }) => {
  const dispatch = useDispatch();
  const handleAddChatBox = () => {
    dispatch(
      addChatbox({
        username,
        socketId,
      })
    );
  };
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
