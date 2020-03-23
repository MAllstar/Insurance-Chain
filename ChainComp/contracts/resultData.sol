pragma solidity ^0.4.24;

contract resultData{
    mapping (uint => string) res;
    uint x=0;
    address user;
    function LongRecord() public{
        user = msg.sender;
    }
    function record(string result) public{
        require(msg.sender == user);
        res[x]=result;
        x++;
    }
    function getRecord(uint i) constant public returns (string){
        require(msg.sender == user);
        return res[i];
    }
}