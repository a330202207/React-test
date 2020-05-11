import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import ProductList from "./list";
import ProductEdit from "./edit";
import ProductDetails from "./details";
import ProductSave from "./save";
import './product.less';

/**
 * 商品路由
 */
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product/list' component={ProductList} exact/>
                <Route path='/product/details' component={ProductDetails}/>
                <Route path='/product/edit' component={ProductEdit}/>
                <Route path='/product/save' component={ProductSave}/>
                <Redirect to='/product'/>
            </Switch>
        )
    }
}