import React, {Component}    from "react";
import {Modal, Layout}       from "antd";
import {connect}             from "react-redux";
import {logout, getUserInfo} from "../../redux/actions/index";

import "./index.less";

const {Header} = Layout;

/**
 * 头部导航组件
 */
class HeaderTop extends Component {

    handleLogout = (token) => {
        Modal.confirm({
            title: "退出",
            content: "确定要退出系统吗?",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
                this.props.logout(token);
            },
        });
    };

    render() {
        const {token, nickName} = this.props;
        return (
            <Header className="header">
                <div className="header-left">
                    <h1>管理后台</h1>
                </div>
                <div className="header-right">
                    <span>欢迎，{nickName}</span>
                    <button className="link-button" onClick={() => this.handleLogout(token)}>退出</button>
                </div>
            </Header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.user,
    };
};

export default connect(mapStateToProps, {logout, getUserInfo})(HeaderTop);
