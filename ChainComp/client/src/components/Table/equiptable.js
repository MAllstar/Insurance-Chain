import React, { Component } from 'react';
import { Table, Divider, Icon } from 'antd';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
//设备信息
let equipdata = [
    {
      ep1: '发动机',
      stat1: '正常',
      ep2: '真空加力器',
      stat2: '轻微受损',
    },
    {
      ep1: '转向灯',
      stat1: '轻微受损',
      ep2: '制动总泵',
      stat2: '正常'
    },
    {
      ep1: '气门',
      stat1: '中度受损',
      ep2: '转向机',
      stat2: '严重受损',
    },
    {
      ep1: '散热器',
      stat1: '严重受损',
      ep2: '平衡块',
      stat2: '正常',
    },
    {
      ep1: '压缩机',
      stat1: '损坏',
      ep2: '蜂鸣器',
      stat2: '轻微受损',
    },
    {
      ep1: '刹车片',
      stat1: '中度受损',
      ep2: '报警器',
      stat2: '损坏',  
    },
];
let dataSource = [];
for (let i = 0; i< 6; i++) {
    dataSource.push({
      key: i,
      equip1: equipdata[i].ep1,
      status1: equipdata[i].stat1,
      equip2: equipdata[i].ep2,
      status2: equipdata[i].stat2,
    });
}

const columns = [
  {
    title: '设备',
    dataIndex: 'equip1',
    width: 100,
    render: (text,record,index) =>{
      console.log(text, record, index)
      if(record.status1=='损坏')
        return (
          <span>{text}<Icon type="warning" style={{color: "red"}}/></span>
        );
      else
          return text;
    }
  },
  {
    title: '状态',
    dataIndex: 'status1',
    width: 100,
    render: text =>{
      if(text=='正常')
          return (
              <span style={{color: "green"}}>{text}</span>
          );    
      else if(text=='轻微受损')
          return (
              <span style={{color: "blue"}}>{text}</span>
          );
      else if(text=='中度受损')
          return (
              <span style={{color: "orange"}}>{text}</span>
          );
      else if(text=='严重受损')
          return (
              <span style={{color: "red"}}>{text}</span>
          );
      else
          return text;
    },
  },
  {
    title: '设备',
    dataIndex: 'equip2',
    width: 100,
    render: (text,record) =>{
      if(record.status2=='损坏')
        return (
          <span>{text}<Icon type="warning" style={{color: "red"}}/></span>
        );
      else
          return text;
    }
  },
  {
    title: '状态',
    dataIndex: 'status2',
    width: 100,
    render: text =>{
      if(text=='正常')
          return (
             <span style={{color: "green"}}>{text}</span>
          );    
      else if(text=='轻微受损')
          return (
            <span style={{color: "blue"}}>{text}</span>
          );
      else if(text=='中度受损')
        return (
            <span style={{color: "orange"}}>{text}</span>
        );
      else if(text=='严重受损')
        return (
            <span style={{color: "red"}}>{text}</span>
        );
      else
          return text;
    },
  },
];

//受损设备费用
let columnsfix = [
    {
      title: '设备',
      dataIndex: 'equipfix1',
      /*
      render: text=>{
        equipdata.forEach(element => {
          if(text== element.ep1) {
            if(element.stat1=='正常'){
              return (
                  <span style={{color: "green"}}>{text}</span>
              ); 
            }
            else if(text=='轻微受损')
              return (
                  <span style={{color: "blue"}}>{text}</span>
              );
            else if(text=='中度受损')
              return (
                  <span style={{color: "orange"}}>{text}</span>
              );
            else if(text=='严重受损')
              return (
                  <span style={{color: "red"}}>{text}</span>
              );
            else 
              return (
                  <span>{text}<Icon type="warning" style={{color: "red"}}/></span>
              );
          }
          else
            return text;
        });
      }
      */
    },
    {
      title: '费用',
      dataIndex: 'money1',
    },
    {
      title: '设备',
      dataIndex: 'equipfix2',
      /*
      render: text=>{
        equipdata.forEach(element => {
          if(text==element.ep1) {
            if(element.stat1=='正常'){
              return (
                  <span style={{color: "green"}}>{text}</span>
              ); 
            }
            else if(text=='轻微受损')
              return (
                  <span style={{color: "blue"}}>{text}</span>
              );
            else if(text=='中度受损')
              return (
                  <span style={{color: "orange"}}>{text}</span>
              );
            else if(text=='严重受损')
              return (
                  <span style={{color: "red"}}>{text}</span>
              );
            else
              return (
                  <span>{text}<Icon type="warning" style={{color: "red"}}/></span>
              );
          }
          else
            return text;
        });
      }
      */
    },
    {
      title: '费用',
      dataIndex: 'money2',
    },
];
const data = [
  {
    equipfix1: '发动机',
    money1: 100,
    equipfix2: '真空加力器',
    money2: 100,
  },
  {
    equipfix1: '转向灯',
    money1: 100,
    equipfix2: '制动总泵',
    money2: 100,
  },
  {
    equipfix1: '气门',
    money1: 100,
    equipfix2: '转向机',
    money2: 100,
  },
  {
    equipfix1: '散热器',
    money1: 100,
    equipfix2: '平衡块',
    money2: 100,
  },
  {
    equipfix1: '压缩机',
    money1: 100,
    equipfix2: '蜂鸣器',
    money2: 100,
  },
  {
    equipfix1: '刹车片',
    money1: 100,
    equipfix2: '报警器',
    money2: 100,
  }
]

function EquipInfo() {
  return (
    <div>
         <Table dataSource={cookies.get('login')=='0'?[]:dataSource} columns={columns} bordered pagination={false} scroll={{x: 60, y: 300 }} footer={()=>{return <span><Icon type="warning" style={{color: "red"}}/>表示该设备在事故发生之前已受损或处于异常状态</span>}}/>
    </div>
  );
}

function FixInfo() {
  return (
    <div>
         <Table dataSource={cookies.get('login')=='0'?[]:data} columns={columnsfix} bordered pagination={false} scroll={{x: 60, y: 300 }} />
    </div>
  );
}

export { EquipInfo, FixInfo };
