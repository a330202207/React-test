import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Menu, Icon} from 'antd';
import menuList from "../../config/menuConfig";
import './index.less'

const {SubMenu} = Menu;


/**
 * 左侧导航组件
 */
class LeftNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuNodes: this.getMenuNodes(menuList),
        };
    }

    /**
     *  map() + 递归
     * @param menuList
     * @returns {*}
     */
    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname;
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.menu_router}>
                        <Link to={item.menu_router}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                //查找当前请求路径匹配的子菜单
                const cItem = item.children.find(cItem => path.indexOf(cItem.menu_router) === 0);
                //打开当前子菜单
                if (cItem) {
                    this.openKey = item.menu_router;
                }
                return (
                    <SubMenu
                        key={item.menu_router}
                        title={
                            <span>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }
        });
    };

    render() {
        let path = this.props.location.pathname;
        if (path.indexOf('/product') === 0) {
            path = '/product'
        }

        // console.log(path)
        // console.log(this.openKey)

        const openKey = this.openKey;
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <h1>后台</h1>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.state.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav);