import React, {Component} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Login from './pages/login/login';
import Router from './pages/routes/router';


/**
 * 应用根组件
 */
export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                {/*只匹配一个*/}
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" component={Router}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}