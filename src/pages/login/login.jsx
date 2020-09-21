import React, {useState}                          from "react";
import {Redirect}                                 from "react-router-dom";
import {Form, Icon, Input, Button, message, Spin} from "antd";
import {connect}                                  from "react-redux";
import "./login.less";
import {login, getUserInfo}                       from "../../redux/actions/index";

const Item = Form.Item;

const Login = (props) => {
    const {form, token, login, getUserInfo, nickName} = props;
    const {getFieldDecorator} = form;
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        // 阻止事件的默认行为
        event.preventDefault();

        // 对所有表单字段进行检验
        form.validateFields(async (err, values) => {
            // 检验成功
            if (!err) {
                const {username, password} = values;
                // 登录完成后 发送请求 调用接口获取用户信息
                setLoading(true);
                const res = await login(username, password);
                if (res.code === 200) {
                    message.success("登录成功");

                    //获取用户信息
                    await getUserInfo();
                } else {
                    setLoading(false);
                    message.error(res.message);
                }
            } else {
                console.log("检验失败!");
            }
        });
    };
    console.log(token)
    console.log(nickName)
    if (token && nickName) {
        return <Redirect to="/home"/>;
    }

    return (
        <div className="login">
            <header className="login-header">
                <h1>React后台</h1>
            </header>
            <Form onSubmit={handleSubmit} className="login-form">
                <section className="login-content">
                    <Spin spinning={loading} tip="登录中...">
                        <h2>用户登录</h2>
                        <Item>
                            {getFieldDecorator("username", {
                                rules: [
                                    {required: true, message: "请输入用户名!"},
                                    {max: 12, message: "请输入正确用户名!"},
                                    {min: 1, message: "请输入正确用户名!"},
                                    {pattern: /^[a-zA-Z0-9_]+$/, message: "请输入正确用户名!"},
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>}
                                    placeholder="用户名"
                                />,
                            )}
                        </Item>
                        <Item>
                            {getFieldDecorator("password", {
                                rules: [
                                    {required: true, message: "请输入正确密码!"},
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Item>
                    </Spin>
                </section>
            </Form>
        </div>
    );
};

const WrapLogin = Form.create()(Login);

export default connect((state) => state.user, {login, getUserInfo})(WrapLogin);
