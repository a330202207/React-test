import React, {Component} from "react";
import {Button, Card, Icon, message, Table, Modal} from 'antd';
import LinkButton from "../../components/link-button";
import {getCategoryList, addCategory, updateCategory} from "../../api";
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
            },
            {
                title: '操作',
                width: 300,
                render: (category) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
                        {this.state.parentId === 0 ? <LinkButton onClick={() => {
                            this.showSubCategoryList(category)
                        }}>查看子分类</LinkButton> : null}
                    </span>
                )
            },
        ];
    };

    /**
     *  异步获取分类列表
     * @returns {Promise<void>}
     */
    getCategoryList = async () => {
        //loading
        this.setState({loading: true});

        const parentId = this.state.parentId;
        const res = await getCategoryList(parentId);

        this.setState({loading: false});
        if (res.code === 200) {
            const categoryList = res.data.list;
            if (parentId === 0) {
                this.setState({categoryList})
            } else {
                this.setState({subCategoryList: categoryList})
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

    };

    //修改分类
    updateCategory = async () => {

        //隐藏确认框
        this.setState({showStatus: 0});

        const categoryId = this.category.id;
        const categoryName = this.state.from.getFieldValue('categoryName');

        //清除输入数据
        this.form.resetFields();

        //更新分类
        const res = await updateCategory({categoryId, categoryName});
        if (res.status === 0) {
            //重新显示列表
            this.getCategoryList();
        }
    };


    /**
     * 执行异步
     */
    componentDidMount() {
        this.getCategoryList();
    }

    render() {


        const category = this.category || {};
        console.log(category.name);

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
                    pagination={{defaultPageSize: 2, showQuickJumper: true}}
                />

                <Modal
                    title="添加分类"
                    visible={this.state.showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm/>
                </Modal>

                <Modal
                    title="更新分类"
                    visible={this.state.showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm
                        categoryName={category.name}
                        setForm={(form) => {
                            this.form = form
                        }}/>
                </Modal>

            </Card>
        )
    }
}