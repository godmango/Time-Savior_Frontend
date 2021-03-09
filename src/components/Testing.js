import React, { useState, useEffect, useRef } from "react";
import DigitalClock from "./DigitalClock";

const Testing = () => {
  const [clockScreen, setClockScreen] = useState("Off");
  let timEr = null;
  let countingNum = useRef(0);

  const mouseMovement = (e) => {
    setClockScreen("Off");
    countingNum.current = 0;
    clearInterval(timEr);
    if (clockScreen === "On") {
      return;
    }
    timEr = setInterval(() => {
      ++countingNum.current;
      console.log(countingNum.current);
      if (countingNum.current > 10) {
        setClockScreen("On");
        clearInterval(timEr);
      }
    }, 1000);
  };

  return (
    <div className={`screenSave${clockScreen}`} onMouseMove={mouseMovement}>
      <DigitalClock clockScreen={clockScreen} />
      {/* <div className="timeDivBottom"></div> */}
    </div>
  );
};

export default Testing;
