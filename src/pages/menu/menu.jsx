import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import MenuList from "./list";
import MenuSave from "./save";

/**
 * 菜单路由
 */
export default class Menu extends Component {
    render() {
        return (
            <Switch>
                <Route path='/menu/list' component={MenuList} exact/>
                <Route path='/menu/save' component={MenuSave}/>
                <Redirect to='/menu/list'/>
            </Switch>
        )
    }
}