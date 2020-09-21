import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import UserList from "./list";
import UserAdd from "./add";
import UserSave from "./save";

/**
 * 菜单路由
 */
export default class Index extends Component {
    render() {
        return (
            <Switch>
                <Route path='/user/list' component={UserList} exact/>
                <Route path='/user/add' component={UserAdd}/>
                <Route path='/user/save' component={UserSave}/>
                <Redirect to='/user/list'/>
            </Switch>

        )
    }
}
