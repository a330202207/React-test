import React, {Component} from "react";
import {Button, Card, Icon, Input, message, Select, Table} from "antd";
import {PAGE_SIZE} from "../../utils/constants";
import LinkButton from "../../components/link-button";
import {getRoleList, getRole, saveRoleList, delRoleList} from "../../api";
import moment from "moment";

/**
 * 角色路由
 */
export default class list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            roleList: [],
            loading: false,                 //是否正在获取数据
            columns: this.initColumns(),
        }
    };

    //初始化数据
    initColumns = () => {
        return [
            {
                title: '角色ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '角色状态',
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

    //获取角色列表
    getRoleList = async (page = 1) => {
        this.page = page;

        //loading
        this.setState({loading: true});

        const res = await getRoleList(page, PAGE_SIZE);

        this.setState({loading: false});
        if (res.code === 200) {
            const {list,total} = res.data;
            this.setState({
                total,
                roleList:list
            });
        } else {
            message.error("获取分类列表失败");
        }
    };

    /**
     * 执行异步
     */
    componentDidMount() {
        this.getRoleList(1);
    }

    render() {
        const total = this.state.total;
        const title = (
            <span>
                <Button type='primary' onClick={() => this.props.history.push('/role/save', {})}>
                    <Icon type='plus'/>
                    添加角色
                </Button>
            </span>
        );

        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey="id"
                    loading={this.state.loading}
                    dataSource={this.state.roleList}
                    columns={this.state.columns}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getRoleList
                    }}
                />
            </Card>
        )
    }
}