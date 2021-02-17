import { CONNECT_WEB3, LOAD_CONTRACT } from "../actions/types";

const INITIAL_STATE = {
  web3: null,
  account: null,
  contract: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECT_WEB3:
      return {
        ...state,
        ...action.payload,
      };
    case LOAD_CONTRACT:
      return {
        ...state,
        contract: action.payload,
      };
    default:
      return state;
  }
};
