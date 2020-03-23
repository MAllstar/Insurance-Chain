import React, { Component } from 'react';
import { Table, Divider } from 'antd';

const dataSource = [
    {
      key: '1',
      id: '1111111111',
      name: '张三',
      car: '浙A·66666',
      money: '壹万元整',
      item: '交强险',
      time: '2012.2.2',
    },
    {
      key: '2',
      id: '2222222222',
      name: '李四',
      car: '浙A·88888',
      money: '伍万叁仟元整',
      item: '车辆损失险',
      time: '2023.3.3',
    },
    {
      key: '3',
      id: '3333333333',
      name: '王五',
      car: '浙A·99999',
      money: '壹万元整',
      item: '第三责任险',
      time: '2024.4.4',
    },
    {
      key: '4',
      id: '1111111111',
      name: '张三',
      car: '浙A·66666',
      money: '壹万元整',
      item: '交强险',
      time: '2012.2.2',
    },
    {
      key: 5,
      id: '2222222222',
      name: '李四',
      car: '浙A·88888',
      money: '伍万叁仟元整',
      item: '车辆损失险',
      time: '2023.3.3',
    },
    {
      key: 6,
      id: '3333333333',
      name: '王五',
      car: '浙A·99999',
      money: '壹万元整',
      item: '第三责任险',
      time: '2024.4.4',
    },
    {
        key: '7',
        id: '1111111111',
        name: '张三',
        car: '浙A·66666',
        money: '壹万元整',
        item: '交强险',
        time: '2012.2.2',
      },
      {
        key: '8',
        id: '2222222222',
        name: '李四',
        car: '浙A·88888',
        money: '伍万叁仟元整',
        item: '车辆损失险',
        time: '2023.3.3',
      },
      {
        key: '9',
        id: '3333333333',
        name: '王五',
        car: '浙A·99999',
        money: '壹万元整',
        item: '第三责任险',
        time: '2024.4.4',
      },
      {
        key: '10',
        id: '1111111111',
        name: '张三',
        car: '浙A·66666',
        money: '壹万元整',
        item: '交强险',
        time: '2012.2.2',
      },
      {
        key: 11,
        id: '2222222222',
        name: '李四',
        car: '浙A·88888',
        money: '伍万叁仟元整',
        item: '车辆损失险',
        time: '2023.3.3',
      },
      {
        key: 12,
        id: '3333333333',
        name: '王五',
        car: '浙A·99999',
        money: '壹万元整',
        item: '第三责任险',
        time: '2024.4.4',
      },
  ];
  
  const columns = [
    {
      title: '保单号',
      dataIndex: 'id',
    },
    {
      title: '投保人',
      dataIndex: 'name',
    },
    {
      title: '投保车辆',
      dataIndex: 'car',
    },
    {
      title: '投保金额',
      dataIndex: 'money',

    },
    {
        title: '投保项目',
        dataIndex: 'item',
    },  
    {
        title: '有效期',
        dataIndex: 'time',
    }
  ];

//保单列表
export class InsList extends Component {
    constructor(props){
        super(props);
    }
    data = dataSource;
    dataSearch=[];
    render() {
        this.dataSearch=[];
        if(this.props.value!=''){
          this.data.map(Item=>{
              if(Item.id==this.props.value)
                  this.dataSearch.push(Item)
          })
          return (
            <div>
                 <Table columns={columns} dataSource={this.dataSearch} pagination={false} bordered scroll={{x: '100%', y: 600 }} />
            </div>
          );
        }
        else{
          return (
            <div>
                 <Table columns={columns} dataSource={dataSource} pagination={false} bordered scroll={{x: '100%', y: 600 }} />
            </div>
        );
        }
    }
    
}
