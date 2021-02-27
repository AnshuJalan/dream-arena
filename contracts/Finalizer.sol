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
    setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
    oracle = 0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D;
    jobId = "5592aa6da3d64580933fce0401d373f0";
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
