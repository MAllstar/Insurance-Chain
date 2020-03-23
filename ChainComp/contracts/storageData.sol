pragma solidity ^0.4.24;

contract storageData {

    struct Insurance{
        uint256 blockId;   //区块号
        string name;//投保人姓名
        string plate;//车牌号
        uint256 unix; //时间戳  
        uint256 amount; // 赔付金额
        string cost;    //维修费，设备状态
        uint userId;  //账户编号 
        string status; //申请状态
        string insId; //理赔单号
    }//定义保险单中的变量
    
    mapping(uint => Insurance) public application; 

    function apply(uint id,string _name,string plateData,uint amountData,string cost,uint userId,string status,string insId) public {
        
        application[id] = Insurance(id,_name,plateData,now,amountData,cost,userId,status,insId);
        
        
    }//存入保险单数据，并以保单号作为主键映射至其他保险数据
}