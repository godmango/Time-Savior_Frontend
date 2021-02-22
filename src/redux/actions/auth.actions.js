import * as types from "../constants/auth.constants";
import { toast } from "react-toastify";
import api from "../../apiService";
import routeActions from "./route.actions";

const register = ({ name, email, password, avatarUrl }) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const res = await api.post("/users", { name, email, password, avatarUrl });
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
    dispatch(routeActions.redirect("/login"));
    toast.success(`Thank you for your registration, ${name}!`);
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
  }
};

const loginRequest = ({ email, password }) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login", { email, password });
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
    const name = res.data.data.user.name;

    toast.success(`Welcome ${name}`);
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};

const addIframe = (rawIframeCode, currentUserId) => async (dispatch) => {
  dispatch({ type: types.IFRAME_UPDATE_REQUEST, payload: null });
  try {
    const res = await api.patch(`/users/iframe/${currentUserId}`, {
      rawIframeCode,
    });
    dispatch({ type: types.IFRAME_UPDATE_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.IFRAME_UPDATE_FAILURE, payload: error });
  }
};

const addTodos = (fullTodos, currentUserId) => async (dispatch) => {
  dispatch({ type: types.TODO_UPDATE_REQUEST, payload: null });
  try {
    const res = await api.patch(`/users/todo/${currentUserId}`, fullTodos);
    dispatch({ type: types.TODO_UPDATE_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.TODO_UPDATE_FAILURE, payload: error });
  }
};
const addMemo = (memoWords, currentUserId) => async (dispatch) => {
  dispatch({ type: types.MEMO_UPDATE_REQUEST, payload: null });
  try {
    const res = await api.patch(`/users/memo/${currentUserId}`, { memoWords });
    dispatch({ type: types.MEMO_UPDATE_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.MEMO_UPDATE_FAILURE, payload: error });
  }
};

const logout = () => (dispatch) => {
  dispatch({ type: types.LOGOUT_REQUEST, payload: null });
  delete api.defaults.headers.common["authorization"];
  dispatch({ type: types.LOGOUT_SETTING_DEFAULT, payload: null });
  localStorage.removeItem("accessToken");

  dispatch({ type: types.LOGOUT_SUCCESS, payload: null });
};

const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  if (accessToken) {
    const bearerToken = "Bearer " + accessToken;
    api.defaults.headers.common["authorization"] = bearerToken;
  }
  try {
    const res = await api.get("/users/me");

    const name = res.data.data.user.name;
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
    toast.success(`Welcome back ${name}`);
  } catch (error) {
    if (error.errors.message === "Token expired")
      localStorage.setItem("accessToken", "");
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

const themeChange = (currentTheme) => async (dispatch) => {
  dispatch({ type: types.THEME_REQUEST, payload: null });
  let changedTheme;
  if (currentTheme === "Light") {
    changedTheme = "Dark";
  } else {
    changedTheme = "Light";
  }
  dispatch({ type: types.THEME_SUCCESS, payload: changedTheme });
};

const authActions = {
  register,
  loginRequest,
  logout,
  addIframe,
  addTodos,
  getCurrentUser,
  addMemo,
  themeChange,
};
export default authActions;
