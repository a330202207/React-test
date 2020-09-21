import React, {Component}          from "react";
import {Statistic, Row, Col, Icon} from "antd";
import {ArrowUpOutlined}           from "@ant-design/icons";
import "./index.less";
import BarChart                    from "../../components/echarts/barChart";

import CountUp from "react-countup";

/**
 * 首页路由
 */
export default class Index extends Component {
    state = {
        todayCount: 0,          //今天总数
        todayAmount: 0,         //今天总额增长比例
        todayAmountRate: 0,     //今天总额增长比例
        todayCountIncrease: 0,  //今天总额增长比例
    };

    render() {
        return (
            <div className='app-container'>
                <div className='panel-group-container'>
                    <Row gutter={16} className="panel-group">
                        <Col
                            span={12}
                            className="card-panel-col"
                        >
                            <div className="card-panel">
                                <div className="card-panel-description">
                                    <p className="card-panel-text">今日订单</p>
                                    <CountUp end={1423} start={0} className="card-panel-num"/>
                                    <span className="singleSpn">单</span>
                                    <span>
                                            <Statistic
                                                title="较昨日上涨"
                                                suffix="单"
                                                value={20}
                                                valueStyle={{color: "#cf1322"}}
                                                prefix={<ArrowUpOutlined/>}
                                            />
                                    </span>
                                </div>
                                <div className="card-panel-icon-wrapper">
                                    <Icon
                                        style={{fontSize: 55, color: "#f4516c"}}
                                        type='file-text'
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col
                            span={12}
                            className="card-panel-col"
                        >
                            <div className="card-panel">
                                <div className="card-panel-description">
                                    <p className="card-panel-text">今日流水</p>
                                    <span className="moneySymbol">￥:</span>
                                    <CountUp end={2000654} start={0} className="card-panel-num moneyNum"/>
                                    <span className="riseSpn">
                                            <Statistic
                                                title="较昨日上涨"
                                                value={10}
                                                precision={2}
                                                valueStyle={{color: "#cf1322"}}
                                                prefix={<ArrowUpOutlined/>}
                                            />
                                        </span>
                                </div>
                                <div className="card-panel-icon-wrapper">
                                    <Icon
                                        style={{fontSize: 55, color: "#36a3f7"}}
                                        type='pay-circle'
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <BarChart/>
            </div>
        );
    }
}
