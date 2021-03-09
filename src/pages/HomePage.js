import React from "react";
import YouTubeVideoLoader from "../components/YouTubeVideoLoader";
import DigitalClock from "../components/DigitalClock";
import Memo from "../components/Memo";
import GlobalChat from "../components/GlobalChat";

const HomePage = () => {
  console.log("render hp");
  return (
    <div className="maxHomepage">
      {/* <DigitalClock /> */}
      <div className="maxTopHalf">
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
