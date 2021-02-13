import React from "react";
import "../css/login.css";
const LoginWrapper = () => {
  return (
    <div className="mt-5 p-4 card shadow login-wrapper">
      <img
        src={process.env.PUBLIC_URL + "/Changjo_LOG.jpg"}
        className="login-logo mt-5"
      />
      <h2 className="text-center mt-3">직무스트레스 평가</h2>
      <form className="mt-4">
        <input type="text" placeholder="아이디" className="form-control" />
        <input
          type="password"
          placeholder="비밀번호"
          className="form-control mt-1"
        />
      </form>
      <button className="btn btn-primary mt-3">로그인</button>
    </div>
  );
};

export default LoginWrapper;
