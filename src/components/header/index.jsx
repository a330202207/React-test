import React, {Component} from "react";
import {withRouter} from "react-router-dom"
import menuList from "../../config/menuConfig";
import "./index.less";
import dateUtils from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import {Modal} from 'antd';
import storageUtils from "../../utils/storageUtils";
import LinkButton from "../link-button";

/**
 * 头部导航组件
 */
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: dateUtils.formatDate(Date.now()),
            weather: '晴',
            username: 'admin',
            // username:memoryUtils.user.username,
        }
    }

    getTime = () => {
        //每隔1秒获取当前时间并更新
        setInterval(() => {
            const currentTime = dateUtils.formatDate(Date.now());
            this.setState({currentTime});
        });
    };

    //获取当前天气
    getWeather = async () => {
        // const weather = await reqWeather("北京");

        //更新状态
        // this.setState({weather});
    };

    //获取
    getTitle = () => {
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item => {
            if (item.menu_router === path) {
                title = item.title;
            } else if (item.children) {

                // 所有子item中查找匹配
                const cItem = item.children.find(cItem => path.indexOf(cItem.menu_router) === 0);

                //如果有值才匹配
                if (cItem) {
                    title = cItem.title;
                }
            }
        });
        return title;
    };

    logout = () => {
        Modal.confirm({
            title: '确定退出吗',
            content: 'Some descriptions',
            onOk: () => {

                //删除user数据
                storageUtils.removeUser();
                memoryUtils.user = {};

                this.props.history.replace('/login');
            },
        })
    };

    state = {
        currentTime: dateUtils.formatDate(Date.now()),        //当前时间
        weather: '晴',     //天气文本
    };

    /**
     * 第一次render()之后执行一次
     */
    componentDidMount() {
        this.getTime();
        this.getWeather();
    }

    /**
     * 当前组件卸载之前调用
     */
    componentWillUnmount() {
        //清除定时器
        clearInterval(this.intervalId)
    }

    render() {
        const title = this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{this.state.username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{this.state.currentTime} </span>
                        <span>{this.state.weather} </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);