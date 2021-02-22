import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../redux/actions/auth.actions";

const Memo = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.auth.theme);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth);
  const [memoWords, setMemoWords] = useState("");
  const handleInput = (e) => {
    setMemoWords(e.target.value);
  };
  useEffect(() => {
    if (currentUser.user !== null && isAuthenticated) {
      document.getElementById("memoBox").value =
        currentUser.user.settings.memoList;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(authActions.addMemo(memoWords, currentUser.user._id));
    } else {
      return;
    }
  }, [memoWords]);

  return (
    <div className="memoBig">
      <textarea
        className={`memoBox${currentTheme}`}
        id="memoBox"
        placeholder="Memo to self..."
        onInput={handleInput}
      ></textarea>
    </div>
  );
};

export default Memo;
