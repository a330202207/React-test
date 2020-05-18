import React, {Component} from "react";
import {Form, Select, Input, InputNumber} from "antd";
import PropTypes from "prop-types";


const Item = Form.Item;
const Option = Select.Option;

class AddForm extends Component {

    constructor(props) {
        super(props);
        this.props.setForm(props.form)
    };

    static propTypes = {
        setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
        categoryList: PropTypes.array.isRequired, // 一级分类的数组
        parentId: PropTypes.number.isRequired, // 父分类的ID
    };

    render() {
        const {categoryList, parentId} = this.props;
        const {getFieldDecorator} = this.props.form;

        return (
            <Form>
                <Item
                    label="分类名称"
                    name="name"
                >
                    {
                        getFieldDecorator('name', {
                            initialValue: '',
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
                                <Option value={0} disabled={parentId !== 0 ?  true : false}>一级分类</Option>
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
                            initialValue: 0
                        })(
                            <InputNumber min={0} />
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(AddForm);