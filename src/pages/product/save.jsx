import React, {PureComponent} from "react";
import {Card, Form, Icon, Input, InputNumber, Cascader, Switch, Button, message} from 'antd'
import PicturesWall                                     from './picturesWall'
import LinkButton                                       from '../../components/linkButton';
import {getCategories, addProduct, saveProduct, delImg} from "../../api";
import RichTextEditor from './rich-text-editor'


const Item = Form.Item;


class ProductSave extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            status: 1,
            delImg: [],
            imgUrl: '',
            product: this.props.location.state.product ?? '',
            isUpdate: !!this.props.location.state.product,
            categoryList: [],
        };
        this.img = React.createRef();           //图片容器
        this.editor = React.createRef();        //编辑器容器
    };

    initOptions = async (categoryList) => {
        const list = categoryList.map(c => ({
            value: c.id,
            label: c.name,
            isLeaf: false,
        }));

        if (this.state.product !== '') {
            const parent_id = this.state.product.category_info.parent_id;

            const subCategoryList = await this.getAsyncCategories(parent_id);
            const childOptions = subCategoryList.map(c => ({
                value: c.id,
                label: c.name,
                isLeaf: true
            }));

            // 找到当前商品对应的一级option对象
            const targetOption = list.find(option => option.value === parent_id);

            // 关联对应的一级option上
            targetOption.children = childOptions
        }

        this.setState({
            categoryList: list
        });
    };

    //异步获取分类列表
    getAsyncCategories = async (parentId) => {
        const res = await getCategories(parentId);
        if (res.code === 200) {
            const categoryList = res.data;
            if (parentId === 0) {
                this.initOptions(categoryList);
            } else {
                return categoryList;
            }
        }
    };

    //处理图片
    handleImg = (delImg) => {
        this.state.delImg.push(delImg)
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
                if (res.data.length > 0) {
                    let list = [];
                    res.data.forEach(el => {
                        list.push({
                            label: el.name,
                            value: el.id,
                            isLeaf: true
                        })
                    });
                    targetOption.children = list;
                } else {
                    //当前选中的分类没有二级分类
                    targetOption.isLeaf = false;
                }

                this.setState({
                    options: [...this.state.categoryList],
                });
            });
        }, 1000);
    };

    onStatusChange = (status) => {
        const newStatus = status === 1 ? -1 : 1;
        this.setState({
            status: newStatus
        });
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

    componentDidMount() {
        this.getAsyncCategories(0);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const categoryIds = [];
        if (this.state.product !== '') {
            const parentId = this.state.product.category_info.parent_id;

            if (parentId === 0) {
                categoryIds.push(parentId);
            } else {
                const categoryId = this.state.product.category_info.id;
                categoryIds.push(parentId);
                categoryIds.push(categoryId);
            }
        }
        const title = (
            <span>
                <LinkButton>
                  <Icon
                      type='arrow-left'
                      style={{marginRight: 10, fontSize: 20}}
                      onClick={() => this.props.history.goBack()}
                  />
                </LinkButton>
                <span>{this.state.product ? '编辑商品' : '添加商品'}</span>
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
                        label="商品分类"
                        name="category_id"
                    >
                        {getFieldDecorator('category_id', {
                            initialValue: categoryIds,
                            rules: [
                                {required: true, message: '商品分类必须输入'}
                            ]
                        })(
                            <Cascader
                                options={this.state.categoryList}
                                loadData={this.loadCategoryList.bind(this)}
                                placeholder="请选择分类"
                                notFoundContent={'Not Found'}
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
                    <Item
                        label="商品图片"
                        name="imgs"
                    >
                        <PicturesWall ref={this.img} imgs={this.state.product.imgs}
                                      handleImg={this.handleImg.bind(this)}/>
                    </Item>
                    <Item
                        label="商品详情"
                        name="details"
                        labelCol={{span: 2}} wrapperCol={{span: 20}}
                    >
                        <RichTextEditor ref={this.editor} details={this.state.product.details}/>
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.handleSubmit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductSave);
