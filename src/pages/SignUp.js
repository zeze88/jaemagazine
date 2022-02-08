import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import emailCheck from "../shared/common";
import { Privacy } from "./Login";
const SignUp = (props) => {
  const dispatch = useDispatch();
  const [fillForm, setFillForm] = React.useState({});

  const onChange = (e) => {
    const targetId = e.target.id;
    const targetValue = e.target.value;

    setFillForm({
      ...fillForm,
      [targetId]: targetValue,
    });
  };
  const signup = () => {
    console.log(fillForm);
    const { id, nick_name, pwd, re_pwd } = fillForm;

    if (!id) {
      alert("아이디를 입력해주세요:)");
    } else if (!nick_name) {
      alert("닉네임을 입력해주세요:)");
    } else if (!pwd) {
      alert("비밀번호를 입력해주세요:)");
    } else if (!re_pwd) {
      alert("비밀번를 다시한번 입력해주세요:)");
    } else if (pwd !== re_pwd) {
      alert("비밀번호가 서로 같지 않습니다. :)");
    }
    dispatch(userActions.signUpFB(id, pwd, nick_name));
  };
  return (
    <Privacy>
      <h2 className="text-bold text-2xl">회원가입</h2>
      <form className="py-10">
        <label htmlFor="id">
          <input
            id="id"
            type="text"
            onChange={onChange}
            placeholder="아이디 입력해주세요 :)"
            className="focus:outline-none focus:border-b-rose-600 border-b"
          />
        </label>
        <label htmlFor="nickName">
          <input
            id="nick_name"
            type="text"
            onChange={onChange}
            placeholder="닉네임 입력해주세요 :)"
            className="focus:outline-none focus:border-b-rose-600 border-b"
          />
        </label>
        <label htmlFor="password">
          <input
            id="pwd"
            type="password"
            onChange={onChange}
            placeholder="비밀번호 입력해주세요 :)"
            className="focus:outline-none focus:border-b-rose-600 border-b"
          />
        </label>
        <label htmlFor="rePassword">
          <input
            id="re_pwd"
            type="password"
            onChange={onChange}
            placeholder="비밀번호를 재입력해주세요 :)"
            className="focus:outline-none focus:border-b-rose-600 border-b"
          />
        </label>
      </form>
      <button
        onClick={() => {
          signup();
        }}
        className="w-full py-3 bg-slate-300 hover:bg-rose-300 rounded text-white">
        가입하기
      </button>
    </Privacy>
  );
};

export default SignUp;
