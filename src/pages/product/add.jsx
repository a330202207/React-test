import React, {PureComponent} from "react";
import {Card, Form, Icon, Input, InputNumber, Cascader, Switch} from 'antd'
import PicturesWall from './picturesWall'
import LinkButton from '../../components/link-button';
import {getCategories} from "../../api";


const Item = Form.Item;
const {TextArea} = Input;


class ProductAdd extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
        }
    };

    //获取分类列表
    getCategories = (parentId) => {
        getCategories(parentId).then((res) => {
            let list = [];
            res.data.forEach(el => {
                list.push({
                    label: el.name,
                    value: el.id,
                    isLeaf: false
                })
            });
            this.setState({
                categoryList: list
            });
        });
    };

    //给父组件通知值变化
    onCategoryChange = (value, selectedOptions) => {
        // this.props.onChange(value);
    };

    //加载二级分类列表
    loadCategoryList = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        const parentId = targetOption.value;

        // 延迟加载
        setTimeout(() => {
            targetOption.loading = false;
            getCategories(parentId).then((res) => {
                let list = [];
                res.data.forEach(el => {
                    list.push({
                        label: el.name,
                        value: el.id,
                        isLeaf: true
                    })
                });
                targetOption.children = list;
                this.setState({
                    options: [...this.state.categoryList],
                });
            });
        }, 1000);
    };

    componentDidMount() {
        this.getCategories(0);
    }

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
                <span>添加商品</span>
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
                                initialValue: '',
                                rules: [
                                    {required: true, message: '必须输入商品名称'}
                                ]
                            })(<Input placeholder='请输入商品名称' style={{width: '100%'}}/>)
                        }
                    </Item>
                    <Item
                        label="商品分类"
                        name="category"
                    >
                        {getFieldDecorator('minProduct',)
                        (
                            <Cascader
                                options={this.state.categoryList}
                                loadData={this.loadCategoryList.bind(this)}
                                placeholder="请选择分类"
                                notFoundContent={'Not Found'}
                                onChange={this.onCategoryChange.bind(this)}
                                style={{width: '100%'}}
                                changeOnSelect
                            />
                        )}
                    </Item>
                    <Item
                        label="商品价格"
                        name="price"
                    >
                        {
                            getFieldDecorator('price', {
                                initialValue: '',
                                rules: [
                                    {required: true, message: '商品价格必须输入'}
                                ]
                            })(
                                <InputNumber
                                    placeholder='请输入商品价格'
                                    min={0}
                                    max={10}
                                    step={0.1}
                                    style={{width: '100%'}}
                                />
                            )
                        }
                    </Item>
                    <Item
                        label="商品库存"
                        name="stock"
                    >
                        {
                            getFieldDecorator('stock', {
                                initialValue: '',
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
                            getFieldDecorator('stock', {
                                initialValue: '',
                                rules: [
                                    {required: true, message: '商品排序必须输入'}
                                ]
                            })(
                                <InputNumber
                                    placeholder='请输入商品库存'
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
                        <Switch checkedChildren="上架" unCheckedChildren="下架" defaultChecked/>
                    </Item>

                    <Item
                        label="商品图片"
                        name="img"
                    >
                        <PicturesWall />
                    </Item>
                    <Item
                        label="商品详情"
                        name="details"
                    >
                        {
                            getFieldDecorator('name', {
                                initialValue: '',
                                rules: [
                                    {required: true, message: '必须输入商品名称'}
                                ]
                            })(<TextArea placeholder='请输入商品名称' rows={4} style={{width: '100%'}}/>)
                        }
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductAdd);