import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import RoleList from "./list";
import RoleSave from "./save";

/**
 * 角色路由
 */
export default class Role extends Component {
    render() {
        return (
            <Switch>
                <Route path='/role/list' component={RoleList} exact/>
                <Route path='/role/save' component={RoleSave}/>
                <Redirect to='/role/list'/>
            </Switch>
        )
    }
}