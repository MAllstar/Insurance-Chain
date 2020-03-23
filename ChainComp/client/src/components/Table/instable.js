//历史理赔记录,保险公司界面
import React, { Component } from 'react';
import { Table, Divider, Icon, Button, Steps } from 'antd';
import Item from 'antd/lib/list/Item';
import PropTypes from "prop-types";
import getWeb3 from "./../../utils/getWeb3";
import storageDataContract from "../../contracts/storageData.json";
import UserloginContract from "./../../contracts/Userlogin.json";
import Cookies from 'universal-cookie';
import $ from 'jquery';

const cookies = new Cookies();
const bId = 147;
const { Step } = Steps;
const columns = [
  {
    title: '区块号',
    dataIndex: 'blockId',
    //defaultSortOrder: 'descend',
    sorter: (a, b) => a.blockId - b.blockId,
  },
  {
    title: '理赔单号',
    dataIndex: 'id',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.id - b.id,

  },
  {
    title: '申请人',
    dataIndex: 'name',
    
  },
  {
    title: '理赔时间',
    dataIndex: 'time',
 
  },
  {
    title: '赔付金额',
    dataIndex: 'money',
  },
  {
    title: '当前状态',
    dataIndex: 'state',
    render: text=>{
      if(text=='申请中'){
        return(
          <span style={{color: "blue"}}>{text}</span>
        );
      }
      else if(text == '驳回申请'){
        return(
          <span style={{color: "red"}}>{text}</span>
        );
      }
      else {
        return(
          <span style={{color: "green"}}>{text}</span>
        );
      }
    }
  },
  
];

let DataSource = [];

export class Records extends Component{
    constructor(props,context){
      super(props,context);   //调用父类构造函数
      this.state = {
        data: [],
        Id: null,
        process: null,
        load: true,
      }

    }
    // 子组件声明自己需要使用 context
    static contextTypes = {
      blockId: PropTypes.string,
      transaction: PropTypes.string,
      id: PropTypes.string,
      web3: PropTypes.object,
      accounts: PropTypes.object,
      status: PropTypes.string,
      contract: PropTypes.object,
      callback: PropTypes.func
    }

    handleLoading = prop => enable => {
      this.setState({ [prop]: enable });
    };
  
    //时间戳转换未普通日期
    getLocalTime = (nS)=> {  
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');  
     }
     /*
     componentWillMount = async () => {  //在组件接收到一个新的 props (更新后)时被调用。这个方法在初始化render时不会被调用。
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        console.log(typeof(web3),web3);
        // Use web3 to get the user's accounts.
        await web3.eth.getAccounts().then(console.log);
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);

  
        // Get the contract instance.获取用户信息
        const networkId = await web3.eth.net.getId();
        console.log(networkId);
        const deployedNetwork = UserloginContract.networks[networkId];
        const instance = new web3.eth.Contract(
          UserloginContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        //await instance.methods.regist(0).call().then((result)=>{console.log(result)});
  
  
        
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };
    */
    
