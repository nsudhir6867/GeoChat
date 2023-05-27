import React from "react";
import "./LoginPage.css";

const LoginInput = ({ username, setUsername }) => {
  const inputChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  return (
    <input
      className="l_page_input"
      value={username}
      onChange={inputChangeHandler}
    />
  );
};

export default LoginInput;
