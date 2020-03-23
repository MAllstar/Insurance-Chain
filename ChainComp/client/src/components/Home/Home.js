import React, { Component } from 'react';
import {Layout, Menu, Breadcrumb, Button, message, Dropdown} from 'antd'
import Cookies from 'universal-cookie';
import { Icon } from 'antd';
import { Owner } from '../Owner/owner';
import {InsCompany} from '../InsCompany/insCompany';
import {Redirect} from "react-router-dom"


const { Header, Content, Footer } = Layout;
function callback(key) {
    console.log(key);
}

export default class Home extends Component {
	state = {
		login: false,
		userName: ''
	}

	componentWillMount() {
		const cookies = new Cookies();

		if (cookies.get('userName') === undefined) {
			cookies.set('login', '0', { path: '/' });
			cookies.set('userName', null, { path: '/' });
			cookies.set('addr', null, { path: '/' });
			cookies.set('number', 0, { path: '/' });
		}

		this.setState({
			login: cookies.get('login') !== '0',
			userName: cookies.get('userName'),
			
		}, () => {
			console.log(this.state)
		})
	}

	handleLogin = () => {
		console.log("点击了登陆按钮");
		const cookies = new Cookies();

		if (this.state.login) {
			cookies.set('login', '0', { path: '/' });
			cookies.set('number',null, { path: '/' });
			message.success('登出成功');
			
		} else {
			cookies.set('login', '1', { path: '/' });
		}
		/*
		if(this.state.login == 1)
			$(document).ready(function(){$.ajax({url:"http://localhost:3007/",type: "POST",data: {attr: cookies.get('addr'),dat: 2017},success:function(result){console.log(result)}});});
		*/

			
		this.setState(prev => ({
			login: !prev.login
			}))
	}

	render() {
		return (
            <div style={{width: "100%", height: "100%", overflow: "auto"}}>
                <header style={{backgroundColor: "#20232a", height: "70px"}}>
                    <div style={{float: "left" ,paddingTop: "12px",  width: "50%", paddingLeft: "10%"}}>
                        <h1 style={{fontSize: "30px", color: "white"}}> <Icon type="slack-square" /><b>基于区块链的车辆事故理赔系统</b></h1>
                    </div>
                    <div style={{float: "right" , paddingTop: "18px", width: "50%" ,height: 70, paddingLeft: "30%"}}>
                        {this.state.login ? <span style={{color: "white"}}>{'欢迎登陆, ' + this.state.userName + '  '}</span> : ''}
							<Button type="primary" size={"default"} onClick={this.handleLogin}>
								{this.state.login ?
									'退出登录'
								    :
									<a href={'#/login'}>登陆</a>
								}
							</Button>
							<a href="http://localhost:3000/index.html"> 返回首页>></a>
							
                    </div>
                </header>
                <div style={{width: "100%", height: 787}}>
                    <InsCompany />
                </div>
                <footer style={{width: "100%", height: "50px", background: "grey", position: "relative", bottom: 0,clear: "both"}}>
                    <p style={{color: "white",position: "absolute",left: "45%",bottom: "5%"}}>基于区块链的车辆事故理赔系统</p>
                </footer>
            </div>
        )
	}
}