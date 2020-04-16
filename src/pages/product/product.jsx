import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import ProductHome from "./home";
import ProductEdit from "./edit";
import ProductDetails from "./details";
import ProductAdd from "./add";
import './product.less';

/**
 * 商品路由
 */
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={ProductHome} exact/>
                <Route path='/product/details' component={ProductDetails}/>
                <Route path='/product/edit' component={ProductEdit}/>
                <Route path='/product/add' component={ProductAdd}/>
                <Redirect to='/product'/>
            </Switch>
        )
    }
}