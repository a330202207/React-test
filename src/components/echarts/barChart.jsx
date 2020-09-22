import React, {Component} from "react";
import {Radio}            from "antd";
import ReactEcharts       from "echarts-for-react";

class BarChart extends Component {

    state = {
        selectType: "week",
        xAxisData: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        seriesData: [10, 100, 200, 300, 900, 3000, 9000],
    };

    getOption = () => {
        return {
            color: ["#1DA57A"],
            title: {
                text: "销售流水"
            },
            toolbox: {
                feature: {
                    magicType: {
                        type: ["line", "bar"]
                    }
                }
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: "shadow"        // 默认为直线，可选为：'line' | 'shadow'
                },
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: [
                {
                    type: "category",
                    data: this.state.xAxisData,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: "value"
                }
            ],
            series: [
                {
                    name: "流水",
                    type: "bar",
                    barWidth: "60%",
                    data: this.state.seriesData
                }
            ]
        };
    };

    onChangeType = (e) => {
        this.setState({
            selectType: e.target.value
        }, () => {
            if (e.target.value === "week") {
                this.setState({
                    xAxisData: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
                    seriesData: [10, 100, 20, 50, 150, 200, 300],
                });
            }

            if (e.target.value === "month") {
                this.setState({
                    xAxisData: ["1日", "2日", "3日", "4日", "5日", "6日", "7日", "8日", "9日", "10日", "11日", "12日", "13日", "14日", "15日", "16日", "17日", "18日", "19日", "20日", "21日", "22日", "23日", "24日", "25日", "26日", "27日", "28日", "29日", "30日"],
                    seriesData: ["1.00", "10.00", "100.00", "200.00", "300.00", "700.00", "900.00", "1200.00", "1700.00", "4000.00", "9000.00", "12500.00", "2320.00", "32140.00", "3320.00", "11022.00", "13203.00", "55320.00", "325320.00", "32043.00", "32560.00", "86102.00", "64000", "5420.00", "32577.00", "3210.00", "23210.00", "32320.00", "41320.00", "32240.00"],
                });
            }

            if (e.target.value === "year") {
                this.setState({
                    xAxisData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                    seriesData: ["100,00", "6000,00", "80000,00", "99464,00", "111101,00", "211101,00", "0,00", "471582.60", "165484,00", "321364,00", "32121,00", "47654,00"],
                });
            }
        });
    };

    render() {
        return (
            <div>
                <Radio.Group
                    defaultValue={this.state.selectType}
                    buttonStyle="solid"
                    onChange={e => this.onChangeType(e)}
                >
                    <Radio.Button value="week">本周</Radio.Button>
                    <Radio.Button value="month">本月</Radio.Button>
                    <Radio.Button value="year">本年</Radio.Button>
                </Radio.Group>
                <ReactEcharts
                    option={this.getOption()}
                    style={{
                        padding: 12,
                        backgroundColor: "#fff",
                        marginBottom: "25px",
                    }}
                />
            </div>
        );
    }
}

export default BarChart;
