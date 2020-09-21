import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import CategoryList from "./list";
import CategorySave from "./save";

/**
 * 菜单路由
 */
export default class Index extends Component {
    render() {
        return (
            <Switch>
                <Route path='/category/list' component={CategoryList} exact/>
                <Route path='/category/save' component={CategorySave}/>
                <Redirect to='/category/list'/>
            </Switch>
        )
    }
}
