import React, { Component } from 'react';
import { Row, Col, Button, Input, Tabs, Radio, message, Modal, Popconfirm, Descriptions, Badge } from 'antd';
import '../Owner/owner';
import './insCompany.css';
import UserloginContract from "./../../contracts/Userlogin.json";
import getWeb3 from "./../../utils/getWeb3";
import { InsList } from '../Table/list';
import { FixInfo } from "../Table/equiptable";
import { HisSearch } from '../Table/search';
import CarImg from '../../img/car.png';
import { Records } from '../Table/instable';
import { Result } from '../Table/insresult';
import $ from 'jquery';
import PropTypes from "prop-types";
import { checkPropTypes } from "prop-types";
import Cookies from 'universal-cookie';
import storageDataContract from "./../../contracts/storageData.json"

const cookies = new Cookies();
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const liablity = `当发生了交通事故以后，车主必须要在第一时间内亮起车辆的危险警告灯，并在车后面设置危险警告标识牌。这样做的好处就是防止有后面的车进行追尾的碰撞，从而保障车内的人员以及车辆自身的安全。`;
const result = `除了设立了警示标识以后，还要对事故的现场进行拍照取证，这是向保险公司进行理论的事故证据，在移动车辆之前进行拍照的方法主要是为了避免车主不认问题出现。`;

let item;
let deside;

function callback(key) {
    console.log(key);
}
//单选框
class InsRadio extends Component {
    constructor(props) {
      super(props);
    }
    state = {
      value: 1,
    };
  
    onChange = e => {
      console.log('radio checked', e.target.value);
      this.props.callback(e.target.value);
      this.setState({
        value: e.target.value,
      });
    };
  
    render() {
      return (
        <RadioGroup onChange={this.onChange} value={this.state.value} >
          <Radio value={1}>通过</Radio>
          <Radio value={2}>驳回</Radio>
        </RadioGroup>
      );
    }
}
//确认框
function confirm(e) {
    console.log(e);
    message.success('确认成功');
  }
  
function cancel(e) {
    console.log(e);
    message.error('取消');
  }
//保险公司界面
export class InsCompany extends Component{
  constructor(props,context){
    super(props,context);   //调用父类构造函数

  }
  // 子组件声明自己需要使用 context
  static contextTypes = {
    blockId: PropTypes.string,
    transaction: PropTypes.string,
    
    web3: PropTypes.object,
    accounts: PropTypes.object,
  
    contract: PropTypes.object,
    contract2: PropTypes.object,
    callback: PropTypes.func
  }
  state = { usercontract: null,info: {},select : 1, insId : '',record: {},storageValue: 0, web3: null, accounts: null, contract: null, contract2: null, apply: false, blockId: null,transaction: null,id: null,accounts: null,data: [],status: null};
  /*
  //父组件声明自己支持 context,声明Context对象属性
  static childContextTypes = {
    blockId: PropTypes.string,
    transaction: PropTypes.string,
    id: PropTypes.string,
    web3: PropTypes.object,
    accounts: PropTypes.object,
    status: PropTypes.string,
    contract: PropTypes.object,
    callback: PropTypes.func
  }

  //父组件提供一个函数，返回Context对象，通过实例方法getChildContext()创建Context对象，方法名是约定好的
  getChildContext(){
    return{
      blockId: this.state.blockId,
      transaction: this.state.transaction,
      id: this.state.id,
      web3: this.state.web3,
      accounts: this.state.accounts,
      status: this.state.status,
      contract: this.state.contract,
      callback: this.callback.bind(this)
    }
  }
  // 在此回调中修改父组件的 state
  callback(blockId, transaction,web3,contract,id,accounts,status){
    this.setState({
        blockId,
        transaction,
        id,
        web3,
        accounts,
        status,
        contract,
    })
  }
  */

