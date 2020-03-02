import React, {Component} from "react";
import {Form, Icon, Input, Button, message} from 'antd';
import './login.less'
import {login} from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import {Redirect} from 'react-router-dom';

const Item = Form.Item;

/**
 * 登陆路由组件
 */
class Login extends Component {
    handleSubmit = (event) => {
        event.preventDefault();

        //对所有表单字段进行校验
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const res = await login(values.username, values.password);
                if (res.status === 0) {
                    message.success('登陆成功');

                    //保存user
                    const user = res.data;

                    //保存在内存中
                    memoryUtils.user = user;
                    storageUtils.saveUser(user);

                    this.props.histry.replace('/');
                } else {
                    message.error(res.msg);
                }
            } else {
                console.log('校验失败！');
            }
        });
    };

    //密码验证
    validatePassWord = (rule, value, callback) => {
        if (!value) {
            callback("请输入密码!");
        } else if (value.length < 4) {
            callback("请输入正确密码!");
        } else {
            callback(); //验证通过
        }
    };

    render() {
        //如果用户已经登陆，自动跳转到管理界面
        const user = memoryUtils.user;
        if (user && user._id) {
            return <Redirect to="/"/>
        }

        const form = this.props.form;
        const {getFieldDecorator} = form;
        return (
            <div className="login">
                <header className="login-header">
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    {required: true, message: '请输入用户名!'},
                                    {max: 12, message: '请输入正确用户名!'},
                                    {min: 4, message: '请输入正确用户名!'},
                                    {pattern: /^[a-zA-Z0-9_]+$/, message: '请输入正确用户名!'},
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="Username"
                                />,
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        validator: this.validatePassWord
                                    },
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        );
    }
}

const WrapLogin = Form.create()(Login);

export default WrapLogin;