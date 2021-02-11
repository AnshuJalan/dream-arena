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

  constructor() public {
    setPublicChainlinkToken();
    oracle = 0x56dd6586DB0D08c6Ce7B2f2805af28616E082455;
    jobId = "b6602d14e4734c49a5e1ce19d45a4632";
    fee = 0.1 * 10 ** 18;
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
