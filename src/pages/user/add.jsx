import React, {Component} from "react";
import {Card, Form, Icon, Input, Select, message, Switch, Button} from "antd";
import LinkButton from "../../components/link-button";
import {getAllRole, addAdmin, saveAdmin} from "../../api";

const Item = Form.Item;
const {Option} = Select;

/**
 * 保存管理员
 */
class addUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 1,
            role_ids: [],
            roleList: [],
        }
    };

    //提交
    handleSubmit = () => {
        this.props.form.validateFields(async (err, values) => {
            console.log(values);
            if (!err) {
                const {user_name, password, phone} = values;

                const status = this.state.status;
                const role_ids = this.state.role_ids;
                const adminInfo = {user_name, password, phone, role_ids, status};
                console.log(adminInfo);


                // const res = await addAdmin(adminInfo);
                // if (res.code === 200) {
                //     message.success('操作成功!');
                //     this.props.history.goBack()
                // } else {
                //     message.error('操作失败!');
                // }
            }
        });
    };

    getAllRole = async () => {
        const res = await getAllRole();
        if (res.code === 200) {
            this.setState({
                roleList: res.data
            });
        } else {
            message.error('获取角色失败!');
        }
    };

    componentDidMount() {
        this.getAllRole();
    };

    onStatusChange = (status) => {
        const newStatus = status === 1 ? 2 : 1;
        this.setState({
            status: newStatus
        });
    };

    validateRole = (rule, value, callback) => {
        console.log(value)
        if (value === 0) {
            callback("角色必须选择!");
        } else {
            callback(); //验证通过
        }
    };

    selectRole = (value) => {
        this.state.role_ids = [];
        this.state.role_ids.push(value)
    };

    render() {

        const {getFieldDecorator} = this.props.form;
        const title = (
            <span>
                <LinkButton>
                  <Icon
                      type='arrow-left'
                      style={{marginRight: 10, fontSize: 20}}
                      onClick={() => this.props.history.goBack()}
                  />
                </LinkButton>
                <span>{this.state.admin ? '编辑管理员' : '添加管理员'}</span>
            </span>
        );

        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: {span: 2},  // 左侧label的宽度
            wrapperCol: {span: 8}, // 右侧包裹的宽度
        };
        return (
            <Card title={title} className='admin-detail'>
                <Form {...formItemLayout}>
                    <Item
                        label="用户名称"
                        name="user_name"
                    >
                        {
                            getFieldDecorator('user_name', {
                                initialValue: '',
                                rules: [
                                    {required: true, message: '用户名称必须输入'}
                                ]
                            })(<Input placeholder='请输入用户名称' style={{width: '100%'}}/>)
                        }
                    </Item>
                    <Item
                        label="电话"
                        name="phone"
                    >
                        {
                            getFieldDecorator('phone', {
                                initialValue: '',
                                rules: [
                                    {required: true, message: '电话必须输入'}
                                ]
                            })(
                                <Input placeholder='请输入电话' style={{width: '100%'}}/>
                            )
                        }
                    </Item>
                    <Item
                        label="用户密码"
                        name="password"
                    >
                        {
                            getFieldDecorator('password', {
                                initialValue: '',
                                rules: [
                                    {required: true, message: '密码必须输入'}
                                ]
                            })(
                                <Input placeholder='请输入密码' style={{width: '100%'}}/>
                            )
                        }
                    </Item>
                    <Item
                        label="角色"
                        name="role_id"
                    >
                        {
                            getFieldDecorator('roles_id', {
                                initialValue: 0,
                                rules: [
                                    {validator: this.validateRole},
                                ]
                            })(
                                <Select
                                    onChange={this.selectRole}
                                >
                                    <Option value={0} disabled>全部</Option>
                                    {
                                        this.state.roleList.map(role => <Option key={role.id}
                                                                                value={role.id}>{role.name}</Option>)
                                    }
                                </Select>
                            )
                        }
                    </Item>
                    <Item
                        label="用户状态"
                        name="status"
                    >
                        <Switch
                            checkedChildren="启用"
                            unCheckedChildren="禁用"
                            defaultChecked
                            onChange={() => this.onStatusChange(this.state.status)}
                        />
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.handleSubmit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(addUser);