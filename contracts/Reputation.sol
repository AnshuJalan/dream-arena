pragma solidity ^0.6.0;

/**
 * @title Reputation handles the reputation of bookies
 */
contract Reputation {
  mapping(address => int256) public reputation;

  function increaseRep(address _address) internal {
    reputation[_address] += 1;
  }

  function decreaseRep(address _address) internal {
    reputation[_address] -= 1;
  }
}