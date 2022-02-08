import React from "react";
import { useDispatch } from "react-redux";
import { setCookie, getCookie, removeCookie } from "../shared/cookie";
import { actionCreators as userActions } from "../redux/modules/user";

import styled from "styled-components";
import emailCheck from "../shared/common";

const Login = (props) => {
  const [cookies, setCookies] = React.useState({});
  const dispatch = useDispatch();
  const onChange = (e) => {
    const targetId = e.target.id;
    const targetValue = e.target.value;
    setCookies({ ...cookies, [targetId]: targetValue });
  };

  const onLogin = () => {
    const { id, pwd } = cookies;
    if (!id || !pwd) {
      return alert("빈칸이 있습니다.");
    }
    // if (!emailCheck(id)) {
    //   return alert("이메일 형식이 옳지 않습니다.");
    // }
    dispatch(userActions.loginFB(id, pwd));

    setCookie("user_id", id);
  };
  return (
    <Privacy>
      <div className="text-bold text-2xl">login</div>
      <form className="py-10">
        <label htmlFor="id">
          <input
            id="id"
            type="text"
            placeholder="아이디 입력해주세요 :)"
            className="focus:outline-none focus:border-b-rose-600 border-b"
            onChange={onChange}
          />
        </label>
        <label htmlFor="password">
          <input
            id="pwd"
            type="password"
            placeholder="비밀번호 입력해주세요 :)"
            className="focus:outline-none focus:border-b-rose-600 border-b"
            onChange={onChange}
          />
        </label>
      </form>
      <button
        onClick={() => {
          onLogin();
        }}
        className="w-full py-3 bg-slate-300 hover:bg-rose-300 rounded text-white">
        로그인
      </button>
    </Privacy>
  );
};

export const Privacy = styled.div`
  width: 400px;
  margin: 0 auto;
  padding: 80px 0;

  label {
    display: block;
    margin: 10px 0;
  }

  input {
    width: 100%;
    padding: 10px;
  }
`;

export default Login;
