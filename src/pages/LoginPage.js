import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authActions from "../redux/actions/auth.actions";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const currentTheme = useSelector((state) => state.auth.theme);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (password.length < 3) {
      setErrors({ ...errors, password: "Password must be longer than 3" });
      return;
    }
    dispatch(authActions.loginRequest({ email, password }));
  };
  if (isAuthenticated) return <Redirect to="/" />;
  return (
    <div div className="signUpSize">
      {/* <Row>
        <Col md={{ span: 6, offset: 3 }}> */}
      <Form onSubmit={handleSubmit}>
        <div className="text-center ">
          <h1 className="fontChange">Sign In</h1>
          <p className="fontChange">Sign Into Your Account</p>
        </div>
        <Form.Group>
          <Form.Control
            type="email"
            required
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <small className="form-text text-danger">{errors.email}</small>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength="3"
          />
          {errors.password && (
            <small className="form-text text-danger">{errors.password}</small>
          )}
        </Form.Group>
        {loading ? (
          <button
            className={`btn-block buttonStyle${currentTheme}`}
            variant="primary"
            type="button"
            disabled
          >
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        ) : (
          <button
            className={`btn-block buttonStyle${currentTheme}`}
            type="submit"
            variant="primary"
          >
            Login
          </button>
        )}
        <p>
          Don't have an account?{" "}
          <a className="hyperlinkSignup" href="/register">
            Sign Up
          </a>
        </p>
      </Form>
    </div>
  );
};
export default LoginPage;
