import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { useDispatch } from "react-redux";

import { apiKey } from "./firebase";
import { history } from "../redux/configuserStore";
import { actionCreators as userActions } from "../redux/modules/user";

import Header from "../components/Header";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Create from "../pages/Create";
import Search from "./Search";
import Notification from "../pages/Notification";
import NotFound from "../pages/NotFound";

import "./App.css";

function App() {
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="pb-10">
        <ConnectedRouter history={history}>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/create" exact>
            <Create />
          </Route>
          {/* 수정패이지 */}
          <Route path="/create/:id" exact>
            <Create />
          </Route>
          <Route path="/detail/:id" exact>
            <Detail />
          </Route>
          <Route path="/search" exact>
            <Search />
          </Route>
          <Route path="/noti" exact>
            <Notification />
          </Route>
        </ConnectedRouter>
      </div>
    </div>
  );
}

export default App;
