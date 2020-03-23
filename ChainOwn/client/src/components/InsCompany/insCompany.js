import React, { Component } from 'react';
import { Row, Col, Button, Input, Tabs, Radio, message, Modal, Popconfirm, Descriptions, Badge } from 'antd';
import '../Owner/owner';
import './insCompany.css';
import UserloginContract from "../../contracts/Userlogin.json";
import PropTypes from "prop-types";
import getWeb3 from "./../../utils/getWeb3";
import { InsList } from '../Table/list';
import { FixInfo } from "../Table/equiptable";
import { HisSearch } from '../Table/search';
import CarImg from '../../img/car.png';
import { Records } from '../Table/instable';

const Search = Input.Search;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const liablity = `当发生了交通事故以后，车主必须要在第一时间内亮起车辆的危险警告灯，并在车后面设置危险警告标识牌。这样做的好处就是防止有后面的车进行追尾的碰撞，从而保障车内的人员以及车辆自身的安全。`;
const result = `除了设立了警示标识以后，还要对事故的现场进行拍照取证，这是向保险公司进行理论的事故证据，在移动车辆之前进行拍照的方法主要是为了避免车主不认问题出现。`;

function callback(key) {
    console.log(key);
}
//单选框
class InsRadio extends Component {

    state = {
      value: 1,
    };
  
    onChange = e => {
      console.log('radio checked', e.target.value);
      this.setState({
        value: e.target.value,
      });
    };
  
    render() {
      return (
        <RadioGroup onChange={this.onChange} value={this.state.value}>
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

export class InsCompany extends Component{
    constructor(props,context){
      super(props,context);   //调用父类构造函数
    }
     // 子组件声明自己需要使用 context
     static contextTypes = {
      contract: PropTypes.object,
      callback: PropTypes.func
    }
    state = {
        insId : '',
        record: {}
    }
      //获取HisSearch组件中的数据
      getSearch(newId) {
        this.setState({     //修改状态值
          insId: newId     
        })
      }
      getRecord(newRecord) {
        this.setState({
          record: newRecord
        })

      }
      /*
      componentWillReceiveProps = async () => {  //在组件接收到一个新的 props (更新后)时被调用。这个方法在初始化render时不会被调用。
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
          const userInfo = new web3.eth.Contract(
            UserloginContract.abi,
            deployedNetwork && deployedNetwork.address,
          );

          const instance = this.context.contract;
          await instance.methods.regist(num).call({from: accounts[0]}).then((result)=>{console.log(result)});
    
    
          
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      };
      */
  
      
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
                                        330825*******9943
                                      </Descriptions.Item>
                                      <Descriptions.Item label="手机号" span={1}>17374568873</Descriptions.Item>
                                      <Descriptions.Item label="账户地址" span={3}>
                                        0x9332c3D2dF701b8268E6aEd9941662f1E630157b
                                      </Descriptions.Item>
                                  
                                      <Descriptions.Item label="理赔时间" span={2}>
                                        {this.state.record.time}
                                      </Descriptions.Item>
                                      <Descriptions.Item label="车牌号" span={1}>
                                        {this.state.record.pleteData}
                                      </Descriptions.Item>
                                   
                                      <Descriptions.Item label="Status" span={3}>
                                        <Badge status="processing" text="Processing" />
                                      </Descriptions.Item>
                             
                                  <Descriptions.Item label="理赔金额" span={2}>￥{this.state.record.money}</Descriptions.Item>
                                  <Descriptions.Item label="投保项目" span={1}>交强险</Descriptions.Item>
                                  
                                  <Descriptions.Item label="事故判定">
                                    Data disk type: MongoDB
                                    <br />
                                    Database version: 3.4
                                    <br />
                                    Package: dds.mongo.mid
                                    <br />
                                    Storage space: 10 GB
                                    <br />
                                    Replication_factor:3
                                    <br />
                                    Region: East China 1<br />
                                  </Descriptions.Item>
                                </Descriptions>
                                <InsRadio />
                                <Popconfirm
                                    title="是否确认申请?"
                                    onConfirm={confirm}
                                    onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                    className = "applyYes"
                                >
                                    <Button type="primary" className="right" style={{marginRight: "5%", marginTop: "2%"}}>确认</Button>
                                </Popconfirm>
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


