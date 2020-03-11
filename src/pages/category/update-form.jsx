import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Form, Input, InputNumber, Select} from "antd";


const Item = Form.Item;
const Option = Select.Option;

class UpdateForm extends Component {

    constructor(props) {
        super(props);
        this.props.setForm(props.form)
    };

    static propTypes = {
        categoryInfo: PropTypes.object.isRequired,
        categoryList: PropTypes.array.isRequired, // 一级分类的数组
        setForm: PropTypes.func.isRequired
    };

    render() {
        const name = this.props.categoryInfo.name;
        const orderBy = this.props.categoryInfo.order_by;
        const parentId = this.props.categoryInfo.parent_id;
        const categoryList = this.props.categoryList;
        const {getFieldDecorator} = this.props.form;

        return (
            <Form>
                <Item
                    label="分类名称"
                    name="name"
                >
                    {
                        getFieldDecorator('name', {
                            initialValue: name,
                            rules: [
                                {required: true, message: '分类名称必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }
                </Item>
                <Item
                    label="上级分类"
                    name="parent_id"
                >
                    {
                        getFieldDecorator('parent_id', {
                            initialValue: parentId
                        })(
                            <Select>
                                <Option value={0}>一级分类</Option>
                                {
                                    categoryList.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)
                                }
                            </Select>
                        )
                    }
                </Item>
                <Item
                    label="排序"
                    name="order_by"
                >
                    {
                        getFieldDecorator('order_by', {
                            initialValue: orderBy
                        })(
                            <InputNumber min={0} />
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateForm);