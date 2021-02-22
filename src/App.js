import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "@djthoms/pretty-checkbox";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import authActions from "./redux/actions/auth.actions";

// Adding Fontawesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faRegistered,
  faSignOutAlt,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import PublicLayout from "./routes/PublicLayout";

library.add(faBars, faRegistered, faSignOutAlt, faSignInAlt);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      dispatch(authActions.getCurrentUser(accessToken));
    } else {
      dispatch(authActions.logout());
    }
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Route path="/" component={PublicLayout} />
      </Switch>
    </Router>
  );
}

export default App;
