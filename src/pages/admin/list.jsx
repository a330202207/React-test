import React, {Component} from "react";
import {Button, Card, Icon, message, Table} from "antd";
import {PAGE_SIZE} from "../../utils/constants";
import LinkButton from "../../components/link-button";
import {getAdminList} from "../../api";
import moment from "moment";

/**
 * 管理员路由
 */
export default class list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            adminList: [],
            loading: false,                 //是否正在获取数据
            columns: this.initColumns(),
        }
    };

    //初始化数据
    initColumns = () => {
        return [
            {
                title: '用户ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '用户名称',
                dataIndex: 'user_name',
                key: 'user_name',
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '登陆IP',
                dataIndex: 'login_ip',
                key: 'login_ip',
            },
            {
                title: '登陆时间',
                dataIndex: 'login_date',
                key: 'login_date',
                render: (login_date) => (
                    <span>
                        {login_date !== 0 ? moment(login_date * 1000).format("YYYY-MM-DD HH:mm:ss") : ''}
                    </span>
                )
            },
            {
                title: '登陆次数',
                dataIndex: 'login_cnt',
                key: 'login_cnt',
            },
            {
                title: '创建IP',
                dataIndex: 'create_ip',
                key: 'create_ip',
            },
            {
                title: '用户状态',
                dataIndex: 'status',
                key: 'status',
                render: (status) => (
                    <span>{status < 2 ? '启用' : '禁用'}</span>
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

    //获取用户列表
    getAdminList = async (page = 1) => {
        this.page = page;

        //loading
        this.setState({loading: true});

        const res = await getAdminList(page, PAGE_SIZE);

        this.setState({loading: false});
        if (res.code === 200) {
            const {list, total} = res.data;
            this.setState({
                total,
                adminList: list
            });
        } else {
            message.error("获取管理员列表失败");
        }
    };

    /**
     * 执行异步
     */
    componentDidMount() {
        this.getAdminList(1).then(r => function () {
            console.log("异步获取失败")
        });
    }

    render() {
        const total = this.state.total;
        const title = (
            <span>
                <Button type='primary' onClick={() => this.props.history.push('/admin/add', {})}>
                    <Icon type='plus'/>
                    添加管理员
                </Button>
            </span>
        );

        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey="id"
                    loading={this.state.loading}
                    dataSource={this.state.adminList}
                    columns={this.state.columns}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getAdminList
                    }}
                />
            </Card>
        )
    }
}