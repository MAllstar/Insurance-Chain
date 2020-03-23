import React, { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
//引入线型图
import 'echarts/lib/chart/line';
// 引入提示框,标题,图例组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const cost = cookies.get('userName')=="msq"?[300,180,230,100,800,1120,50,880,230,300,300,400] : [3700,1080,2330,1100,500,120,560,780,630,700,900,780 ];
const offcost = cookies.get('userName')=="msq"?[320, 220, 150, 230, 1200, 800, 80, 880, 250, 250, 280, 450] : [3000,1000,2300,1100,600,300,460,700,600,750,850,780 ];

export class EquipChart extends Component {
    constructor (props) {
        super(props);
    }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: {
                 text: '受损设备维修价格',
                 textStyle: {

                 }
            },
            legend: {
                data: ['维修费用', '官方维修费用'],
            },
            toolbox: {
                show : true,
                feature : {
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            tooltip: {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: [
                {
                    name: '设备',
                    type: 'category',
                    axisLabel: {  
                        interval:0,  
                        rotate:40  
                     },  
                    data: ['发动机', '真空加力器', "转向灯", "制动总泵", "气门", "转向机", "散热器", "平衡块", "压缩机", "蜂鸣器", "刹车片", "报警器", ]
                }
            ],
            yAxis: [
                {
                    name: '费用',
                    type : 'value'
                }
            ],
            series: [{
                    name: '维修费用',
                    type: 'bar',    //柱状图
                    data: cookies.get('login')=='0'?[]:cost,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                },
                {
                    name: '官方维修费用',
                    type: 'bar',
                    data: offcost,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                }
            ]
        });
    }
    render() {
        return (
            <div id="main" style={{ width: 1000, height: 490, paddingTop: "20px"}}></div>
        );
    }
}  