     //显示记录
     componentDidMount  = async () => { //在第一次渲染后调用,componentDidMount 
      console.log(cookies.get('priKey'));
      console.log(this.context.web3);
      const web3 = this.context.web3;
      console.log(web3);
      const accounts = this.context.accounts;
      console.log(accounts[0]);
      const instance = this.context.contract;
      console.log(instance);
      var Hash;
      var records = [];
      var state;
      var num = 0;
      var status;
      var insId;
      console.log(this.context.blockId);
      await instance.methods.application(this.context.blockId).call({from: accounts[0]},(error,result)=>{console.log(insId=result[8],status=result[7])});
      for(var i=bId;i<=this.context.blockId;i++){
        var flag =true;
        await web3.eth.getBlock(i,(error,result)=>{ console.log(Hash=result.transactions[0]);});
        await instance.methods.application(i).call({from: accounts[0]},(error,result)=>{ 
          if(result[1] == "" ) flag = false;
          
        });
        if(!flag) continue;
        await instance.methods.application(i).call().then((result)=>{
          console.log(result[0].toString(),result[1],result[2],result[3].toString(),result[4].toString(),result[5].toString(),result[6].toString(),result[7],result[8]);
          var str = result[8].split(",");
          var str2 = result[5].split(" ");
          var item = {
            key: num,
            blockId: result[0].toString(),
            id: str[2],
            enc: result[8],
            name: result[1],
            pleteData: result[2],   //车牌号
            time: this.getLocalTime(result[3].toString()),
            money: result[4].toString(),
            data: result[5],
            transaction: Hash,
            state: result[7],
            usernum: result[6].toString(),
            acccountname: str2[4],
            atname: str[3]
          }
          if(item.id == insId && status!="申请中")   //申请处理后移出
            console.log(item)
          else {
            records.push(item);
            num++;
            console.log(records);
            }
        });
        
      }
      DataSource = records;
 
      //二次筛选，申请处理后的申请数组
      var reRecords = [];
      var flag = [];
      for(var i=0;i< records.length;i++){
          flag.push(1);
          if(records[i].state!='申请中') flag[i]=0;
          for(var j=i+1;j< records.length;j++){
            if(records[i].id==records[j].id && records[i].state=='申请中' && records[j].state !='申请中'){  //除去申请处理后的交易单
                flag[i]=0;
                flag[j]=0;
            }
          }
      }
      for(var i=0;i< records.length;i++){
        if(flag[i]){
          reRecords.push(records[i]);
        }
      }
      console.log(reRecords);
   
      this.setState({data: reRecords, Id: this.context.blockId, load: false});
    }

    componentWillReceiveProps = async () => {  //在组件接收到一个新的 props (更新后)时被调用。这个方法在初始化render时不会被调用。
      this.setState({Id: this.context.blockId+1},this.runExample);
      console.log(this.state.Id);
    }

    //申请理赔后更新记录表
    runExample  = async () => { // 
      console.log(this.context.web3);
      const web3 = this.context.web3;
      console.log(web3);
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      const instance = this.context.contract;
      console.log(instance);
      var Hash;
      var records = [];
      var state;
      var num = 0;
      var status;  //当前交易状态
      var insId; //当前交易单号
      console.log(this.context.blockId);
      await instance.methods.application(this.context.blockId).call({from: accounts[0]},(error,result)=>{console.log(insId=result[8],status=result[7])});
      for(var i=bId;i<=this.context.blockId;i++){
        var flag =true;

        await web3.eth.getBlock(i,(error,result)=>{if(result!=null) Hash=result.transactions[0]});
        await instance.methods.application(i).call({from: accounts[0]},(error,result)=>{ 
          if(result[1] == "" ) flag = false;
        });
        if(!flag) continue;
        await instance.methods.application(i).call().then((result)=>{
          console.log(result[0].toString(),result[1],result[2],result[3].toString(),result[4].toString(),result[5],result[6].toString(),result[7],result[8]);
          var str = result[8].split(",");
          var str2 = result[5].split(" ");
          var item = {
            key: num,
            blockId: result[0].toString(),
            id: str[2],
            enc: result[8],
            name: result[1],
            pleteData: result[2],   //车牌号
            time: this.getLocalTime(result[3].toString()),
            money: result[4].toString(),
            data: result[5],   //投保项目
            deadLineTime: result[6],
            transaction: Hash,
            state: result[7],
            usernum: result[6].toString(),
            acccountname: str2[4],
            atname: str[3]
          }
          if(item.id == insId && status!="申请中")   //申请处理后该申请移出
            console.log(item)
          else {
            records.push(item);
            num++;
            console.log(records);
            }
        });
        
      }
 
      //二次筛选，申请处理后的申请数组
      var reRecords = [];
      var flag = [];
      for(var i=0;i< records.length;i++){
          flag.push(1);
          if(records[i].state!='申请中') flag[i]=0;
          for(var j=i+1;j< records.length;j++){
            if(records[i].id==records[j].id && records[i].state=='申请中' && records[j].state !='申请中'){
                flag[i]=0;
                flag[j]=0;
            }
          }
      }
      for(var i=0;i< records.length;i++){
        if(flag[i]){
          reRecords.push(records[i]);
        }
      }
      console.log(reRecords);
      
      DataSource = records;
      this.setState({data: reRecords,load: false});
    }
    /*
    btApply = async() => {
      const { accounts, contract, blockId } = this.context;  //解构赋值
      const Id = blockId + 1;
      var str;
    //if(!this.state.apply && this.state.status!='申请中') //发送一次申请后不再发送交易  
        // Stores a given value
        await contract.methods.apply(Id,'msq','浙A·12580',4890,'300,180,230,100,800,1120,50,880,230,300,300,400','正常，轻微受损，轻微受损，正常，中度受损，严重受损，严重受损，正常，损坏，轻微受损，中度受损，报警器','申请中',"330825"+Id).send({ from: accounts[0] },(error,result)=>{this.setState({ Id},()=>{console.log('reject')});console.log( this.state.Id,result, accounts[0])
          }); //箭头函数避免this指针丢失
     
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.application(blockId).call();

    // Update state with the result.
    this.setState({ storageValue: response });
    }

    bindEvents = () => {
      $(document).on('click', '.bt-applyok .ant-btn-primary', this.btApply);
    };
    */

    funProcess = ()=>{
      var flag = 0;
      console.log(this.context.status);
      if(this.context.status=='申请中'){
        flag = 1;
      }
      else if(this.context.status=='通过申请'){
        flag = 2;
      }
      else if(this.context.status=='驳回申请'){
        flag = 2;
        return(
          <Steps size="small" current={flag} status ="error">
            <Step title="Apply" />
            <Step title="In Progress" />
            <Step title="Finished" />
          </Steps>
        )
      }

      return (
        <Steps size="small" current={cookies.get('number')=='null'?0:flag}>
          <Step title="Apply" />
          <Step title="In Progress" />
          <Step title="Finished" />
       </Steps>
      );

    }



    dataSearch=[];
    render() {
      console.log(this.context.blockId,this.state.Id);
      //this.hisRecords();
        //id查找
        this.dataSearch=[];
        console.log(this.state.data);
        if(this.props.value!=''){
          this.state.data.map(Item=>{
              if(Item.id==this.props.value)
                  this.dataSearch.push(Item);
          })
          return (
            <div>
              记录数：<b>{this.context.blockId}</b>  <Button  type="primary" shape="circle" icon="reload" href="http://localhost:3000/"/>刷新
              <Table 
              onRow={record => {
                return {
                  onClick: event => {this.props.callback(record);
                    if(cookies.get('login') == 1){
                    $.ajax({
                      url:"http://localhost:3007/",
                      type: "POST",
                      data: {attr: cookies.get('addr'),dat: record.id+','+record.acccountname},
                      success:  function(result){
                        console.log(result)
                        var data = result.split(',');
                        console.log('密文：' + data[0]);
                        console.log('私钥' + data[1]);
                        console.log('明文' + data[2]);
                      }
                    });
                    
                  }}, // 点击行回调,父组件获取记录，props组件自身入参
                };
              }}
              columns={columns} dataSource={cookies.get('userName')!='admin'?[]:this.dataSearch} pagination={false} bordered scroll={{x: 60, y: 180 }} expandedRowRender={record => <p style={{ margin: 0, color: "red"}}>Transaction Hash: {record.transaction}<br/>账户签名: {record.atname}</p>}/>
            </div>
          );
        }

        else {
          return (
            <div>
                记录数：<b>{cookies.get('login')=='0'?0:this.state.data.length}</b>  <Button  type="primary" shape="circle" icon="reload" href="http://localhost:3000/"/>刷新
                <Table  
                 onRow={record => {
                  return {
                    onClick: event => {this.props.callback(record)
                      if(cookies.get('login') == 1){
                        $.ajax({
                          url:"http://localhost:3007/",
                          type: "POST",
                          data: {attr: cookies.get('addr'),dat: record.id+','+record.acccountname},
                          success:  function(result){
                            console.log(result)
                            var data = result.split(',');
                            console.log('密文：' + data[0]);
                            console.log('私钥' + data[1]);
                            console.log('明文' + data[2]);
                          }
                        });
                        
                      }}, // 点击行
                  };
                }}
                loading={this.state.load} columns={columns} dataSource={cookies.get('userName')!='admin'?[]:this.state.data} pagination={false} bordered scroll={{x: 500, y: 500 }} expandedRowRender={record => <p style={{ margin: 0, color: "red"}}>Transaction Hash: {record.transaction}<br/>账户签名: {record.atname}</p>}/>
            </div>
          );
        }
    }

}
