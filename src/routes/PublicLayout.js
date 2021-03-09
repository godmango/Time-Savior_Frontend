import React, { useState, useRef } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import PublicNavbar from "../components/PublicNavbar";

import { useSelector } from "react-redux";
import DigitalClock from "../components/DigitalClock";
import Testing from "../components/Testing";

const PublicLayout = () => {
  const currentTheme = useSelector((state) => state.auth.theme);
  const [clockScreen, setClockScreen] = useState("Off");
  let timEr = null;
  let countingNum = useRef(0);
  // let ticking = useRef(null);
  const [ticking2, setTicking2] = useState(false);
  let example = useLocation();

  const mouseMovement = (e) => {
    if (example.pathname !== "/") return;
    setClockScreen("Off");
    countingNum.current = 0;
    clearInterval(timEr);
    // ticking = false;
    if (clockScreen === "On") {
      return;
    }
    // console.log(ticking);
    // if (ticking === true) return;
    // console.log(ticking2);
    if (ticking2 === true) return;
    timEr = setInterval(() => {
      // if (countingNum.current > 0) {
      //   ticking = true;
      // } else {
      //   ticking = false;
      // }
      ++countingNum.current;
      if (countingNum.current > 0) {
        // ticking = true;
        setTicking2(true);
      } else {
        // ticking = false;
        setTicking2(false);
      }
      console.log(countingNum.current);
      // console.log("the ticking", ticking2);

      if (countingNum.current > 60) {
        setClockScreen("On");
        // ticking = false;
        setTicking2(false);
        clearInterval(timEr);
      }
    }, 1000);
  };
  // console.log("the location", example);
  console.log(ticking2);

  return (
    <div className="allPublic" onMouseMove={mouseMovement}>
      {/* <Testing /> */}
      <DigitalClock clockScreen={clockScreen} />
      <PublicNavbar />
      {/* <p>mouse X is {mousePos.x}</p>
      <p>mouse Y is {mousePos.y}</p>
      <p>saved mouse X is {savedMousePos.x}</p>
      <p>saved mouse Y is {savedMousePos.y}</p> */}
      <div className={`maxPublic${currentTheme}`}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />

          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  );
};

export default PublicLayout;
