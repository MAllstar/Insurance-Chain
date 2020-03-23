import React, { Component } from 'react';
import { Row, Col, Button, Carousel, Input, Modal, Card, Menu, Dropdown } from 'antd';
import { Skeleton, Switch, Icon, Avatar } from 'antd';
import PropTypes from "prop-types";
import './owner.css';
import { EquipInfo } from '../Table/equiptable';
import { EquipChart } from '../Table/equipchart'; 
import { Records } from '../Table/instable';
import { HisSearch } from '../Table/search';
import CarImg from '../../img/car.png';
import { Ethers } from '../../utils/applyWeb3';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const Search = Input.Search;
const { TextArea } = Input;
const result = `按照我国相关法律的规定，道路交通事故，是指车辆在道路上的行驶途中因过错或者意外造成的人身伤亡或者财产损失的事件。
构成交通事故应当具备下列要素：
（1）必须是车辆造成的。车辆包括机动车和非机动车，没有车辆就不能构成交通事故，例如行人与行人在行进中发生碰撞的就不构成交通事故；
（2）是在道路上发生的。道路是指公路、城市道路和虽在单位管辖范围但允许社会机动车通行的地方．包括广场、公共停车场等用于公众通行的场所；
（3）在运动中发生。是指车辆在行驶或停放过程中发生的事件，若车辆处于完全停止状态，行人主动去碰撞车辆或乘车人上下车的过程中发生的挤、摔、伤亡的事故，则不属于交通事故；
（4）有事态发生。是指有碰撞、碾压、刮擦、翻车、坠车、爆炸、失火等其中的一种现象发生；
（5）造成事态的原因是人为的。是指发生事态是由于事故当事者（肇事者）的过错或者意外行为所致。如果是由于人无法抗拒的各种自然灾害造成，均不属于交通事故；
（6）必须有损害后果的发生。损害后果仅指直接的损害后果，且是物质损失，包括人身伤亡和财产损失；
（7）当事人心理状态是过失或有其他意外因素。若当事人心理状态处于故意，则不属于交通事故。`;

const tabListNoTitle = [
  {
    key: 'owner',
    tab: '车主',
  },
  {
    key: 'carId',
    tab: '车牌号',
  },
  {
    key: 'instance',
    tab: '投保项',
  },
];

const contentListNoTitle = {
  owner: <p>张家辉</p>,
  carId: <p>浙A·12306</p>,
  instance: <p>交通险</p>,
};

const menu = (
  <Menu onClick={handleMenuClick}>
  </Menu>
);

function handleMenuClick(e) {
  console.log('click', e);
}

const { Meta } = Card;

class Money extends React.Component {
  // 子组件声明自己需要使用 context
  static contextTypes = {
    accounts: PropTypes.object,
    callback: PropTypes.func
  }
  state = {
    loading: true,
  };

  onChange = checked => {
    if(cookies.get('number')!='null')
        this.setState({ loading: !checked });
  };

  render() {
    const { loading } = this.state;

    return (
      <div>
        <Switch checked={!loading} onChange={this.onChange} />

        <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="个人理赔信息"
            description={<p>车主姓名: <span>张家辉</span><br /> 身份证：330825*******9943<br />
            理赔金额：<span style={{fontSize: 18,color: "red"}}>32456</span><br />保险：交通险<br />账户地址: <span style={{wordBreak: "break-all"}}>{this.context.accounts[0]}</span></p>}
          />
        </Card>
        </div>
    );
  }
}


class TabsCard extends React.Component {
  state = {
    key: 'owner',
    noTitleKey: '车主',
  };

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
    return (
      <div>
        <Card
          style={{ width: '100%'}}
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          onTabChange={key => {
            this.onTabChange(key, 'noTitleKey');
          }}
        >
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
      </div>
    );
  }
}

//申请理赔对话框
class InsSubmit extends React.Component { 
    state = {
      ModalText: '是否确认申请理赔？',
      visible: false,
      confirmLoading: false,
    };
    
    showModal = () => {
      if(cookies.get('number')!='null'){
          this.setState({
            visible: true,
          });
      }
    };
  
    handleOk = () => {
      this.setState({ 
        ModalText: '已提交申请，发送交易后工作人员会在一到三天内确认申请，请耐心等候',
        confirmLoading: true,
      });
      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }, 2000);
    };
  
    handleCancel = () => {
      console.log('Clicked cancel button');
      this.setState({
        visible: false,
      });
    };
  
    render() {
      const { visible, confirmLoading, ModalText } = this.state;
      return (
        <div style={{marginLeft: -100, marginTop: -20}}> 
          <Money />
          <Button  onClick={this.showModal} style={{fontSize: 20,marginLeft: 100}} className="bt-apply">
            申请理赔
          </Button>
          <Modal
            title="申请理赔"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            className =  "bt-applyok" >
            <p>{ModalText}</p>
          </Modal>
        </div>
      );
    }
}


export class Owner extends Component {
    constructor(props) {
        super(props);
    }
    state = {
      insId : ''
    }

    //父组件提供一个回调函数，获取HisSearch组件中的数据
    getSearch(newId) {
      this.setState({     //修改状态值
        insId: newId     
      })
    }
    render() {
        return (
            <div className="container">
                <div className="left lf">
                    <Row className="imgCar">
                        <Col span={20}><img src={CarImg} alt=""/></Col>
                        <Col span={4} style={{marginTop: "40%"}}><InsSubmit /></Col>
                    </Row>
                    <div>
                        <h1 className="left marginlf" ><b>设备信息</b></h1> <span style={{paddingLeft: "20px"}}>车牌号:</span> <Dropdown overlay={menu} style={{fontSize: 18}}><Button>{cookies.get('number')=='null'?"":"浙A·12306"} <Icon type="down" /></Button></Dropdown>
                        <div className="equipInfo marginlf">
                            {EquipInfo()}
                        </div>
                    </div>
                </div>
                <div className="right rt">
                    <div>
                        <Row>
                            <Col span={24}>
                                <EquipChart />
                            </Col>
                        </Row>
                        <Row style={{paddingTop: 10}}>
                            <Col span={11}>
                                <h2  className="left"><b>理赔声明</b></h2>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={5}>
                                <h2  className="left"><b>历史理赔记录</b></h2>
                            </Col>
                            <Col span={1}>
                                 <h2 ><b>查询</b></h2>
                            </Col>
                            <Col span={5}>
                                <HisSearch callback={newId=>this.getSearch(newId)}/>  {/* callback自定义属性，子组件可通过props调用callback(newId)，父组件调用getSearch()从子组件HisSerach获取到值 */}
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col span={6}><TextArea rows={12} defaultValue={result}></TextArea></Col>
                        <Col span={1}></Col>
                        <Col span={16}><Records value={this.state.insId}/></Col>   {/* 父组件向子组件传值 */}
                    </Row>
                    <TabsCard />
                </div>
                
            </div>
        );
    }
}   