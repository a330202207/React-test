import React from "react";
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import App from './App';
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";

import moment from 'moment';
import 'moment/locale/zh-cn';

//设置全局中文
moment.locale('zh-cn');

//读取local中user,保存到内存
const user = storageUtils.getUser();
memoryUtils.user = user;

//渲染
ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>
    ,
    document.getElementById('root')
);