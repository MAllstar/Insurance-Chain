pragma solidity ^0.4.24;

contract Application {
    //保存申请者的地址
    address public applicant;

    //申请理赔
    function apply() public returns (address) {
        //保存调用这地址
        applicant = msg.sender;
        return applicant;
    }
}