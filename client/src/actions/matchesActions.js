import {
  GET_CONTRACT_MATCHES,
  GET_CONTRACT_MATCH,
  GET_BETS,
  MATCHES_LOADING,
} from "./types";

export const getContractMatches = () => async (dispatch, getState) => {
  const contract = getState().ethereum.contract;

  try {
    dispatch(matchesLoading());
    const uuid = await contract.methods.uuid().call();

    let matches = [];
    for (let i = 1; i < uuid; i++) {
      const match = await contract.methods.idToMatch(i).call();
      matches.push({
        id: i,
        ...match,
      });
    }

    dispatch({
      type: GET_CONTRACT_MATCHES,
      payload: matches,
    });
  } catch (err) {
    alert(err);
  }
};

export const getContractMatch = (id) => async (dispatch, getState) => {
  const contract = getState().ethereum.contract;

  try {
    const match = await contract.methods.idToMatch(id).call();
    match.id = id;

    dispatch({
      type: GET_CONTRACT_MATCH,
      payload: match,
    });
  } catch (err) {
    alert(err);
  }
};

export const getBets = (id) => async (dispatch, getState) => {
  const contract = getState().ethereum.contract;

  try {
    const history = await contract.methods.getOddsHistory(id).call();

    let betsA = [];
    let betsB = [];

    //Bets for team A
    for (let odds = 0; odds < history[0].length; odds++) {
      const bet = await contract.methods.getBetA(id, history[0][odds]).call();
      if (bet !== "0") betsA.push(bet);
    }
    //Bets for team B
    for (let odds = 0; odds < history[1].length; odds++) {
      const bet = await contract.methods.getBetB(id, history[1][odds]).call();
      if (bet !== "0") betsB.push(bet);
    }

    dispatch({
      type: GET_BETS,
      payload: {
        betsA,
        betsB,
      },
    });
  } catch (err) {
    alert(err);
  }
};

export const matchesLoading = () => {
  return {
    type: MATCHES_LOADING,
  };
};
