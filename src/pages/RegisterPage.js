import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import authActions from "../redux/actions/auth.actions";
import routeActions from "../redux/actions/route.actions";
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const history = useHistory();
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = formData;
    if (password !== password2) {
      setErrors({ ...errors, password2: "Passwords do not match" });
      return;
    }
    dispatch(authActions.register({ name, email, password }));
  };
  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(routeActions.removeRedirectTo());
      } else {
        history.push(redirectTo);
        dispatch(routeActions.removeRedirectTo());
      }
    }
  }, [dispatch, history, redirectTo]);
  return (
    <div className="signUpSize">
      {/* <Row>
        <Col md={{ span: 6, offset: 3 }}> */}
      <div className="text-center">
        <h1 className="fontChange">Sign Up</h1>
        <p className="fontChange">Create Your Account</p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <small className="form-text text-danger">{errors.name}</small>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="email"
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
          />
          {errors.password && (
            <small className="form-text text-danger">{errors.password}</small>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
          />
        </Form.Group>
        {loading ? (
          <button
            className="btn-block"
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
          <button className="btn-block" type="submit" variant="primary">
            Register
          </button>
        )}
        <p>
          Already have an account?{" "}
          <a className="hyperlinkSignup" href="/login">
            Sign In
          </a>
        </p>
      </Form>
      {/* </Col>
      </Row> */}
    </div>
  );
};
export default RegisterPage;
