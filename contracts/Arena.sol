pragma solidity ^0.6.0;

import "./Reputation.sol";
import "./Finalizer.sol";

/**
* @title Arena contract handles the main logic for decimal odds betting 
*/
contract Arena is Finalizer, Reputation{

  uint256 public uuid;

  address owner;

  struct Match {
    address admin;

    uint256 teamA;
    uint256 teamB;
    uint256 winner;
    uint256 totalPayoutA;
    uint256 totalPayoutB;
    uint256 bookieMargin;
    uint256 totalCollection;
    uint256 bookiePayout;

    uint256 oddsA; //Granularity - 100
    uint256 oddsB; 

    string apiUrl; //API url to retrieve the winner of the match 

    bool ended;

    uint256[] oddsHistoryA;
    uint256[] oddsHistoryB;

    mapping(address => mapping(uint256 => uint256)) betA; 
    mapping(address => mapping(uint256 => uint256)) betB;
  }

  mapping(uint256 => Match) public idToMatch;

  constructor() public Finalizer() {
      uuid = 1;
      owner = msg.sender;
  }

  /**
  * @notice createMatch enables the setting up of a new betting book for a match.
  * @param _teamA id of first team
  * @param _teamB id of second team
  * @param _oddsA initial odds for team A
  * @param _oddsB initial odds for team B
  * @param _url result url
  */
  function createMatch(
    uint256 _teamA,
    uint256 _teamB,
    uint256 _oddsA,
    uint256 _oddsB,
    string memory _url
  ) public payable validOdds(_oddsA, _oddsB) {

    Match memory newMatch = Match(
      msg.sender,
      _teamA,
      _teamB,
      0,
      0,
      0,
      msg.value,
      0,
      0,
      _oddsA,
      _oddsB,
      _url,
      false,
      new uint256[](0),
      new uint256[](0)
    );

    idToMatch[uuid] = newMatch;
    idToMatch[uuid].oddsHistoryA.push(_oddsA);
    idToMatch[uuid].oddsHistoryB.push(_oddsB);
    uuid++;
  }

  /**
   * @notice allows placing of bets
   * @param _matchId the id of the match
   * @param _team The team being selected
   */
  function bet(uint256 _matchId, uint256 _team) public payable validBet(_matchId) {
    Match storage _match = idToMatch[_matchId];
    
    if(_team == 0) {
      _match.betA[msg.sender][_match.oddsA] += msg.value;
      _match.totalPayoutA += (msg.value * _match.oddsA) / 100;
    } else if(_team == 1) {
      _match.betB[msg.sender][_match.oddsB] += msg.value;
      _match.totalPayoutB += (msg.value * _match.oddsB) / 100;
    }

    _match.totalCollection += msg.value;
  }

  /**
   * @notice allows the admin to change the odds
   */
  function changeOdds(uint256 _matchId, uint256 _oddsA, uint256 _oddsB) 
    public onlyAdmin(_matchId) validOdds(_oddsA, _oddsB){
      Match storage _match = idToMatch[_matchId];
      require(!_match.ended, "match has ended");
      if(_oddsA != _match.oddsA) {
        _match.oddsA = _oddsA;
        _match.oddsHistoryA.push(_oddsA);
      }
      if(_oddsB != _match.oddsB) {
        _match.oddsB = _oddsB;
        _match.oddsHistoryB.push(_oddsB);
      }
  }

  /**
   * @notice allows the admin to add to the margin of a bet
   */
  function addMargin(uint256 _matchId) public payable onlyAdmin(_matchId) {
    Match storage _match = idToMatch[_matchId];
    require(!_match.ended, "not allowed");
    require(msg.value > 0, "invalid amount");
    _match.bookieMargin += msg.value;
  }

  /**
   * @notice allows the admin to close a match that is over
   */
  function closeMatch(uint256 _matchId) public onlyAdmin(_matchId) {
    Match storage _match = idToMatch[_matchId];
    require(!_match.ended, "match has already ended");
    requestResult(_match.apiUrl, _matchId, this.setResult.selector);
  } 

  /**
   * @notice called by the oracle to set the result
   */
  function setResult(bytes32 _requestId, uint256 _result) public recordChainlinkFulfillment(_requestId){
    uint256 _id = requestIdToMatch[_requestId];
    Match storage _match = idToMatch[_id];
    _match.ended = true;
    _match.winner = _result;
    if(_result == _match.teamA){
      require((_match.totalCollection + _match.bookieMargin) >= _match.totalPayoutA, 
        "insufficient payout amount");
      _match.bookiePayout = (_match.totalCollection + _match.bookieMargin) - _match.totalPayoutA;
    } else if(_result == _match.teamB) {
      require((_match.totalCollection + _match.bookieMargin) >= _match.totalPayoutB, 
        "insufficient payout amount");
      _match.bookiePayout = (_match.totalCollection + _match.bookieMargin) - _match.totalPayoutB;
    }

    increaseRep(_match.admin);
  }

  function retrievePayout(uint256 _matchId, uint256 _odds) public {
    Match storage _match = idToMatch[_matchId];
    require(_match.ended, "match has not been closed");
    if(_match.winner != 0) {
      if(_match.winner == _match.teamA) {
        require(_match.betA[msg.sender][_odds] > 0, "no payout for this odds");
        uint256 _amt = (_match.betA[msg.sender][_odds] * _odds) / 100;
        _match.betA[msg.sender][_odds] = 0;
        (bool success, ) = msg.sender.call.value(_amt)("");
        require(success, "transfer failed");
      } else {
        require(_match.betB[msg.sender][_odds] > 0, "no payout for this odds");
        uint256 _amt = (_match.betB[msg.sender][_odds] * _odds) / 100;
        _match.betB[msg.sender][_odds] = 0;
        (bool success, ) = msg.sender.call.value(_amt)("");
        require(success, "transfer failed");
      }
    } else {
      if(_match.betA[msg.sender][_odds] > 0) {
        uint256 _amt = _match.betA[msg.sender][_odds];
        _match.betA[msg.sender][_odds] = 0;
        (bool success, ) = msg.sender.call.value(_amt)("");
        require(success, "transfer failed");
      } 
      if(_match.betB[msg.sender][_odds] > 0) {
        uint256 _amt = _match.betB[msg.sender][_odds];
        _match.betB[msg.sender][_odds] = 0;
        (bool success, ) = msg.sender.call.value(_amt)("");
        require(success, "transfer failed");
      }
    } 
  } 

  //Margin call only owner
  function marginCall(uint256 _matchId) public {
    require(msg.sender == owner, "not authorized");
    Match storage _match = idToMatch[_matchId];
    require(!_match.ended, "match has ended");
    require((_match.totalCollection + _match.bookieMargin) < _match.totalPayoutA ||
      (_match.totalCollection + _match.bookieMargin) < _match.totalPayoutB, 
      "margin satisfied");
    _match.ended = true;
    (bool success1, ) = msg.sender.call.value(_match.bookieMargin / 5)("");
    require(success1, "transaction failed");
    (bool success2, ) = _match.admin.call.value((_match.bookieMargin * 4) / 5)("");
    require(success2, "transaction failed");

    decreaseRep(_match.admin);
  }

  //retrieveBookiePayout
  function retrieveBookiePayout(uint256 _matchId) onlyAdmin(_matchId) public {
    Match storage _match = idToMatch[_matchId];
    require(_match.ended, "match is yet to end");
    require(_match.bookiePayout > 0, "no payout");
    uint256 _amt = _match.bookiePayout;
    (bool success, ) = msg.sender.call.value(_amt)(""); 
    require(success, "transaction failed");
  }

  modifier onlyAdmin(uint256 _id) {
    Match storage _match  = idToMatch[_id];
    require(msg.sender == _match.admin, "not authorized");
    _;
  } 

  modifier validBet(uint256 _id) {
    Match storage _match = idToMatch[_id];
    require(!_match.ended, "match has already ended.");
    require(msg.value > 0, "invalid bet amount");
    _;
  }

  modifier validOdds(uint256 _oddsA, uint256 _oddsB) {
    require(_oddsA >= 1, "invalid odds for team A");
    require(_oddsB >= 1, "invalid odds for team B");
    _;
  }
}