  componentDidMount = async () => { //在第一次渲染后调用
    try {
      
      /*
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log(typeof(web3),web3);
      // Use web3 to get the user's accounts.
      await web3.eth.getAccounts().then(console.log);
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      const cookies = new Cookies();
      cookies.set('account', accounts[0], { path: '/' });
     

       // Get the contract instance.
       const networkId = await web3.eth.net.getId();
       console.log(networkId);
       const deployedNetwork = storageDataContract.networks[networkId];
       const instance = new web3.eth.Contract(
         storageDataContract.abi,
         deployedNetwork && deployedNetwork.address,
       );

       // Get the contract instance.用户注册合约
      const networkId2 = await web3.eth.net.getId();
      console.log(networkId2);
      const deployedNetwork2 = UserloginContract.networks[networkId2];
      const user = new web3.eth.Contract(
        UserloginContract.abi,
        deployedNetwork2 && deployedNetwork2.address,
      );
      console.log(user);
        */

       const web3 = this.context.web3;
       console.log(web3);
       const accounts = this.context.accounts;
       console.log(accounts[0]);
       const instance = this.context.contract;
       console.log(instance);
       const user = this.context.contract2;
       console.log(user);
      
      

      console.log(typeof(instance),instance);
      var Id = await web3.eth.getBlockNumber();
      console.log(Id);
      var Hash;
      var condition;
      var insId;
      await web3.eth.getBlock(Id,(error,result)=>{console.log(result.transactions[0]);Hash = result.transactions[0]});
      console.log(Hash);
      //获取当前数据合约内容
      await instance.methods.application(Id).call({from: accounts[0]}).then((result)=>{console.log(result[0].toString(),result[1],condition=result[7],insId = result[8])});
     
      
      // example of interacting with the contract's methods.
      this.setState({ usercontract: user,web3, accounts, contract: instance,contract2: user, blockId: Id, transaction: Hash,status: condition,id: insId}, this.bindEvents);
      console.log(Hash,this.state.transaction,Id,condition);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
//通过申请
  runExample = async () => {
    const { accounts, contract, blockId ,web3} = this.state;  //解构赋值
    var id = await web3.eth.getBlockNumber();
    const Id = id+1;
    console.log(Id)
    const deside = this.state.select==1?'通过申请':'驳回申请';
    console.log(this.state.record);
    const money = parseInt(this.state.record.money);
    const num = parseInt(this.state.record.usernum)
    /*
    if(cookies.get('login') == 1){
      $.ajax({
        url:"http://localhost:3007/",
        type: "POST",
        data: {attr: cookies.get('addr'),dat: '21334410086791234422345'},
        success: function(result){
          var data = result.split(',');
          console.log('密文：' + data[0]);
          console.log('私钥' + data[1]);
          console.log('明文' + data[2]);
          if( this.state.record.id != this.state.id || this.state.status=='申请中') //发送一次申请后不再发送交易  
        // Stores a given value    
        await contract.methods.apply(Id,this.state.record.name, this.state.record.pleteData, money, this.state.record.data,num,deside,result).send({ from: accounts[0] });
        }
      });
    }
    
    
    this.setState({blockId: Id, id: this.state.record.id},()=>{this.context.callback(this.state.blockId);})//在此回调中修改父组件的 state,进而改变this.context, 
    */
    
    if( this.state.record.id != this.state.id || this.state.status=='申请中') //发送一次申请后不再发送交易  
        // Stores a given value    this.context.callback(this.state.blockId);在此回调中修改父组件的 state,进而改变this.context, 
        await contract.methods.apply(Id,this.state.record.name, this.state.record.pleteData, money, this.state.record.data,num,deside,this.state.record.enc).send({ from: accounts[0] },(error,result)=>{this.setState({ transaction: result, blockId: Id, apply: true,id:  this.state.record.id},()=>{console.log('reject')});console.log(this.state.apply, this.state.blockId,result, accounts[0]);this.context.callback(this.state.blockId);
          }); //箭头函数避免this指针丢失
      
     
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.application(blockId).call();

    // Update state with the result.
    this.setState({ storageValue: response });
    
  };

  Enc = (id) => {
    if(cookies.get('login') == 1){
      $.ajax({
        url:"http://localhost:3007/",
        type: "POST",
        data: {attr: cookies.get('addr'),dat: '330825'+id},
        success: async function(result){
          console.log(result)
          var data = result.split(',');
          console.log('密文：' + data[0]);
          console.log('私钥' + data[1]);
          console.log('明文' + data[2]);
         cookies.set('priKey',data[1], { path: '/' });
        }
      });
    }
  }

  bindEvents = () => {
    $(document).on('click', '.ant-popover-buttons .ant-btn-primary', this.runExample);
    console.log(this.state.apply);
  };



      //获取HisSearch组件中的数据
      getSearch(newId) {
        this.setState({     //修改状态值
          insId: newId     
        })
      }
      getRecord(newRecord) {
        this.setState({
          record: newRecord,
        },this.ShowUser)

      }
      getRadio(value) {
        this.setState({
          select: value
        })
      }
      
     


  Ifconfirm = ()=>{
    if(this.state.record.state=="申请中"){
      return (
      <Popconfirm
          title="是否确认申请?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
          className = "applyYes"
          
      >
        <Button type="primary" className="right" style={{marginRight: "5%", marginTop: "2%"}} >确认</Button>
      </Popconfirm>
      )

    }
    else{
      return <Button type="primary" className="right" style={{marginRight: "5%", marginTop: "2%"}} disabled>确认</Button>
    }
  }

  ShowStatus = ()=>{
    if(this.state.record.state=="申请中"){
      return "processing"
    }
    else if(this.state.record.state=="通过申请"){
      return "success"
    }
    else{
      return "error"
    }
  }

  ShowUser= async()=>{
    const { accounts, usercontract} = this.state;  //解构赋值
    var str = this.state.record.data.split(" ");
    item  = str[0];
    deside = str[3];
    
  console.log(this.state.record.usernum);
   var num = parseInt(this.state.record.usernum);
   
   //获取info,更新state,重新渲染
    await usercontract.methods.userInfo(num).call().then((result)=>{console.log(result);this.setState({info: {idCard: result[5], phone: result[6], addr: result[7]}})});

  }
    
    render() {
        
        return(
            <div className="container">
                <div className="left lfpart" style={{paddingLeft: '5%', marginTop: '2%'}}>
                  <Tabs defaultActiveKey="1" onChange={callback}>
                  <TabPane tab="保单列表" key="1">
                      <Row>
                          <Col span={10}><h2><b>查询</b><HisSearch callback={newId=>this.getSearch(newId)}/></h2></Col>  {/*callback 自定义属性*/}
                      </Row>
                      <div style={{width: '100%'}}>
                          <InsList value={this.state.insId}/>
                      </div>
                  </TabPane>
                  <TabPane tab="理赔申请" key="2">
                      <Row>
                          <Col span={10}><h2><b>查询</b><HisSearch callback={newId=>this.getSearch(newId)}/></h2></Col>
                      </Row>
                      <div style={{width: '100%'}}>
                          <Records value={this.state.insId} callback={newRecord=>{this.getRecord(newRecord);console.log(newRecord)}}/> 
                      </div>
                  </TabPane>
                  <TabPane tab="理赔结果" key="3">
                      <Row>
                          <Col span={10}><h2><b>查询</b><HisSearch callback={newId=>this.getSearch(newId)}/></h2></Col>
                      </Row>
                      <div style={{width: '100%'}}>
                          <Result value={this.state.insId} callback={newRecord=>{this.getRecord(newRecord);console.log(newRecord)}}/> 
                      </div>
                  </TabPane>
                  </Tabs>
                </div>
                <div className="right rtpart" >
                    <div className="img">
                        <img src={require('../../img/car.png')} alt=""/>
                    </div>
                    <div>
                        <Tabs onChange={callback} type="card" tabPosition="left" >
                        <TabPane tab="申请处理" key="1">
                                  
                                  <Descriptions title="Application" bordered size="small" >
                                      <Descriptions.Item label="单号" span={2}>{this.state.record.id}</Descriptions.Item>
                                      <Descriptions.Item label="申请人姓名" span={1}>{this.state.record.name}</Descriptions.Item>
                                      <Descriptions.Item label="身份证" span={2}>
                                       {this.state.info.idCard}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="手机号" span={1}>{this.state.info.phone}</Descriptions.Item>
                                      <Descriptions.Item label="账户地址" span={3}>
                                        {this.state.info.addr}
                                      </Descriptions.Item>
                                  
                                      <Descriptions.Item label="理赔时间" span={2}>
                                        {this.state.record.time}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="车牌号" span={1}>
                                        {this.state.record.pleteData}
                                      </Descriptions.Item>
                                   
                                      <Descriptions.Item label="Status" span={3}>
                                        <Badge status={this.ShowStatus()} text={this.ShowStatus()} />
                                      </Descriptions.Item>
                             
                                  <Descriptions.Item label="理赔金额" span={2}>￥{this.state.record.money}</Descriptions.Item>
                                  <Descriptions.Item label="投保项目" span={1}>{item}</Descriptions.Item>
                                  
                                  <Descriptions.Item label="事故判定">
                                    Data disk type: MongoDB
                                    <br />
                                    Database version: 3.4
                                    <br />
                                    Package: dds.mongo.mid
                                    <br />
                                    {deside}
                                    <br />
                                    Replication_factor:3
                                    <br />
                                    Region: East China 1<br />
                                  </Descriptions.Item>
                                </Descriptions>
                                <InsRadio callback={value=>{this.getRadio(value);console.log(value)}}/>
                                
                                  {this.Ifconfirm()}
              
                            </TabPane>
                            <TabPane tab="受损设备维修费用" key="2">
                                <FixInfo />
                            </TabPane>  
                            <TabPane tab="事故与保单详情" key="3">
                                <h2><b>事故责任</b></h2>
                                <TextArea rows={8} defaultValue={liablity}></TextArea>
                                <TextArea rows={8} defaultValue={result}></TextArea>
                                <h2><b>保单详情</b></h2>
                                <a href="#">www.baidu.com</a>
                            </TabPane>
                            
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}


