import React, { Component } from 'react'
import { Row, Col, Input, Button } from 'antd';
import './indexCont.css';

export class IndexCont extends Component {
    constructor(props) {
        super(props);
    }m
    render() {
        return (
            <div className="container">
				<div className="left img">
					<img src="img/index.jpg" alt=""/>
					<div className="img-bottom">
						<div>
							<ul className="list">
								<li style={{listStyle: "none"}}>
									<span className="list_type"><span class="title">交易ID:&ensp;</span>d11a1c3f308da02a55531f9ac3d2b36c845836410f173a05ecfaf2d8f8761ebf </span>
									<span className="list_type" title="朱*那"><span class="title"> &ensp;事故主体:&ensp;</span>朱*那</span>
									<span className="list_type"><span class="title">&ensp;调用所属:&ensp;</span>交通网</span>
									<span className="list_type"><span class="title">&ensp;入链时间:&ensp;</span>2019-05-20 13:40:29&ensp;</span>
									<a transactionIdName="d11a1c3f308da02a55531f9ac3d2b36c845836410f173a05ecfaf2d8f8761ebf">查看</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="right query">
					<Row>
						<Col span={18} style={{color: "#0071BC", fontSize: "28px", paddingTop: "40px"}}>当前区块链高度<br/><span style={{color: "white", fontSize: "20px"}}>3260324</span></Col>
						<Col span={6}></Col>
					</Row>
					<Row>
						<Col className="hash" >当前块哈希</Col>
					</Row>
					<Row>
						<Col className="bga small">a57fa3818c115e0a644effc8f877972411c7f132e2cc58d524bfb9b6ded0d6d4</Col>
					</Row>
					<Row>
						<Col className="hash">上一块哈希</Col>
					</Row>
					<Row>
						<Col className="bga small">37feff3f5e28c049eff88a8d944f5a8dca75f6cf51509b583c5b83fcc50e06f6</Col>
					</Row>
					<Row>
						<Col style={{background: "#0071BC", height: "6px", marginTop:"30px"}}></Col>
					</Row>
					<Row>
						<Col style={{margin:"30px"}}><Input placeholder="备案号" /></Col>
					</Row>
					<Row>
						<Col><Button>查询</Button></Col>
					</Row>
				</div>
            </div>
        )
    
    }
}