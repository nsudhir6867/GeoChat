import React from "react";
import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";
import "./MapPage.css";
import Marker from "./Marker";
import UserInfoCard from "./UserInfoCard/UserInfoCard";
import Messenger from "../Messenger/Mesenger";

const MapPage = () => {
  const myLocation = useSelector((state) => state.map.myLocation);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);
  const cardChosenOption = useSelector((state) => state.map.cardChosenOption);
  const defaultMapProps = {
    center: {
      lat: myLocation.lat,
      lng: myLocation.lng,
    },
    zoom: 11,
  };
  console.log(defaultMapProps);

  return (
    <div className="map_page_container">
      <GoogleMapReact
        style={{ height: "100%", width: "100%" }}
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
        resetBoundsOnResize={true}
      >
        {onlineUsers.map((onlineUser) => {
          console.log(onlineUser);
          return (
            <Marker
              key={onlineUser.socketId}
              lat={onlineUser.coords.lat}
              lng={onlineUser.coords.lng}
              myself={onlineUser.myself}
              socketId={onlineUser.socketId}
              username={onlineUser.username}
              coords={onlineUser.coords}
            />
          );
        })}
      </GoogleMapReact>
      <Messenger />
      {cardChosenOption && (
        <UserInfoCard
          socketId={cardChosenOption.socketId}
          username={cardChosenOption.username}
          userLocation={cardChosenOption.coords}
        />
      )}
    </div>
  );
};

export default MapPage;
