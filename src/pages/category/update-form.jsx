import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Form, Select, Input} from "antd";


const Item = Form.Item;
const Option = Select.Option;

class UpdateForm extends Component {
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            setForm: this.props.form
        }
    };

    render() {
        const {categoryName} = this.props;
        const {getFieldDecorator} = this.props.form;
        return <Form>
            <Item>
                {
                    getFieldDecorator('parentId', {
                        initialValue: "0"
                    })(
                        <Select>
                            <Option value='0'>一级分类</Option>
                            <Option value='1'>图书</Option>
                            <Option value='2'>电脑</Option>
                        </Select>
                    )
                }
            </Item>
            <Item>
                {
                    getFieldDecorator('categoryName', {
                        initialValue: categoryName,
                        rules: [
                            {required: true, message: '分类名称必须输入'}
                        ]
                    })(
                        <Input placeholder='请输入分类名称'/>
                    )
                }
            </Item>
        </Form>
    }
}

export default Form.create()(UpdateForm);