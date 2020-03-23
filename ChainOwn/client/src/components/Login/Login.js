import React from 'react';
import {
	Form, Icon, Input, Button, Checkbox, Typography, message
} from 'antd'
import './Login.css'
import indexImg from '../../img/indexLogin.jpg'
import Cookies from 'universal-cookie';
import {Redirect} from "react-router-dom";
import getWeb3 from "../../utils/getWeb3";
import PropTypes from "prop-types";
import $ from 'jquery';

const cookies = new Cookies();

const { Title } = Typography;


class NormalLoginForm extends React.Component {
	constructor(props,context){
		super(props,context);   //调用父类构造函数
	}
	 // 子组件声明自己需要使用 context
	 static contextTypes = {
		blockId: PropTypes.string,
		accounts: PropTypes.object,
		callback: PropTypes.func
	  }
	state = {
		login: false, //0
	}

	componentWillMount() {
		const cookies = new Cookies();
		cookies.set('login', '0', { path: '/' });
		cookies.set('userName', null, { path: '/' });  //这里null是字符串,相当于'null'
		cookies.set('addr', null, { path: '/' });
		cookies.set('number', null, { path: '/' });
		cookies.set('num',null, {path: '/'});
	}

	componentDidMount(){
		let canvas = document.createElement('canvas');
		canvas.setAttribute("id", "canvas");
		canvas.width ='500';
		canvas.height ='500';
		canvas.style.position ='absolute';
		canvas.style.top = 0;
		canvas.style.left = 0;
		canvas.style.zIndex = -1;
		canvas.style.pointerEvent = 'none';
		document.body.appendChild(canvas);
		console.log('did');
		this.methods();
		

	}

	
	methods = () =>{
		document.addEventListener('touchmove', function (e) {
			e.preventDefault()
		})
		var c = document.getElementsByTagName('canvas')[0],
			x = c.getContext('2d'),
			pr = window.devicePixelRatio || 1,
			w = window.innerWidth,
			h = window.innerHeight,
			f = 90,
			q,
			m = Math,
			r = 0,
			u = m.PI*2,
			v = m.cos,
			z = m.random;
		console.log('c',c);

		c.width = w*pr
		c.height = h*pr
		x.scale(pr, pr)
		x.globalAlpha = 0.6
		function i(){
			x.clearRect(0,0,w,h)
			q=[{x:0,y:h*.7+f},{x:0,y:h*.7-f}]
			while(q[1].x<w+f) d(q[0], q[1])
		}
		function d(i,j){
			x.beginPath()
			x.moveTo(i.x, i.y)
			x.lineTo(j.x, j.y)
			var k = j.x + (z()*2-0.25)*f,
				n = y(j.y)
			x.lineTo(k, n)
			x.closePath()
			r-=u/-50
			x.fillStyle = '#'+(v(r)*127+128<<16 | v(r+u/3)*127+128<<8 | v(r+u/3*2)*127+128).toString(16)
			x.fill()
			q[0] = q[1]
			q[1] = {x:k,y:n}
		}
		function y(p){
			var t = p + (z()*2-1.1)*f
			return (t>h||t<0) ? y(p) : t
		}
		document.onclick = i
		document.ontouchstart = i
		i()
	};

