import React from "react";
import closeIcon from "../../resources/close-icon.svg";
import { useDispatch } from "react-redux";
import { removeChatbox } from "../MessengerSlice";

const ChatboxLabel1 = ({ username }) => {
  return <p className="chatbox_nav_bar_label">{username}</p>;
};

const CloseButton = ({ socketId }) => {
  const dispatch = useDispatch();
  const CloseChatboxHandler = () => {
    console.log("closing");
    dispatch(removeChatbox(socketId));
  };
  return (
    <div className="chatbox_close_icon_container">
      <img
        alt="close"
        src={closeIcon}
        className="chatbox_close_icon_img"
        onClick={CloseChatboxHandler}
      />
    </div>
  );
};

const NavBar = ({ username, socketId }) => {
  return (
    <div className="chatbox_nav_bar_container">
      <ChatboxLabel1 username={username} />
      <CloseButton socketId={socketId} />
    </div>
  );
};

export default NavBar;
