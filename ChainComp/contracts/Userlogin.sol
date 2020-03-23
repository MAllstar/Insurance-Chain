pragma solidity ^0.4.24;

contract Userlogin {
    struct User{
        uint number;  //账户编号
        string username;   //用户名
        string password;   //密码
        string attr;      //属性
        string realname;      //真实姓名
        string identity;  //身份证
        string phone;   //手机号
        address accountAddress;  //账户地址
    }
    address public account;
    //public 自动生成getter函数
    mapping(uint => User) public userInfo; 
    function getAccount() public{
        account = msg.sender;
    }

    //注册
    function regist(uint num,string _name,string pwd,string attr,string realname,string id,string phone) public {
        userInfo[num] = User(num,_name,pwd,attr,realname,id,phone,msg.sender);
    }
}