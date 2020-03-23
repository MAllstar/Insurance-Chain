import React from "react"
import './Product.css'
import icon1 from './icon1.png'
import icon2 from './icon2.png'
import icon3 from './icon3.png'
import icon4 from './icon4.png'

export default class Product extends React.Component {

	render() {
		return (
			<div className="p-container">
				<div className="intro">
					<h2 className="title">
						七牛云，持续挖掘海量数据的无限价值
					</h2>
				</div>

				<div className="row">
					<div className="line">
						<div className="media">
							<div className="media-left">
								<img className="media-object" alt="海量存储"
								     src={icon1}/>
							</div>
							<div className="media-body">
								<h4 className="media-heading">
									海量存储
								</h4>
								<p className="">
									所有数据都有有效期，面对不断膨胀的数据领域，数据如何管理？七牛云完全自主知识产权的对象存储，已经过较严酷的考验，为 EB 规模的数据存储做好充分准备。
								</p>
								<p>
									<a className="icon icon-storage index-icons">对象存储</a>
									<a className="icon icon-datcol-sm-6abase index-icons">时序数据库</a>
								</p>
							</div>
						</div>

						<div className="media">
							<div className="media-left">
								<img className="media-object" alt="数据洞察"
								     src={icon2}/>
							</div>
							<div className="media-body">
								<h4 className="media-heading">
									数据洞察
								</h4>
								<p className="">
									让数据从负担变成资产的关键步骤是数据的价值挖掘。七牛云提供的大数据产品集和机器学习产品集可以帮助您以简单直观的方式理解自己的资产。
								</p>
								<p>
									<a className="icon icon-machine-learning index-icons">深度学习平台</a>
									<a className="icon icon-xspark index-icons">Spark 服务</a>
									<a className="icon icon-bigdata index-icons">大数据平台</a>
								</p>
							</div>
						</div>
					</div>

					<div className="line">
						<div className="media">
							<div className="media-left">
								<img className="media-object" alt="加速传输"
								     src={icon3}/>
							</div>
							<div className="media-body">
								<h4 className="media-heading">
									加速传输
								</h4>
								<p className="">
									七牛云独家的融合 CDN 结合了主流 CDN 和自建 CDN 节点的优势，让您能够在性能和成本之间得到一个良好的平衡。
								</p>
								<p>
									<a className="icon icon-dora index-icons">融合 CDN</a></p>
							</div>
						</div>

						<div className="media">
							<div className="media-left">
								<img className="media-object" alt="高性能计算"
								     src={icon4}/>
							</div>
							<div className="media-body">
								<h4 className="media-heading">
									高性能计算
								</h4>
								<p className="">
									为了能让数据流转，我们需要对数据进行高速处理。七牛云构建了基于容器的计算平台，并基于容器平台构建了功能丰富且开放性的智能媒体云平台。您只需考虑怎么处理数据，而无需考虑数据的规模和系统性能。
								</p>
								<p>
									<a className="icon icon-qvm index-icons">云主机</a>
									<a className="icon icon-container index-icons">容器云</a>
									<a className="icon icon-media index-icons">智能多媒体服务</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

}