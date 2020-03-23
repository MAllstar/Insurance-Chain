pragma solidity ^0.4.24;

contract SimpleStorage {
  uint storedData;
  struct Item {
        uint256 blockId;  //区块号
        string name;//投保人姓名
        uint number; //账户编号
        string plate;//车牌号
        string item;//投保项目
        string itemTime;  //投保时间
        string itemDeadline; //截止时间  
    }

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
