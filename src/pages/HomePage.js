import React, { useState, useEffect } from "react";
import YouTubeVideoLoader from "../components/YouTubeVideoLoader";
import TodoList from "../components/TodoList";
import DigitalClock from "../components/DigitalClock";
import Memo from "../components/Memo";
import GlobalChat from "../components/GlobalChat";

const HomePage = () => {
  return (
    <div className="maxHomepage">
      <DigitalClock />
      <div className="maxTopHalf">
        {/* <TodoList /> */}
        <Memo />
        <YouTubeVideoLoader />
      </div>
      <div className="maxGlobal">
        <GlobalChat />
      </div>
    </div>
  );
};

export default HomePage;
