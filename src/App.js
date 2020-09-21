import React, {Component}                       from "react";
import {connect}                                from "react-redux";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import Login  from "./pages/login/login";
import Router from "./routes/index";
import "moment/locale/zh-cn";

class App extends Component {
    render() {
        const {token} = this.props;
        return (
            <BrowserRouter>
                {/*只匹配其中一个*/}
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route
                        path="/"
                        component={() => {
                            if (!token) {
                                return <Redirect to="/login"/>;
                            } else {
                                return <Router/>;
                            }
                        }}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default connect((state) => state.user, {})(App);

