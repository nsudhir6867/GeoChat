import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMyLocation } from "../MapPage/mapSlice";
import { getFakeLocation } from "./FAKE_LOCATION";
import { conncectWithSocketIOServer } from "../socketConnection/socketConn";

import "./LoginPage.css";
import LoginButton from "./LoginButton";
import LoginInput from "./LoginInput";
import Logo from "./Logo";
import { proceedWithLogin } from "../store/actions/loginPageActions";
import { connectWithPeerServer } from "../realtimeCommunication/webRTCHandler";

//Helper function for the LoginPage
const isUsernameValid = (username) => {
  return username.length > 0 && username.length < 10 && !username.includes(" ");
};

//Location options to get current location of the user.
const locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

//Main component
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [locationErrorOccurred, setLocationErrorOccurred] = useState(false);
  const myLocation = useSelector((state) => state.map.myLocation);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = () => {
    //ProceedWithLogin emits the "user-login" with the below data
    proceedWithLogin({
      username,
      coords: {
        lng: myLocation.lng,
        lat: myLocation.lat,
      },
    });
    navigate("/map");
  };

  //Function for the getting current postion of the user.
  //onSuccess function is called when we successfully get the location of the user.
  const onSuccess = (position) => {
    console.log(position.coords);
    dispatch(
      setMyLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  };
  //On error is called when we get some error while getting the user's location
  const onError = (error) => {
    console.log("Error occurred while trying to get the location.");
    console.log(error);
    setLocationErrorOccurred(true);
  };

  //UseEffect Implementation to get location of the user that is computer.
  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(
    //   onSuccess,
    //   onError,
    //   locationOptions
    // );
    onSuccess(getFakeLocation());
  }, []);

  //As soon as we get the location of the user we will connect to the socket io server.
  useEffect(() => {
    if (myLocation) {
      conncectWithSocketIOServer();
      connectWithPeerServer();
    }
  }, [myLocation]);

  return (
    <div className="l_page_main_container">
      <div className="l_page_box">
        <Logo />
        <LoginInput username={username} setUsername={setUsername} />
        <LoginButton
          disabled={!isUsernameValid(username) || locationErrorOccurred}
          onClickHandler={loginHandler}
        />
      </div>
    </div>
  );
};

export default LoginPage;
