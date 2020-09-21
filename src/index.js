import React            from "react";
import ReactDOM         from "react-dom";
import {Provider}       from "react-redux";
import {ConfigProvider} from "antd";
import zhCN             from "antd/es/locale/zh_CN";
import store            from "./redux/store";
import App              from "./App";

import moment from "moment";
import "moment/locale/zh-cn";

//设置全局中文
moment.locale("zh-cn");

// 将App组件标签渲染到index页面的div上
ReactDOM.render((
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <App/>
        </ConfigProvider>
    </Provider>
), document.getElementById("root"));
