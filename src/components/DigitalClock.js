import React, { useState } from "react";
import { useSelector } from "react-redux";

const DigitalClock = () => {
  const currentTheme = useSelector((state) => state.auth.theme);
  const [nowTime, setNowTime] = useState("");
  const updatedTime = () => {
    let time = new Date();
    let day = time.getDay();
    let date = time.getDate();
    let month = time.getMonth();
    let year = time.getFullYear();
    let allDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    let h = time.getHours();
    let amPm;
    if (h > 12) {
      amPm = "PM";
    } else {
      amPm = "AM";
    }
    let twelveH = h % 12;
    if (twelveH) {
      twelveH = twelveH;
    } else {
      twelveH = 12;
    }

    let min = time.getMinutes();
    let sec = time.getSeconds();
    let zero;
    if (sec < 10) {
      zero = 0;
    } else {
      zero = "";
    }
    setNowTime(`${allDays[day]} ${year}/${allMonths[month]}/${date}
    ${amPm} ${twelveH}:${min}:${zero}${sec}`);
  };

  setInterval(updatedTime, 1000);

  return (
    <div>
      <div className={`digiClock${currentTheme}`}>{nowTime}</div>
    </div>
  );
};

export default DigitalClock;
