import _ from "lodash";
import { GET_CONTRACT_MATCHES, GET_CONTRACT_MATCH } from "../actions/types";

const INITIAL_STATE = {
  matches: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CONTRACT_MATCH:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case GET_CONTRACT_MATCHES:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
