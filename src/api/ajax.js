import axios from 'axios'
import {message} from "antd";

/*
ajax模块
 */
export default function ajax(url, data = {}, type = 'GET') {
    return new Promise((resolve, reject) => {

        let promise;

        if (type === 'GET') {
            promise = axios.get(url, {
                params:data
            });
        } else {
            promise = axios.post(url, data);
        }

        promise.then(response => {
            resolve(response.data);
        }).catch(e => {
            console.log(e.message);
            message.error('请求失败，请稍后再试！');
        })
    });
}