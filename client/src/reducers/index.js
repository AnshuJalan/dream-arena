import { combineReducers } from "redux";
import apiReducer from "./apiReducer";
import web3Reducer from "./web3Reducer";
import matchesReducer from "./matchesReducer";

export default combineReducers({
  api: apiReducer,
  ethereum: web3Reducer,
  matches: matchesReducer,
});
