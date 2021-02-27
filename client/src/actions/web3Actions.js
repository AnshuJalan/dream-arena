import Web3 from "web3";
import ArenaJson from "../contracts/Arena.json";
import history from "../history";
import { CONNECT_WEB3, LOAD_CONTRACT } from "./types";

export const connectWeb3 = () => async (dispatch) => {
  let web3;
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    web3 = window.web3;
  }

  const accounts = await web3.eth.getAccounts();
  const id = await web3.eth.net.getId();

  dispatch({
    type: CONNECT_WEB3,
    payload: {
      web3,
      account: accounts[0],
      network: id,
    },
  });

  if (id !== 42 && id !== 80001 && history.location.pathname !== "/warning") {
    history.push("/warning");
  }

  dispatch(loadContract());
};

const loadContract = () => async (dispatch, getState) => {
  const web3 = getState().ethereum.web3;
  const id = await web3.eth.net.getId();

  if (id !== 42 && id !== 80001) return;

  const contract = new web3.eth.Contract(
    ArenaJson.abi,
    ArenaJson.networks[id].address
  );

  dispatch({
    type: LOAD_CONTRACT,
    payload: contract,
  });
};
