import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import authActions from "../redux/actions/auth.actions";
import logo from "../image/picLogo.png";

const PublicNavbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const currentTheme = useSelector((state) => state.auth.theme);
  const dispatch = useDispatch();

  const triggerThemify = () => {
    dispatch(authActions.themeChange(currentTheme));
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    toast.info("you have logged out");
  };

  const authLinks = (
    <div className="logoutNavbarDiv">
      {/* <p className="logoutNavbar" onClick={handleLogout}>
        <FontAwesomeIcon icon="sign-out-alt" size="sm" /> Logout
      </p> */}

      {/* <FontAwesomeIcon icon="sign-in-alt" size="sm" /> */}
      <button onClick={handleLogout} className={`buttonStyle${currentTheme}`}>
        <FontAwesomeIcon icon="sign-out-alt" size="sm" />
        Logout
      </button>

      <button className={`buttonStyle${currentTheme}`} onClick={triggerThemify}>
        {currentTheme === "Light" ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
  const publicLinks = (
    <div className="regisLoginDiv">
      {/* <div className={`hyperlinkNavbarDiv${currentTheme}`}>
        <a className={`hyperlinkNavbar${currentTheme}`} href="/register">
          <FontAwesomeIcon icon="registered" size="sm" /> Register
        </a>
      </div> */}
      {/* <div className={`hyperlinkNavbarDiv${currentTheme}`}>
        <a className={`hyperlinkNavbar${currentTheme}`} href="/login">
          <FontAwesomeIcon icon="sign-in-alt" size="sm" /> Login
        </a>
      </div> */}
      <a href="/register">
        {/* <FontAwesomeIcon icon="sign-in-alt" size="sm" /> */}
        <button className={`buttonStyle${currentTheme}`}>
          <FontAwesomeIcon icon="registered" size="sm" />
          Register
        </button>
      </a>
      <a href="/login">
        {/* <FontAwesomeIcon icon="sign-in-alt" size="sm" /> */}
        <button className={`buttonStyle${currentTheme}`}>
          <FontAwesomeIcon icon="sign-in-alt" size="sm" />
          Login
        </button>
      </a>
      <button className={`buttonStyle${currentTheme}`} onClick={triggerThemify}>
        {currentTheme === "Light" ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );

  return (
    <Navbar className={`navbarBig${currentTheme}`} expand="lg">
      <div className="navbarFlex">
        <a href="/" className={`mainTitle${currentTheme}`}>
          {/* <img className="logoFix" src={logo} alt="" /> */}
          {/* <p className="mainTitle">TIME SAVIOR</p> */}
          TIME SAVIOR
        </a>
        {!loading && (
          <div className="links">
            {isAuthenticated ? authLinks : publicLinks}
          </div>
        )}
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
      </div>
      {/* <Navbar.Collapse className="links"> */}
      {/* <button className="buttonStyle">button</button> */}
      {/* </Navbar.Collapse> */}
      <ToastContainer />
    </Navbar>
  );
};

export default PublicNavbar;
