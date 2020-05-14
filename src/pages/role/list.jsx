import React, {Component} from "react";
import {Button, Card, Icon, message, Modal, Table} from "antd";
import {PAGE_SIZE} from "../../utils/constants";
import LinkButton from "../../components/link-button";
import {getRoleList, getRole, delRole} from "../../api";

import RoleAuth from "./roleAuth";
import moment from "moment";

/**
 * 角色路由
 */
export default class list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            showStatus: 0,                  //是否显示确认框，0：都不显示，1：显示角色详情
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
                key: 'name',
                render: (role) => (
                    <LinkButton
                        onClick={() => this.saveRole(role.id)}>{role.name}
                    </LinkButton>
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
                render: (role) => {
                    return (
                        <span>
                            <LinkButton onClick={() => this.showRoleAuth(role.id)}>查看权限</LinkButton>
                            <LinkButton onClick={() => this.delRole(role.id)}>删除</LinkButton>
                        </span>
                    )
                }
            },
        ];
    };

    //角色权限
    showRoleAuth = (id) => {
        // this.props.history.push('/role/details', {id})

        this.roleId = id;
        this.setState({showStatus:1})

        // getRole(id).then(res => {
        //     if (res.code === 200) {
        //         const role = res.data;
        //         this.props.history.push('/role/details', {role})
        //     } else {
        //         message.error("获取数据失败！");
        //     }
        // })
    };

    /**
     * 取消弹出框
     */
    handleCancel = () => {
        //隐藏确认框
        this.setState({showStatus: 0});
    };

    //保存角色
    saveRole = (id) => {
        if (id !== 0) {
            getRole(id).then(res => {
                if (res.code === 200) {
                    const role = res.data;
                    this.props.history.push('/role/save', {role})
                } else {
                    message.error("获取数据失败！");
                }
            })
        } else {
            this.props.history.push('/role/save', {})
        }
    };

    //删除角色
    delRole = async (id) => {
        const res = await delRole(id);
        if (res.code === 200) {
            message.success('操作成功!');
            this.getRoleList(this.page);
        } else {
            message.error('操作失败!');
        }
    };

    //获取角色列表
    getRoleList = async (page = 1) => {
        this.page = page;

        //loading
        this.setState({loading: true});

        const res = await getRoleList(page, PAGE_SIZE);

        this.setState({loading: false});
        if (res.code === 200) {
            const {list, total} = res.data;
            this.setState({
                total,
                roleList: list
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
                <Button type='primary' onClick={() => this.saveRole(0)}>
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

                <Modal
                    title="查看权限"
                    maskClosable={true}
                    visible={this.state.showStatus === 1}
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                >
                    <RoleAuth
                        id={this.roleId}
                    />
                </Modal>
            </Card>
        )
    }
}