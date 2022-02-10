import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { setCookie, removeCookie } from "../../shared/cookie";
import { auth } from "../../shared/firebase";
import firebase from "firebase/app";

//actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

//action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

//middlewear
const signUpFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    //firebase에 id, pwd는 저장이 되니까
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        auth.currentUser
          .updateProfile({
            displayName: user_name,
          })
          .then(() => {
            dispatch(
              setUser({
                id: id,
                user_name: user_name,
                user_profile: "",
                uid: user.user.uid,
              })
            );
            alert(`${user_name}님 반갑습니다!`);
            history.push("/");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
};

const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          dispatch(
            setUser({
              user_name: user.user.displayName,
              id: id,
              user_profile: "",
              uid: user.user.uid,
            })
          );
          alert(`${user.user.displayName}님 반갑습니다:)`);
          history.push("/");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          alert("아이디와패스워드가 맞지 않습니다.");
        });
    });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            id: user.id,
            uid: user.uid,
            user_name: user.displayName,
            user_profile: "",
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  };
};

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace("/");
    });
  };
};

//reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        removeCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

//action creator export
const actionCreators = {
  logOut,
  getUser,
  signUpFB,
  loginFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };
