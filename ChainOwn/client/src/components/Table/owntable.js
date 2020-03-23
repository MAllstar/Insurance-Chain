//历史理赔记录
import React, { Component } from 'react';
import { Table, Divider, Icon, Button, Steps } from 'antd';
import Item from 'antd/lib/list/Item';
import PropTypes from "prop-types";
import getWeb3 from "./../../utils/getWeb3";
import storageDataContract from "../../contracts/storageData.json";
import Cookies from 'universal-cookie';
import $ from 'jquery';

const cookies = new Cookies();
const bId = 148;
const { Step } = Steps;
const columns = [
  {
    title: '区块号',
    dataIndex: 'blockId',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.blockId - b.blockId,
  },
  {
    title: '理赔单号',
    dataIndex: 'id',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.id - b.id,

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
          <span style={{color: "green"}}>{text}</span>
        );
      }
      else if(text == '驳回申请'){
        return(
          <span style={{color: "red"}}>{text}</span>
        );
      }
      else {
        return(
          <span style={{color: "blue"}}>{text}</span>
        );
      }
    }
  },
  {
    title: '详情',
    dataIndex: 'info',
    render: text=>{
      return (
        <a>{text}</a>
      );
    }
  }
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
        flaging: 0,
        status: null,
        condition: null,
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
    //时间戳转换未普通日期
    getLocalTime = (nS)=> {  
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');  
     }
     componentDidMount  = async () => { //在第一次渲染后调用,componentDidMount 
      console.log(cookies.get('priKey'));
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
      var condition;
      var num = 0;

      //await instance.methods.application(264).call({from: accounts[0]},(error,result)=>{console.log(result)});
      if(cookies.get('login')!='0'){
      for(var i=bId;i<=this.context.blockId;i++){
        var flag =true;
        await web3.eth.getBlock(i,(error,result)=>{ console.log(Hash=result.transactions[0]);});
        await instance.methods.application(i).call({from: accounts[0]},(error,result)=>{ if(result[1] == "") flag = false});
        
        //筛选出该用户的数据
        await instance.methods.application(i).call({from: accounts[0]},(error,result)=>{ 
          if(cookies.get('userName')=='20172122'&&result[1] != "张全") flag = false;
          else if(cookies.get('userName')=='msq' && result[1] !='莫四七') flag = false;
        });
        if(!flag) continue;
        await instance.methods.application(i).call({from: accounts[0]}).then((result)=>{
          console.log(result[0].toString(),result[1],result[2],result[3].toString(),result[4].toString(),result[5].toString(),result[6],result[7],result[8]);
          var str = result[8].split(",");
          var str2 = result[5].split(" ");
          condition = result[7];
          var item = {
            key: num,
            blockId: result[0].toString(),
            id: str[2],
            name: result[1],
            pleteData: result[2],   //车牌号
            time: this.getLocalTime(result[3].toString()),
            money: result[4].toString(),
            data: result[5],
            transaction: Hash+","+str[1],
            state: result[7],
            info: '显示',
            accountname: str2[4]
          }
          records.push(item);
          num++;
          /*
          if(cookies.get('userName')=='20172122' && item.name=='张全'){
              
              records.push(item);
              num++;
          }
          else if(cookies.get('userName')=='msq' && item.name=='莫四七'){
           
              records.push(item);
              num++;
           
          }
          */
         
        });
      } 
      }
      DataSource = records;
      /*
      //二次筛选，申请处理后的数组
      var reRecords = [];
      var flag = [];
      for(var i=0;i< records.length;i++){
          flag.push(1);
          for(var j=i+1;j< records.length;j++){
            if(records[i].id==records[j].id && records[i].state=='申请中' && records[j].state !='申请中'){
                flag[i]=0;
            }
          }
      }
      for(var i=0;i< records.length;i++){
        if(flag[i]){
          reRecords.push(records[i]);
        }
      }
      console.log(reRecords);
      */
      //this.context.callback(24);
      this.setState({data: records, Id: this.context.blockId, load: false, status: this.context.blockId, condition});
      console.log(condition);
    }
  

    componentWillReceiveProps = async () => {  //在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。
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
      var condition;
     
      await instance.methods.application(this.context.blockId).call({from: accounts[0]},(error,result)=>{console.log(state = result[7])});
      if(cookies.get('login')!='0'){
      for(var i=bId;i<=this.context.blockId;i++){
        var flag =true;

        
        await web3.eth.getBlock(i,(error,result)=>{if(result!=null) Hash=result.transactions[0]});
        await instance.methods.application(i).call({from: accounts[0]},(error,result)=>{ if(result[1] == "") flag = false});

        //筛选出该用户的数据
        await instance.methods.application(i).call({from: accounts[0]},(error,result)=>{ 
          if(cookies.get('userName')=='20172122'&&result[1] != "张全") flag = false;
          else if(cookies.get('userName')=='msq' && result[1] !='莫四七') flag = false;
        });

        if(!flag) continue;
        await instance.methods.application(i).call({from: accounts[0]}).then((result)=>{
          console.log(result[0].toString(),result[1],result[2],result[3].toString(),result[4].toString(),result[5],result[6],result[7],result[8]);
          var str = result[8].split(",");
          var str2 = result[5].split(" ");
          condition = result[7];

          var item = {
            key: num,
            blockId: result[0].toString(),
            id: str[2],
            name: result[1],
            pleteData: result[2],   //车牌号
            time: this.getLocalTime(result[3].toString()),
            money: result[4].toString(),
            item: result[5],   //投保项目
            deadLineTime: result[6],
            transaction: Hash+","+str[1],
            state: result[7],
            info: '显示',
            accountname: str2[4]
          }
          
            records.push(item);
            num++;
            //console.log(records);
    
        });
        
      }
    }
      DataSource = records;

      //this.context.callback(condition);
      this.setState({data: records,load: false, status: state,condition});
      
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
      console.log(this.state.condition);
      if(this.state.status=='申请中'){
        flag = 1;
        
      }
      else if(this.state.condition=='通过申请'){
        flag = 3;
        
      }
      else if(this.state.condition=='驳回申请'){
        flag = 2;
        
        return(
          <Steps size="small" current={cookies.get('login')=='0'?0:flag} status ="error">
            <Step title="Apply" />
            <Step title="In Progress" />
            <Step title="Finished" />
          </Steps>
        )
      }

      return (
        <Steps size="small" current={cookies.get('login')=='0'?0:flag}>
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
              记录数：<b>{cookies.get('login')=='0'?0:this.state.data.length}</b>  <Button  type="primary" shape="circle" icon="reload" href="http://localhost:3000/"/>刷新
              <Table columns={columns} dataSource={cookies.get('login')=='0'?[]:this.dataSearch} pagination={false} bordered scroll={{x: 60, y: 180 }} expandedRowRender={record => {var str=record.transaction.split(',');return <div><p style={{ margin: 0, color: "red"}}>Transaction Hash: {str[0]}</p><p style={{ margin: 0, color: "blue"}}>Key: {str[1]}</p><p>账户签名：{record.accountname}</p></div>}}/>
            </div>
          );
        }
        else {
          return (
            <div>
                记录数：<b>{cookies.get('login')=='0'?0:this.state.data.length}</b>  <Button  type="primary" shape="circle" icon="reload" href="http://localhost:3000/"/>刷新
                <span style={{marginLeft: 300}}>当前理赔进度</span>
                {this.funProcess()}
                <Table  loading={this.state.load} columns={columns} dataSource={cookies.get('login')=='0'?[]:this.state.data} pagination={false} bordered scroll={{x: 100, y: 180 }} expandedRowRender={record => {var str=record.transaction.split(',');return <div><p style={{ margin: 0, color: "red"}}>Transaction Hash: {str[0]}</p><p style={{ margin: 0, color: "blue"}}>Key: {str[1]}</p><p>账户签名：{record.accountname}</p></div>}}/>
            </div>
          );
        }
    }

}
