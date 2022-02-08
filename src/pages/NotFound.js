import React from "react";
import { history } from "../redux/configuserStore";

const NotFound = (props) => {
  return (
    <>
      <div>주소 확인 플리즈</div>
      <button
        onClick={() => {
          history.push("./");
        }}>
        go to home
      </button>
    </>
  );
};

export default NotFound;
