import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configuserStore";
import { apiKey } from "../shared/firebase";

import styled from "styled-components";
import Avarta from "../Avatar";

const Header = () => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_login && is_session) {
    return (
      <MainHeader className="sticky top-0 flex items-center justify-between w-full border-b border-black-500 px-10 py-2 backdrop-blur-sm">
        <Avarta />
        <h1
          onClick={() => {
            history.push("/");
          }}>
          Jae's Magazine
        </h1>
        <nav className="">
          <button
            onClick={() => {
              history.push("/noti");
            }}>
            알림
          </button>
          <button
            onClick={() => {
              dispatch(userActions.logoutFB({}));
            }}>
            로그아웃
          </button>
        </nav>
      </MainHeader>
    );
  }
  return (
    <MainHeader className="sticky top-0 flex items-center justify-between w-full border-b border-black-500 px-10 py-2 backdrop-blur-sm">
      <Avarta />
      <h1
        onClick={() => {
          history.push("/");
        }}>
        Jae's Magazine
      </h1>
      <nav className="">
        <button
          onClick={() => {
            history.push("/signup");
          }}>
          회원가입
        </button>
        <button
          onClick={() => {
            history.push("/login");
          }}>
          로그인
        </button>
      </nav>
    </MainHeader>
  );
};
const MainHeader = styled.header`
  z-index: 10;

  h1 {
    color: #626262;
    color: #000;
    font-family: "Comforter", cursive;
    cursor: pointer;
  }

  button {
    padding: 0 10px;
    margin: 0 4px;
    border: solid 1px #eee;
  }
`;

export default Header;
