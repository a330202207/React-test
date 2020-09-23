import React, {Component} from "react";
import {Card, Form, Icon, Input, Select, message, Switch, Button} from "antd";
import LinkButton                                                 from "../../components/linkButton";
import {getAllRole, saveAdmin}                                    from "../../api";

const Item = Form.Item;
const {Option} = Select;

/**
 * 保存管理员
 */
class saveUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 1,
            admin: this.props.location.state.admin,
            roleList: [],
        }
    };

    //提交
    handleSubmit = () => {
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {user_name, password, role_id, phone} = values;
                const id = this.state.admin.admin_info.id;
                const status = this.state.status;
                const adminInfo = {id, user_name, password, phone, role_id, status};
                console.log(adminInfo);
                const res = await saveAdmin(adminInfo);
                if (res.code === 200) {
                    message.success('操作成功!');
                    this.props.history.goBack()
                } else {
                    message.error('操作失败!');
                }
            }
        });
    };

    //获取全部角色
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
        this.getAllRole().then();
    };

    onStatusChange = (status) => {
        const newStatus = status === 1 ? 2 : 1;
        this.setState({
            status: newStatus
        });
    };

    //角色验证
    validateRole = (rule, value, callback) => {
        if (value === 0) {
            callback("角色必须选择!");
        } else {
            callback(); //验证通过
        }
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
                <span>编辑管理员</span>
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
                                initialValue: this.state.admin.admin_info.user_name,
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
                                initialValue: this.state.admin.admin_info.phone,
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
                                <Input.Password placeholder='请输入密码' style={{width: '100%'}}/>
                            )
                        }
                    </Item>
                    <Item
                        label="角色"
                        name="role_id"
                    >
                        {
                            getFieldDecorator('role_id', {
                                initialValue: this.state.admin.my_role.role_id,
                                rules: [
                                    {validator: this.validateRole},
                                ]
                            })(
                                <Select>
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
                            defaultChecked={this.state.admin.admin_info.status === 1}
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

export default Form.create()(saveUser);
