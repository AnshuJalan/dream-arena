pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

/**
 * @title Finalizer contract sends a request to the Chainlink network and 
 * retrieves the result (here, the winner of a match)
 */
contract Finalizer is ChainlinkClient {
  
  address oracle;
  bytes32 jobId;
  uint256 fee;

  mapping(bytes32 => uint256) requestIdToMatch;

  /**
   * @param _oracle The address of the chainlink oracle
   * @param _jobID The unique id of the adapters job
   * @param _fee The amount of LINK tokens required for requesting
  */
  constructor(address _oracle, bytes32 _jobID, uint256 _fee) public {
    setPublicChainlinkToken();
    oracle = _oracle;
    jobId = _jobID;
    fee = _fee;
  }

  /**
   * @notice Creates a request to the specified oracle to retrieve the winner of a match
   * @param _url The REST api url for the match results
   * @param _matchId The unique id of the match for which we are retrieving the winner
   */
  function requestResult(string memory _url, uint256 _matchId, bytes4 _selector) internal {
    Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), _selector);
    req.add("url", _url);
    req.add("path", "winner.id");
    bytes32 requestId = sendChainlinkRequestTo(oracle, req, fee);

    requestIdToMatch[requestId] = _matchId;
  }
}
