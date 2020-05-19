import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Layout} from 'antd';
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import Home from "../home/home";
import List from "../category/category";
import Product from "../product/product";
import Menu from "../menu/menu";
import Role from "../role/role";
import Admin from "../admin/admin";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";

const {Footer, Sider, Content} = Layout;

/**
 * 管理路由组件
 */
export default class Router extends Component {
    render() {
        // const user = memoryUtils.user;
        // if (!user || !user.id) {
        //     //自动跳转登陆
        //     return <Redirect to='/login' />
        // }

        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{margin:20, background: "#fff"}}>
                        <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path="/category" component={List}/>
                            <Route path="/product" component={Product}/>
                            <Route path="/menu" component={Menu}/>
                            <Route path="/role" component={Role}/>
                            <Route path="/admin" component={Admin}/>
                            <Route path="/user" component={User}/>
                            <Route path="/charts/bar" component={Bar}/>
                            <Route path="/charts/line" component={Line}/>
                            <Route path="/charts/pie" component={Pie}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: "center", color: "#cccccc"}}>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}