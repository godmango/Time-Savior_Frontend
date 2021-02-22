import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../redux/actions/auth.actions";

const YouTubeVideoLoader = () => {
  const currentTheme = useSelector((state) => state.auth.theme);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentAuth = useSelector((state) => state.auth);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [rawIframeCode, setRawIframeCode] = useState("");
  const [displayIframeCode, setDisplayIframeCode] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState("");

  const handleInput = (e) => {
    setRawIframeCode(e.target.value);
  };
  const handleReset = (e) => {
    setRawIframeCode("");
    setDisplayIframeCode(false);
    e.target.reset();
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      rawIframeCode.substr(0, 32) !== '<iframe width="560" height="315"' &&
      rawIframeCode.substr(e.target[0].value.length - 9) !== "</iframe>"
    ) {
      setErrors("Please type in <iframe></iframe> form");
      setRawIframeCode("");
      return;
    }
    setErrors("");
    setDisplayIframeCode(true);
    if (isAuthenticated) {
      dispatch(authActions.addIframe(rawIframeCode, currentAuth.user._id));
    } else {
      return setSubmitted(true);
    }
    setSubmitted(true);
  };
  const clearButton = (e) => {
    setRawIframeCode("");
    setDisplayIframeCode(false);
    if (isAuthenticated) {
      dispatch(authActions.addIframe("", currentAuth.user._id));
      setRawIframeCode("");
    } else {
      return;
    }
  };

  return (
    <div className={`videoBig${currentTheme}`}>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        {(!currentUser && submitted === false) ||
        (currentUser &&
          !currentUser.settings.iframeString &&
          submitted === false) ? (
          <div>
            <input
              className={`inputSize${currentTheme}`}
              type="text"
              disabled={false}
              placeholder="paste your youtube iframe code"
              onInput={handleInput}
            />
            <button
              className={`youtubeTwoButtons${currentTheme}`}
              disabled={false}
              type="submit"
              name="submit"
            >
              submit
            </button>
            <button
              className={`youtubeTwoButtons${currentTheme}`}
              disabled={true}
              type="reset"
              onClick={clearButton}
              name="clear"
            >
              clear
            </button>
          </div>
        ) : (
          <div>
            <input
              className={`inputSize${currentTheme}`}
              type="text"
              disabled={true}
              placeholder="paste your youtube iframe code"
              onInput={handleInput}
            />
            <button
              className={`youtubeTwoButtons${currentTheme}`}
              disabled={true}
              type="submit"
              name="submit"
            >
              submit
            </button>
            <button
              className={`youtubeTwoButtons${currentTheme}`}
              disabled={false}
              type="reset"
              onClick={clearButton}
              name="clear"
            >
              clear
            </button>
          </div>
        )}

        {errors && <small className="form-text text-danger">{errors}</small>}
      </form>
      {currentUser !== null && displayIframeCode === true ? (
        <div
          dangerouslySetInnerHTML={{
            __html: currentAuth.user.settings.iframeString,
          }}
        ></div>
      ) : displayIframeCode === true && submitted === true ? (
        <div dangerouslySetInnerHTML={{ __html: rawIframeCode }}></div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default YouTubeVideoLoader;
