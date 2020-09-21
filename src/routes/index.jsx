import React, {Component}        from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import LeftNav                   from "../components/leftNav";
import BreadCrumb                from "../components/breadCrumb";
import HeaderTop                 from "../components/header";
import {Layout}                  from "antd";
import routeList                 from "../config/routerMap";
import NotFound                  from "../pages/error/404";
import "./index.less";

const {Content, Sider} = Layout;

export default class Router extends Component {
    render() {
        return (
            <Layout style={{height: "100%"}}>
                {/*头部*/}
                <HeaderTop/>
                <Layout>
                    <Sider>
                        {/*左侧导航*/}
                        <LeftNav/>
                    </Sider>
                    <Layout>
                        {/*导航面包屑*/}
                        <BreadCrumb/>
                        {/*内容*/}
                        <Content style={{margin: 20, background: "#fff"}}>
                            <Switch>
                                <Redirect exact from='/' to='/home'/>
                                {
                                    routeList.map((route) => {
                                        return (
                                            <Route
                                                component={route.component}
                                                key={route.path}
                                                path={route.path}
                                            />
                                        );
                                    })
                                }
                                <Route component={NotFound}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

