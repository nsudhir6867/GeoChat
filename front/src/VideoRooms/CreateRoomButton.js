import React from "react";
import callIcon from "../resources/call-icon.svg";
import { createVideoRoom } from "../store/actions/videoRoomActions";

const CreateRoomButton = () => {
  const createRoomHandler = () => {
    createVideoRoom();
  };
  return (
    <img
      className="map_page_card_img"
      alt="create_button"
      src={callIcon}
      onClick={createRoomHandler}
    ></img>
  );
};

export default CreateRoomButton;
