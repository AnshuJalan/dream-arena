pragma solidity ^0.6.0;

import "./Finalizer.sol";

/**
* @title Arena contract handles the main logic for decimal odds betting 
*/
contract Arena is Finalizer{

  uint256 uuid;

  struct Match {
    address admin;

    uint256 teamA;
    uint256 teamB;
    uint256 winner;
    uint256 totalPayoutA;
    uint256 totalPayoutB;
    uint256 bookieMargin;

    string apiUrl; //API url to retrieve the winner of the match 

    bool ended;

    mapping(address => mapping(uint256 => uint256)) betA; 
    mapping(address => mapping(uint256 => uint256)) betB;
  }

  mapping(uint256 => Match) public idToMatch;

  constructor(address _oracle, bytes32 _jobID, uint256 _fee) 
    public Finalizer(_oracle, _jobID, _fee) {
      uuid = 1;
  }

  function createMatch(
    uint256 _teamA,
    uint256 _teamB,
    string memory _url
  ) public {

    Match memory newMatch = Match(
      msg.sender,
      _teamA,
      _teamB,
      0,
      0,
      0,
      0,
      _url,
      false
    );

    idToMatch[uuid] = newMatch;
    uuid++;
  }
}