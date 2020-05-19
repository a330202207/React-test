import React, {Component} from "react";
import {Form, Select, Input, InputNumber} from "antd";
import PropTypes from "prop-types";


const Item = Form.Item;
const Option = Select.Option;

class AddMenu extends Component {
    constructor(props) {
        super(props);
        this.props.setForm(props.form)
    };

    static propTypes = {
        setForm: PropTypes.func.isRequired,     // 用来传递form对象的函数
        menuList: PropTypes.array.isRequired,   // 一级菜单的数组
        parentId: PropTypes.number.isRequired,  // 父菜单的ID
    };

    render() {
        const {menuList, parentId} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <Form>
                <Item
                    label="菜单名称"
                    name="name"
                >
                    {
                        getFieldDecorator('name', {
                            initialValue: '',
                            rules: [
                                {required: true, message: '菜单名称必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入菜单名称'/>
                        )
                    }
                </Item>
                <Item
                    label="上级菜单"
                    name="parent_id"
                >
                    {
                        getFieldDecorator('parent_id', {
                            initialValue: parentId
                        })(
                            <Select>
                                <Option value={0} disabled={parentId !== 0}>一级菜单</Option>
                                {
                                    menuList.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)
                                }
                            </Select>
                        )
                    }
                </Item>
                <Item
                    label="菜单路由"
                    name="router"
                >
                    {
                        getFieldDecorator('menu_router', {
                            initialValue: ''
                        })(
                            <Input placeholder='请输入菜单路由'/>
                        )
                    }
                </Item>
                <Item
                    label="菜单排序"
                    name="order_by"
                >
                    {
                        getFieldDecorator('order_by', {
                            initialValue: 0
                        })(
                            <InputNumber min={0}/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(AddMenu);