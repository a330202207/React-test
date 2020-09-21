import React, {Component} from "react";
import {Card, Form, Icon, Input, InputNumber, message, Switch} from "antd";
import LinkButton                                              from "../../components/linkButton";
import {addProduct, delImg, saveProduct}                       from "../../api";

const Item = Form.Item;

/**
 * 保存管理员
 */
class saveAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.location.state.admin ?? '',
            isUpdate: !!this.props.location.state.admin,
        }
    };

    //提交
    handleSubmit = () => {
        this.props.form.validateFields(async (err, values) => {
            console.log(err);
            console.log(values);
            if (!err) {
                const {name, price, order_by, num} = values;

                const category_id = values.category_id[values.category_id.length - 1];
                const status = this.state.status;
                const imgs = this.img.current.getImgs();
                const details = this.editor.current.getDetail();
                const product = {name, order_by, price, imgs, status, details, category_id, num};
                let res;

                if (this.state.isUpdate) {
                    product.id = this.state.product.id;

                    res = await saveProduct(product);
                    if (this.state.delImg.length !== 0) {
                        const imgRes = await delImg(this.state.delImg);
                        if (imgRes.code !== 200) {
                            console.log("删除图片失败！")
                        }
                    }
                } else {
                    console.log(product);
                    res = await addProduct(product);
                    console.log(res);
                }

                if (res.code === 200) {
                    message.success('操作成功!');
                    this.props.history.goBack()
                } else {
                    message.error('操作失败!');
                }
            }
        });
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
            <Card title={title} className='product-detail'>
                <Form {...formItemLayout}>
                    <Item
                        label="商品名称"
                        name="name"
                    >
                        {
                            getFieldDecorator('name', {
                                initialValue: this.state.product.name,
                                rules: [
                                    {required: true, message: '商品名称必须输入'}
                                ]
                            })(<Input placeholder='请输入商品名称' style={{width: '100%'}}/>)
                        }
                    </Item>
                    <Item
                        label="商品价格"
                        name="price"
                    >
                        {
                            getFieldDecorator('price', {
                                initialValue: this.state.product.price,
                                rules: [
                                    {required: true, message: '商品价格必须输入'}
                                ]
                            })(
                                <InputNumber
                                    placeholder='请输入商品价格'
                                    min={0}
                                    max={9999999}
                                    step={1.0}
                                    style={{width: '100%'}}
                                />
                            )
                        }
                    </Item>
                    <Item
                        label="商品库存"
                        name="num"
                    >
                        {
                            getFieldDecorator('num', {
                                initialValue: this.state.product.num,
                                rules: [
                                    {required: true, message: '商品库存必须输入'}
                                ]
                            })(
                                <InputNumber
                                    placeholder='请输入商品库存'
                                    min={1}
                                    max={9999999}
                                    step={5}
                                    style={{width: '100%'}}
                                />
                            )
                        }
                    </Item>
                    <Item
                        label="商品排序"
                        name="order_by"
                    >
                        {
                            getFieldDecorator('order_by', {
                                initialValue: this.state.product.order_by,
                                rules: [
                                    {required: true, message: '商品排序必须输入'}
                                ]
                            })(
                                <InputNumber
                                    placeholder='请输入商品排序'
                                    min={1}
                                    max={9999999}
                                    step={1}
                                    style={{width: '100%'}}
                                />
                            )
                        }
                    </Item>
                    <Item
                        label="商品状态"
                        name="status"
                    >
                        <Switch
                            checkedChildren="上架"
                            unCheckedChildren="下架"
                            defaultChecked={this.state.product.state !== 1}
                            // checked={}
                            onChange={() => this.onStatusChange(this.state.status)}
                        />
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(saveAdmin);
