import * as types from "../constants/auth.constants";
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  loggedInWithLocalStorage: false,
  theme: "Light",
};
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    //login
    case types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        accessToken: payload.accessToken,
        loading: false,
        isAuthenticated: true,
      };
    case types.LOGIN_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    // get current user
    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
        accessToken: payload.accessToken,
        loggedInWithLocalStorage: true,
        isAuthenticated: true,
        loading: false,
      };
    case types.GET_CURRENT_USER_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    // register
    case types.REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.REGISTER_SUCCESS:
      return { ...state, loading: false };
    case types.REGISTER_FAILURE:
      return { ...state, loading: false };

    // update iframe (youtube video)
    case types.IFRAME_UPDATE_REQUEST:
      return { ...state, loading: true };
    case types.IFRAME_UPDATE_SUCCESS:
      return {
        ...state,
        user: payload.theUser,
        accessToken: payload.accessToken,
        loading: false,
        isAuthenticated: true,
      };
    case types.IFRAME_UPDATE_FAILURE:
      return { ...state, loading: false };

    // update todo list
    case types.TODO_UPDATE_REQUEST:
      return { ...state, loading: true };
    case types.TODO_UPDATE_SUCCESS:
      return {
        ...state,
        user: payload.theUser,
        accessToken: payload.accessToken,
        loading: false,
        isAuthenticated: true,
      };
    case types.TODO_UPDATE_FAILURE:
      return { ...state, loading: false };

    // update memo list
    case types.MEMO_UPDATE_REQUEST:
      return { ...state, loading: true };
    case types.MEMO_UPDATE_SUCCESS:
      return {
        ...state,
        user: payload.theUser,
        accessToken: payload.accessToken,
        loading: false,
        isAuthenticated: true,
      };
    case types.MEMO_UPDATE_FAILURE:
      return { ...state, loading: false };

    // logout
    case types.LOGOUT_REQUEST:
      return { ...state, loading: true };
    case types.LOGOUT_SETTING_DEFAULT:
      return {
        ...state,
        user: null,
        loading: false,
        isAuthenticated: false,
        loggedInWithLocalStorage: false,
      };
    case types.LOGOUT_SUCCESS:
      return { ...state, loading: false };
    case types.THEME_REQUEST:
      return { ...state, loading: true };
    case types.THEME_SUCCESS:
      return { ...state, theme: payload, loading: false };
    default:
      return state;
  }
};
export default authReducer;
