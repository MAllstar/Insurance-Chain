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

class App extends Component {
  state = {storageValue: 0, web3: null, accounts: null, contract: null, contract2: null, apply: false, blockId: null,transaction: null,id: null,accounts: null,data: [],status: null};
  //父组件声明自己支持 context,声明Context对象属性
  static childContextTypes = {
    blockId: PropTypes.string,
    transaction: PropTypes.string,
    web3: PropTypes.object,
    accounts: PropTypes.object,
    contract: PropTypes.object,
    contract2: PropTypes.object,
    callback: PropTypes.func
  }

  //父组件提供一个函数，返回Context对象，通过实例方法getChildContext()创建Context对象，方法名是约定好的
  getChildContext(){
    return{
      blockId: this.state.blockId,
      transaction: this.state.transaction,
      web3: this.state.web3,
      accounts: this.state.accounts,
      contract: this.state.contract,
      contract2: this.state.contract2,
      callback: this.callback.bind(this)
    }
  }
  // 在此回调中修改父组件的 state
  callback(blockId){
    this.setState({
        blockId,
    
    })
  }
  componentWillMount= ()=>{  //在渲染前调用
    if(cookies.get('userName')!='admin'){
      cookies.set('login', '0', { path: '/' });
      cookies.set('userName', null, { path: '/' });  //这里null是字符串,相当于'null'
      cookies.set('addr', null, { path: '/' });
      cookies.set('number', null, { path: '/' });
      cookies.set('num',null, {path: '/'});
    }
  
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

      // Get the contract instance.用户注册合约
      const networkId2 = await web3.eth.net.getId();
      console.log(networkId2);
      const deployedNetwork2 = UserloginContract.networks[networkId2];
      const user = new web3.eth.Contract(
        UserloginContract.abi,
        deployedNetwork2 && deployedNetwork2.address,
      );
      console.log(user);


      console.log(typeof(instance),instance);
      var Id = await web3.eth.getBlockNumber();
      console.log(Id);
      var Hash;
      var condition;
      await web3.eth.getBlock(Id,(error,result)=>{console.log(result.transactions[0]);Hash = result.transactions[0]});
      console.log(Hash);
      
     
      //web3.eth.getTransaction('0x09bd0737e5601f07dd3441b3c18d8a4a8b7bb01a6b55d1aa7ce9372d3157e993').then(function(result){b = result.input;console.log(result.input)});
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, contract2: user, blockId: Id, transaction: Hash});
      console.log(Hash,this.state.transaction,Id,condition);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  /*
//通过申请
  runExample = async () => {
    const { accounts, contract, blockId } = this.state;  //解构赋值
    const Id = blockId + 1;

    this.Enc(Id);
    if(cookies.get('login') == 1){
      $.ajax({
        url:"http://localhost:3007/",
        type: "POST",
        data: {attr: cookies.get('addr'),dat: '330825'+Id},
        success: function(result){
          var data = result.split(',');
          console.log('密文：' + data[0]);
          console.log('私钥' + data[1]);
          console.log('明文' + data[2]);

          cookies.set('priKey',data[1], { path: '/' });
        }
      });
    }
    //if(!this.state.apply && this.state.status!='申请中') //发送一次申请后不再发送交易  
        // Stores a given value
        await contract.methods.apply(Id,'msq','浙A·12580',4890,'300,180,230,100,800,1120,50,880,230,300,300,400 正常，轻微受损，轻微受损，正常，中度受损，严重受损，严重受损，正常，损坏，轻微受损，中度受损，报警器',1,'通过申请',"330825"+Id).send({ from: accounts[0] },(error,result)=>{this.setState({ transaction: result, blockId: Id, apply: true,id:  '330825258'+Id},()=>{console.log('reject')});console.log(this.state.apply, this.state.blockId,result, accounts[0])
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
  */


  render() {
    
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
  
    return (
      <HashRouter>
        <Route exact path={"/login"} component={Login}/>
        <Route exact path={"/"} component={Home}/>
      </HashRouter>
    );
  }
}

export default App;
