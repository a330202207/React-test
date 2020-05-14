import React, {Component} from "react";
import {Button, Card, Icon, message, Table, Modal} from 'antd';
import LinkButton from "../../components/link-button";
import {getCategoryList, addCategory, updateCategory, delCategory} from "../../api";
import {PAGE_SIZE} from '../../utils/constants'
import AddForm from "./add-form";
import UpdateForm from "./update-form";

/**
 * 分类路由路由
 */
export default class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parentId: 0,
            total: 0,
            parentName: '',
            categoryList: [],
            subCategoryList: [],
            loading: false,                 //是否正在获取数据
            columns: this.initColumns(),
            showStatus: 0,                  //是否显示确认框，0：都不显示，1：显示添加，2：显示更新
        }
    };

    /**
     * 初始化Table所有列数组
     * @returns {[{dataIndex: string, title: string, key: string}, {width: number, title: string, render: (function(*=): *)}]}
     */
    initColumns = () => {
        return [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '排序',
                dataIndex: 'order_by',
                key: 'order_by',
            },
            {
                title: '操作',
                width: 300,
                render: (category) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdate(category)}>修改</LinkButton>
                        {this.state.parentId === 0 ? <LinkButton onClick={() => {
                            this.showSubCategoryList(category)
                        }}>查看</LinkButton> : null}
                        <LinkButton onClick={() => this.delCategory(category.id)}>删除</LinkButton>
                    </span>
                )
            },
        ];
    };

    /**
     *  异步获取分类列表
     * @returns {Promise<void>}
     */
    getCategoryList = async (page = 1) => {
        this.page = page;

        //loading
        this.setState({loading: true});

        const parentId = this.state.parentId;

        const res = await getCategoryList(parentId, page, PAGE_SIZE);

        this.setState({loading: false});
        if (res.code === 200) {
            const {list,total} = res.data;

            if (parentId === 0) {
                this.setState({
                    total,
                    categoryList:list
                });
            } else {
                this.setState({
                    total,
                    subCategoryList: list
                });
            }
        } else {
            message.error("获取分类列表失败");
        }
    };

    /**
     *  显示子集分类列表
     * @param category
     */
    showSubCategoryList = (category) => {
        this.setState({
            parentId: category.id,
            parentName: category.name,
        }, () => {
            // 在状态更新且重新render()后执行
            this.getCategoryList()
        });
    };

    /**
     * 显示一级分类列表
     */
    showCategoryList = () => {
        this.setState({
            parentId: 0,
            parenName: '',
            subCategoryList: []
        })
    };

    /**
     * 取消弹出框
     */
    handleCancel = () => {
        //清除输入数据
        this.form.resetFields();

        //隐藏确认框
        this.setState({showStatus: 0});
    };

    //显示添加确认框
    showAdd = () => {
        this.setState({showStatus: 1});
    };

    //显示修改确认框
    showUpdate = (category) => {
        this.category = category;

        this.setState({showStatus: 2});
    };

    //添加分类
    addCategory = () => {
        this.form.validateFields(async (err, val) => {
            if (!err) {
                //隐藏确认框
                this.setState({showStatus: 0});
                const {name, parent_id, order_by} = val;
                //清除输入数据
                this.form.resetFields();
                //更新分类
                const res = await addCategory({name, parent_id, order_by});
                if (res.code === 200) {
                    //重新显示列表
                    this.getCategoryList();
                } else {
                    message.error(res.msg)
                }
            }
        });
    };

    //修改分类
    updateCategory = () => {
        this.form.validateFields(async (err, val) => {
            if (!err) {
                console.log(val);

                //隐藏确认框
                this.setState({showStatus: 0});

                const id = this.category.id;
                const {name, parent_id, order_by} = val;

                //清除输入数据
                this.form.resetFields();

                //更新分类
                const res = await updateCategory({id, name, parent_id, order_by});
                if (res.code === 200) {
                    //重新显示列表
                    this.getCategoryList();
                } else {
                    message.error(res.msg);
                }
            }
        });

    };

    //删除分类
    delCategory = async (id) => {
        const res = await delCategory(id);
        if (res.code === 200) {
            message.success("删除成功!");
            //重新显示列表
            this.getCategoryList();
        } else {
            message.error(res.msg)
        }
    };


    /**
     * 执行异步
     */
    componentDidMount() {
        this.getCategoryList(1);
    }

    render() {
        const category = this.category || {};
        const total = this.state.total;


        //Card左侧
        const title = this.state.parentId === 0 ? '一级分类列表' : (
            <span>
                <LinkButton onClick={() => {
                    this.showCategoryList()
                }}>一级分类列表</LinkButton>
                 <Icon type='arrow-right' style={{marginRight: 5}}/>
                <span>{this.state.parentName}</span>
            </span>
        );

        //Card右侧
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <Icon type="plus"/> 添加
            </Button>
        );
        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey="id"
                    loading={this.state.loading}
                    dataSource={this.state.parentId === 0 ? this.state.categoryList : this.state.subCategoryList}
                    columns={this.state.columns}
                    pagination={{
                        current:this.page,
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getCategoryList
                    }}
                />

                <Modal
                    title="添加分类"
                    visible={this.state.showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm
                        categoryList={this.state.categoryList}
                        parentId={this.state.parentId}
                        setForm={(form) => {
                            this.form = form
                        }}
                    />
                </Modal>

                <Modal
                    title="更新分类"
                    visible={this.state.showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm
                        categoryList={this.state.categoryList}
                        categoryInfo={category}
                        setForm={(form) => {
                            this.form = form
                        }}
                    />
                </Modal>

            </Card>
        )
    }
}