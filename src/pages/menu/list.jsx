import React, {Component} from "react";
import {Button, Card, Icon, Input, message, Select, Table} from "antd";
import {PAGE_SIZE} from "../../utils/constants";
import LinkButton from "../../components/link-button";
import {getMenuList, getMenu, saveMenuList, delMenuList} from "../../api";
import moment from "moment";

/**
 * 菜单路由
 */
export default class list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            menuList: [],
            loading: false,                 //是否正在获取数据
            columns: this.initColumns(),
        }
    };

    //初始化数据
    initColumns = () => {
        return [
            {
                title: '菜单ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '菜单名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '菜单状态',
                dataIndex: 'status',
                key: 'status',
                render: (status) => (
                    <span>{status === 1 ? '启用' : '禁用'}</span>
                )
            },
            {
                title: '创建时间',
                dataIndex: 'created_at',
                key: 'created_at',
                render: (created_at) => (
                    <span>
                        {created_at !== 0 ? moment(created_at * 1000).format("YYYY-MM-DD HH:mm:ss") : ''}
                    </span>
                )
            },
            {
                title: '修改时间',
                dataIndex: 'updated_at',
                key: 'updated_at',
                render: (updated_at) => (
                    <span>
                        {updated_at !== 0 ? moment(updated_at * 1000).format("YYYY-MM-DD HH:mm:ss") : ''}
                    </span>
                )
            },
            {
                title: '操作',
                width: 300,
                render: (product) => {
                    const status = product.status === 1 ? "启用" : "禁用";
                    const newStatus = product.status === 1 ? 2 : 1;
                    return (
                        <span>
                            <LinkButton onClick={() => this.delProduct(product.id)}>删除</LinkButton>
                            <LinkButton
                                onClick={() => this.props.history.push('/product/save', {product})}>编辑</LinkButton>
                            <LinkButton onClick={() => {
                                this.updateStatus(product.id, newStatus)
                            }}>{status}</LinkButton>
                        </span>
                    )
                }
            },
        ];
    };

    //获取菜单列表
    getMenuList = async (page = 1) => {
        this.page = page;

        //loading
        this.setState({loading: true});

        const res = await getMenuList(page, PAGE_SIZE);

        this.setState({loading: false});
        if (res.code === 200) {
            const {list,total} = res.data;
            this.setState({
                total,
                menuList:list
            });
        } else {
            message.error("获取分类列表失败");
        }
    };

    /**
     * 执行异步
     */
    componentDidMount() {
        this.getMenuList(1);
    }

    render() {
        const total = this.state.total;
        const title = (
            <span>
                <Button type='primary' onClick={() => this.props.history.push('/menu/save', {})}>
                    <Icon type='plus'/>
                    添加菜单
                </Button>
            </span>
        );

        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey="id"
                    loading={this.state.loading}
                    dataSource={this.state.menuList}
                    columns={this.state.columns}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getMenuList
                    }}
                />
            </Card>
        )
    }
}