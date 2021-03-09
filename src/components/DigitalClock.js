import React, { useState } from "react";
import { useSelector } from "react-redux";

const DigitalClock = ({ clockScreen }) => {
  const currentTheme = useSelector((state) => state.auth.theme);
  // const [clockScreen, setClockScreen] = useState("On");
  const [nowTime, setNowTime] = useState("");
  const [secTime, setSecTime] = useState("");
  const [minTime, setMinTime] = useState("");
  const [hTime, setHTime] = useState("");
  const [amOrPm, setAmOrPm] = useState("");

  const [whatDay, setWhatDay] = useState("");
  const [theMonth, setTheMonth] = useState("");
  const [theDate, setTheDate] = useState("");
  const [theYear, setTheYear] = useState("");
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
    let zeroSec;
    if (sec < 10) {
      zeroSec = 0;
    } else {
      zeroSec = "";
    }
    let zeroMin;
    if (min < 10) {
      zeroMin = 0;
    } else {
      zeroMin = "";
    }
    // setNowTime(`${allDays[day]} ${year}/${allMonths[month]}/${date}
    // ${amPm} ${twelveH}:${min}:${zero}${sec}`);
    setSecTime(`${zeroSec}${sec}`);
    setMinTime(`${zeroMin}${min}`);
    setHTime(twelveH);
    setAmOrPm(amPm);
    setWhatDay(allDays[day]);
    // setMonthDate(`${allMonths[month]} ${date}`);
    setTheMonth(allMonths[month]);
    setTheDate(date);
    setTheYear(year);
  };

  setInterval(updatedTime, 1000);
  // console.log("render digi");

  return (
    <div className={`fullTimeDiv${clockScreen}`}>
      <div className={`timeDivTop${clockScreen}`}>
        <div className={`topDivStyle${clockScreen}`}>{hTime}</div>
        <div className={`topDivStyle${clockScreen}`}>:</div>
        <div className="divideTime">
          <div className={`topDivStyle${clockScreen}`}>{minTime}</div>
          <div className={`secStyle${clockScreen}`}>{secTime}</div>
        </div>
        <div className={`amPmStyle${clockScreen}`}>{amOrPm}</div>
      </div>
      <div className={`timeDivBottom${clockScreen}`}>
        <div className={`bottomDivStyle${clockScreen}`}>{whatDay}</div>
        <div className={`bottomDivStyle${clockScreen}`}>
          {theMonth}&nbsp;&nbsp;{theDate}
        </div>
        <div className={`bottomDivStyle${clockScreen}`}>{theYear}</div>
      </div>
    </div>
  );
};

export default DigitalClock;
