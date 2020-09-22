import React, {Component}        from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import AdminList from "./list";
import AdminAdd  from "./add";
import AdminSave from "./save";

/**
 * 管理员路由
 */
export default class Index extends Component {
    render() {
        return (
            <Switch>
                <Route path='/administrator/list' component={AdminList} exact/>
                <Route path='/administrator/add' component={AdminAdd}/>
                <Route path='/administrator/save' component={AdminSave}/>
                <Redirect to='/administrator/list'/>
            </Switch>

        );
    }
}
