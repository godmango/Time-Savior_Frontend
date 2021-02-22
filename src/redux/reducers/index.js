import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import routeReducer from "./route.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
  auth: authReducer,
  route: routeReducer,
  user: userReducer,
});
