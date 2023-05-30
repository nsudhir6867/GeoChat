import React from "react";

const JoinRoomButton = ({ creatorUsername, roomId, amountOfParticipants }) => {
  const joinRoomHandler = () => {};
  return (
    <button onClick={joinRoomHandler} className="map_page_v_rooms_join_button">
      {creatorUsername[0]}
    </button>
  );
};

export default JoinRoomButton;
