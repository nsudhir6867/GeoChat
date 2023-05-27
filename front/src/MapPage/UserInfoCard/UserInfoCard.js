import React from "react";
import { useSelector } from "react-redux";
import { calculateDistanceBetweenTwoCoords } from "../../util/location";
import ActionButtons from "./ActionButtons";

const Label = ({ fontSize, text }) => {
  return (
    <p className="map_page_card_label" style={{ fontSize }}>
      {text}
    </p>
  );
};
const UserInfoCard = ({ username, userLocation, socketId }) => {
  const myLocation = useSelector((state) => state.map.myLocation);
  console.log(myLocation, "here");
  return (
    <div className="map_page_card_container">
      <Label text={username} fontSize="16px" />
      <Label
        text={`${calculateDistanceBetweenTwoCoords(
          myLocation,
          userLocation
        ).toFixed(2)} Km`}
        fontSize="14px"
      />
      <ActionButtons socketId={socketId} username={username} />
    </div>
  );
};

export default UserInfoCard;
