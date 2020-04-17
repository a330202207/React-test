import React, {Component} from "react";
import {Input, Card, Icon, Form, List, Switch} from 'antd'
import LinkButton from '../../components/link-button';
import {BASE_IMG_URL} from '../../utils/constants'

const Item = Form.Item;


export class ProductEdit extends Component {
    render() {

        const {name, price, num, imgs, order_by, status, details, category_info} = this.props.location.state.product;

        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: {span: 2},  // 左侧label的宽度
            wrapperCol: {span: 8}, // 右侧包裹的宽度
        };

        console.log(this.props.form);
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
                <span>商品详情</span>
            </span>
        );

        return (
            <Card title={title} className='product-detail'>
                <Form {...formItemLayout}>
                    <Item label="商品名称">
                        {
                            getFieldDecorator('name', {
                                initialValue: name,
                                rules: [
                                    {required: true, message: '必须输入商品名称'}
                                ]
                            })(<Input placeholder='请输入商品名称'/>)
                        }
                    </Item>
                    <Item>
                        <span className="left">商品分类:</span>
                        <span>{category_info.name}</span>
                    </Item>
                    <Item label="商品价格">
                        {
                            getFieldDecorator('price', {
                                initialValue: price,
                                rules: [
                                    {required: true, message: '必须输入商品价格'},
                                    {validator: this.validatePrice}
                                ]
                            })(<Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)
                        }
                    </Item>
                    <Item label="商品库存">
                        {
                            getFieldDecorator('num', {
                                initialValue: num,
                                rules: [
                                    {required: true, message: '必须输入商品库存'},
                                    {validator: this.validatePrice}
                                ]
                            })(<Input type='number' placeholder='请输入商品库存'/>)
                        }
                    </Item>
                    <Item label="商品排序">
                        {
                            getFieldDecorator('order_by', {
                                initialValue: order_by,
                                rules: [
                                    {required: true, message: '必须输入商品排序'},
                                    {validator: this.validatePrice}
                                ]
                            })(<Input type='number' placeholder='请输入商品排序'/>)
                        }
                    </Item>
                    <Item label="商品排序">
                        {
                            getFieldDecorator('order_by', {
                                initialValue: order_by,
                                rules: [
                                    {required: true, message: '必须输入商品排序'},
                                    {validator: this.validatePrice}
                                ]
                            })(<Input type='number' placeholder='请输入商品排序'/>)
                        }
                    </Item>

                    <Item label="商品状态">
                        <Switch checkedChildren="上架" unCheckedChildren="下架" defaultChecked={status === 1}/>
                    </Item>
                    <Item>
                        <span className="left">商品图片:</span>
                        <span>
                            {
                                imgs.map(img => (
                                    <img
                                        key={img.id}
                                        src={BASE_IMG_URL + img.img}
                                        className="product-img"
                                        alt="img"
                                    />
                                ))
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={{__html: details}}/>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductEdit);