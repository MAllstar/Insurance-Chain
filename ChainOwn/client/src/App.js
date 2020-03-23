import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import storageDataContract from "./contracts/storageData.json"
import UserloginContract from "./contracts/Userlogin.json";
import getWeb3 from "./utils/getWeb3";
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import { HashRouter, Route } from "react-router-dom"
import $ from 'jquery';
import { checkPropTypes } from "prop-types";
import PropTypes from "prop-types";
import { getAvailableSize } from "echarts/lib/util/layout";
import Cookies from 'universal-cookie';
import {Redirect} from "react-router-dom"

const cookies = new Cookies();
const name = cookies.get('userName')=='msq'?'莫四七':'张全';
const carnum = name=="莫四七"?'浙A·12580':'浙C·45678';
const money = name=="莫四七"?4890:32456; 
const accountname = name=='莫四七'?'chain_33006002':'chain_33006001';
const cost = name=="莫四七"?'交强险 300,180,230,100,800,1120,50,880,230,300,300,400 正常，轻微受损，轻微受损，正常，中度受损，严重受损，严重受损，正常，损坏，轻微受损，中度受损，损坏 双方均有过错,按过错程度和对事故发生的重要性共同承担 '+ " " +accountname : '第三责任险 3700,1080,2330,1100,500,120,560,780,630,700,900,780 损坏，严重受损，严重受损，轻微受损，中度受损，严重受损，严重受损，正常，损坏，轻微受损，中度受损，损坏 只存在该方过错,承担全部责任'+ " " + accountname;

class App extends Component {
 
  state = {enc: false, username: null,storageValue: 0, web3: null, accounts: null, contract: null, apply: false, blockId: null,transaction: null,id: null,accounts: null,data: [],status: null};
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
  callback(status){
    this.setState({
        status,
       
    })
  }
  componentWillMount= async()=>{  //在渲染前调用
      if(cookies.get('userName')=='admin'){
        cookies.set('login', '0', { path: '/' });
        cookies.set('userName', null, { path: '/' });  //这里null是字符串,相当于'null'
        cookies.set('addr', null, { path: '/' });
        cookies.set('number', null, { path: '/' });
        cookies.set('num',null, {path: '/'});
      }
      
    
    const web3 = await getWeb3();
    console.log(typeof(web3),web3);
    var Id = await web3.eth.getBlockNumber();
    console.log(Id);
    this.Enc(Id+1);
    this.setState({blockId: Id});
  }
  componentDidMount = async () => { //在第一次渲染后调用
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log(typeof(web3),web3);
      // Use web3 to get the user's accounts.
      await web3.eth.getAccounts().then(console.log);
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log(networkId);
      const deployedNetwork = storageDataContract.networks[networkId];
      const instance = new web3.eth.Contract(
        storageDataContract.abi,
        deployedNetwork && deployedNetwork.address,
      );


      console.log(typeof(instance),instance);
      var Id = await web3.eth.getBlockNumber();
      console.log(Id);
      var Hash;
      var condition;
      var name;
      await web3.eth.getBlock(Id,(error,result)=>{console.log(result.transactions[0]);Hash = result.transactions[0]});
      console.log(Hash);
      //获取当前区块
      await instance.methods.application(Id).call({from: accounts[0]}).then((result)=>{console.log(result[0].toString(),name=result[1],condition=result[7])});
     
      //web3.eth.getTransaction('0x09bd0737e5601f07dd3441b3c18d8a4a8b7bb01a6b55d1aa7ce9372d3157e993').then(function(result){b = result.input;console.log(result.input)});
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, blockId: Id, transaction: Hash,status: condition,username: name}, this.bindEvents);
      console.log(Hash,this.state.transaction,Id,condition);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract, blockId, web3, status, username } = this.state;  //解构赋值
    var id = await web3.eth.getBlockNumber();
    const Id = id+1;
    
    
    if(cookies.get('login') == 1){
      $.ajax({
        url:"http://localhost:3007/",
        type: "POST",
        data: {attr: cookies.get('addr'),dat: '330825'+Id+','+accountname},
        success: async function(result){
          var data = result.split(',');
          console.log('申请理赔')
          console.log('密文：' + data[0]);
          console.log('私钥' + data[1]);
          console.log('明文' + data[2]);
          // if(((status!="申请中" && username=="张全" && cookies.get('userName')=='20172122') || (status=="申请中" && username=="张全" && cookies.get('userName')=='msq'))  && (status=="申请中" && username=="张全" && cookies.get('userName')=='20172122') || (status!="申请中" && username=="莫四七" && cookies.get('userName')=='msq')) //发送一次申请后不再发送交易  
        // Stores a given value
        await contract.methods.apply(Id,name,carnum,money,cost,cookies.get('num'),'申请中',result).send({ from: accounts[0] });
          
        }
      });
    }
    
    
    
    /*
    //if((this.state.status!="申请中" && this.state.username=="张全" && cookies.get('userName')=='20172122') || (this.state.status!="申请中" && this.state.username=="莫四七" && cookies.get('userName')=='msq')) //发送一次申请后不再发送交易  
        // Stores a given value
        await contract.methods.apply(Id,name,carnum,money,cost,cookies.get('num'),'申请中','123456').send({ from: accounts[0] },(error,result)=>{this.setState({ transaction: result, blockId: Id, apply: true,id:  '330825'+Id},()=>{console.log('reject')});console.log(this.state.apply, this.state.blockId,result, accounts[0])
          }); //箭头函数避免this指针丢失
    */
          
    
     
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
        data: {attr: cookies.get('addr'),dat: '330825'+id+','+accountname},
        success:  function(result){
          console.log(result)
          var data = result.split(',');
          console.log('密文：' + data[0]);
          console.log('私钥' + data[1]);
          console.log('明文' + data[2]);
        }
      });
      
    }

  }

  
  bindEvents = () => {
    $(document).on('click', '.bt-applyok .ant-btn-primary', this.runExample);

    this.Enc(this.state.blockId+1);
   
  };

  /*
  //更新
  componentDidUpdate = ()=>{
    console.log('更新后')
    this.Enc(this.state.blockId+1);
  }
  */


 async update() {
    const { accounts, contract, blockId, web3, status, username } = this.state;  //解构赋值
    var id = await web3.eth.getBlockNumber();
    const Id = id+1;
    console.log(Id);
    this.setState({blockId: Id, id: "330825"+Id});
  }


  







  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    console.log(this.state.apply);
    return (
      <HashRouter>
        <Route exact path={"/login"} component={Login}/>
        <Route exact path={"/"} component={Home}/>
      </HashRouter>
    );
  }
}

export default App;
