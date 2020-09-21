import React, {Component}    from "react";
import {NavLink, withRouter} from "react-router-dom";
import {connect}             from "react-redux";

import {Menu}       from "antd";
import {Scrollbars} from "react-custom-scrollbars";
import menuList     from "../../config/menuConfig";
import "./index.less";
// import {createFromIconfontCN} from "@ant-design/icons";

// const IconFont = createFromIconfontCN({
//     scriptUrl: "//at.alicdn.com/t/font_1919651_mlvt6z1xocn.js",
// });

const {SubMenu} = Menu;

/**
 * 左侧导航的组件
 */
class LeftNav extends Component {

    state = {
        menuNodes: null,
        openKeys: [],
        selectedKeys: [],
    };

    hasAuth = (item) => {
        const {key, isPublic} = item;
        const menus = this.props.userMenu;
        const username = this.props.userRole;

        //如果当前用户是admin，并且当前item是公开的
        if (username === "admin" || isPublic || menus.includes(key)) {
            return true;
        } else if (item.children) { // 如果当前用户有此item的某个子item的权限
            return !!item.children.find(child => menus.includes(child.key));
        }
        return false;
    };

    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname;

        return menuList.map(item => {
            // if (this.hasAuth(item)) {
                if (!item.children || item.children.length === 0) {
                    if (path === 'home') {
                        const menuHigh = {
                            openKeys: 'home',
                            selectedKeys: 'home',
                        };
                        this.selectMenuHigh(menuHigh);
                    }

                    return (
                        <Menu.Item key={item.key}>
                            <NavLink to={item.key}>
                                {/*<IconFont type={item.icon}/>*/}
                                <span>{item.title}</span>
                            </NavLink>
                        </Menu.Item>
                    );
                } else {
                    if (item.hidden) return false;
                    let noHiddenRouter = [];
                    let hiddenRouter = [];

                    item.children.map(v => {
                        //如果二级分类隐藏
                        if (v.hidden) {
                            hiddenRouter.push(v);
                        } else {
                            if (v.key.split("/").slice(0, 2).join("/") === path.split("/").slice(0, 2).join("/")) {
                                const menuHigh = {
                                    openKeys: item.key,
                                    selectedKeys: v.key,
                                };
                                this.selectMenuHigh(menuHigh);
                            }
                            noHiddenRouter.push(v);
                        }
                        return true;
                    });

                    //当子路由hidden设置为true，该路由hidden设置为false或者没有hidden时，则显示该路由
                    if (hiddenRouter.length > 0) {
                        return (
                            <Menu.Item key={item.key}>
                                <NavLink to={item.key}>
                                    <span>{item.title}</span>
                                </NavLink>
                            </Menu.Item>
                        );
                    }
                    //当子路由hidden设置为false或没有hidden时，则显示当前路由与下拉子路由
                    if (noHiddenRouter.length > 0) {
                        return (
                            <SubMenu
                                key={item.key}
                                title={<span>{item.title}</span>}>
                                {
                                    this.getMenuNodes(item.children)
                                }
                            </SubMenu>
                        );
                    }
                }
            // }
            return true;
        });
    };

    selectMenu = ({key, keyPath}) => {
        const menuHigh = {
            selectedKeys: key,
            openKeys: keyPath[keyPath.length - 1],
        };
        this.selectMenuHigh(menuHigh);
    };

    //菜单选中
    selectMenuHigh = ({selectedKeys, openKeys}) => {
        this.setState({
            selectedKeys: selectedKeys,
            openKeys: openKeys,
        });
    };

    componentWillMount() {
        this.setState({
            menuNodes: this.getMenuNodes(menuList)
        });
    }

    render() {
        // 得到需要打开菜单项的key
        const {openKeys, selectedKeys} = this.state;
        return (
            <div className="left-nav">
                <Scrollbars
                    autoHeight
                    autoHeightMin={100}
                    autoHeightMax={900}
                >
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={[selectedKeys]}
                        onClick={this.selectMenu}
                        defaultOpenKeys={[openKeys]}
                    >
                        {
                            this.state.menuNodes
                        }
                    </Menu>
                </Scrollbars>
            </div>
        );
    }
}

export default connect((state) => state.user)(withRouter(LeftNav));
