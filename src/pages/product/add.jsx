import React, {Component} from "react";
import {Card, Form, Icon, Input, List, Switch} from 'antd'
import LinkButton from '../../components/link-button';

const Item = List.Item;

class ProductAdd extends Component {

    render() {
        // console.log(this.props.form);
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
                <span>添加商品</span>
            </span>
        );
        return (
            <Card title={title} className='product-detail'>
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
                </Form>
            </Card>

        )
    }
}

export default Form.create()(ProductAdd);