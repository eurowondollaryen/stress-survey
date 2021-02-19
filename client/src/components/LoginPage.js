import React from "react";
import LoginWrapper from "./LoginWrapper";
const LoginPage = ({setToken}) => {
  console.log(setToken);
  return (
    <div className="container">
      <LoginWrapper></LoginWrapper>
    </div>
  );
};

export default LoginPage;