	handleSubmit = async(e) => {
		
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			console.log('Received values of form: ', values);
			if (!err && values.userName === 'admin' && values.password === '123456') {
				const cookies = new Cookies();
				if (values.remember) {
					cookies.set('login', '1', { path: '/' });
					cookies.set('userName', values.userName, { path: '/' });
					cookies.set('addr', 'insuranceCompany', { path: '/' });
					cookies.set('number', '0xeFb5256959127518F4D317a4DD35f215ac947a45', { path: '/' });
					cookies.set('num',0, {path: '/'});
					
				}
				if(cookies.get('addr')!='applicant'){
					alert('该账号身份不符合，无法登陆申请理赔界面！');
					// 跳转主页
					return <Redirect to="/login" />
				}
				if(cookies.get('number')!=this.context.accounts[0]){
					alert('该账号钱包不符合，无法登陆申请理赔界面！');
					// 跳转主页
					console.log(this.context.accounts[0]);
					return <Redirect to="/login" />
				}
				
				
				message.success('登陆成功');

				this.setState( prev => ({
					login: !prev.login
				}), () => {
					console.log(this.state.login);
				})
			} 

			else if(!err && values.userName === '20172122' && values.password === '123456'){
				const cookies = new Cookies();
				if (values.remember) {
					cookies.set('login', '1', { path: '/' });
					cookies.set('userName', values.userName, { path: '/' });
					cookies.set('addr', 'applicant', { path: '/' });
					cookies.set('number', '0x5140580EBC290e3879044D3A79aD497AafF96671', { path: '/' });
					cookies.set('num',1, {path: '/'});
					
				}
				if(cookies.get('addr')!='applicant'){
					alert('该账号身份不符合，无法登陆申请理赔界面！');
					// 跳转主页
					return <Redirect to="/login" />
				}
				if(cookies.get('number')!=this.context.accounts[0]){
					console.log(this.context.accounts[0])
					alert('该账号钱包不符合，无法登陆申请理赔界面！');
					// 跳转主页
					return <Redirect to="/login" />
				}
				message.success('登陆成功');

				this.setState( prev => ({
					login: !prev.login
				}), () => {
					console.log(this.state.login);
				})

			}

			else if(!err && values.userName === 'msq' && values.password === '123456'){
				const cookies = new Cookies();
				if (values.remember) {
					cookies.set('login', '1', { path: '/' });
					cookies.set('userName', values.userName, { path: '/' });
					cookies.set('addr', 'applicant', { path: '/' });
					cookies.set('number', '0xCC867CA8db380Cc13b062152214832abfb2E3aFc', { path: '/' });
					cookies.set('num',2, {path: '/'});
					
				}
				if(cookies.get('addr')!='applicant'){
					alert('该账号身份不符合，无法登陆申请理赔界面！');
					// 跳转主页
					return <Redirect to="/login" />
				}
				if(cookies.get('number')!=this.context.accounts[0]){
					alert('该账号钱包不符合，无法登陆申请理赔界面！');
					// 跳转主页
					return <Redirect to="/login" />
				}
				message.success('登陆成功');

				this.setState( prev => ({
					login: !prev.login
				}),() => {
					console.log(this.state.login);
				})

			}
			
			else {
				message.error('登陆失败');
			}
		});
	}

	render() {
		if ( this.state.login ) {
			// 跳转主页
			return <Redirect to="/" />
		}

		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<div className="Lcontainer">
					<div className="logoImg">
						<img src={indexImg} alt=""/>
					</div>

					<div className="login">
						<a style={{paddingLeft: "90%"}} href="http://localhost:3000/"><b>退出</b></a>
						<Title level={3}>理赔申请  登陆</Title>
			
						<Form onSubmit={this.handleSubmit} className="login-form">
							<Form.Item>
								{getFieldDecorator('userName', {
									rules: [{ required: true, message: 'Please input your username!' }],
								})(
									<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名: 请输入admin" />
								)}
							</Form.Item>
							<Form.Item>
								{getFieldDecorator('password', {
									rules: [{ required: true, message: 'Please input your Password!' }],
								})(
									<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码：请输入123456" />
								)}
							</Form.Item>
							<Form.Item>
								{getFieldDecorator('remember', {
									valuePropName: 'checked',
									initialValue: true,
								})(
									<Checkbox>记住我</Checkbox>
								)}
								<a className="login-form-forgot" href="">忘记密码？</a>
								<Button type="primary" htmlType="submit" className="login-form-button">
									登陆
								</Button>
							</Form.Item>
						</Form>
					</div>

				</div>
			</div>
		);
	}
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Login;