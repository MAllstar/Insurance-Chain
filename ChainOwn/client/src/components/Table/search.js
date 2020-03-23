import React, { Component } from 'react';
import { Input } from 'antd';

const Search = Input.Search;

export class HisSearch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
          return(
            <div>
                <Search
                    placeholder="单号"
                    onSearch={value=>this.props.callback(value)}   //调用父组件函数传递参数
                    style={{paddingleft: 2, fontSize: 14, width: '100%'}}
                />
            </div>
        );
    }
}