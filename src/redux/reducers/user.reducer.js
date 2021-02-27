import * as types from "../constants/user.constants";

const initialState = {
  users: [],
  loading: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_USERS_REQUEST:
    case types.GET_CONVERSATIONS_REQUEST:
      return { ...state, loading: true };

    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload.users,
        loading: false,
      };

    case types.GET_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.GET_USERS_FAILURE:
    case types.GET_CONVERSATIONS_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default userReducer;
