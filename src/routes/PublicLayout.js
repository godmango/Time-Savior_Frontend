import React from "react";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import PublicNavbar from "../components/PublicNavbar";

import { useSelector } from "react-redux";

const PublicLayout = () => {
  const currentTheme = useSelector((state) => state.auth.theme);
  return (
    <div className="allPublic">
      <PublicNavbar />
      <div className={`maxPublic${currentTheme}`}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          {/* <Route exact path="/blogs/:id" component={BlogDetailPage} /> */}
          {/* <PrivateRoute exact path="/blog/add" component={AddEditBlogPage} />
          <PrivateRoute
            exact
            path="/blog/edit/:id"
            component={AddEditBlogPage}
          /> */}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  );
};

export default PublicLayout;