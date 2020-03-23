pragma solidity ^0.4.24;

contract deviceData {
    struct device{
            string name;//设备
            string state;//状态
            uint repairAmount;//修理费用
            uint officialRepairAmount;//官方费用
        }//定义设备数据变量 
    address user;
    mapping (uint => string) nam;
    mapping (string => string) sta;
    mapping (string => uint) rep;
    mapping (string => uint) off;
    uint x=0;//设备序列号
    function longRecord() public{
        user = msg.sender;
    }//记录合约创建者地址
    function record(string nameData,string staData,uint repairAmount,uint officialRepairAmount) public{
        require(msg.sender == user);//安全验证
        nam[x] = nameData;
        sta[nam[x]] = staData;
        rep[nam[x]] = repairAmount;
        off[nam[x]] = officialRepairAmount;
        x++;
    }//存入设备数据，并以设备名映射至状态及费用
    function getRecord(uint i) constant public returns (string,string,uint,uint){
        require(msg.sender == user);
        return (nam[i],sta[nam[i]],rep[nam[i]],off[nam[i]]);
    }//读取设备数据 
}
