import React, {Component} from "react";
import {Button, Card, Icon, message, Table, Modal, Popconfirm} from "antd";
import {PAGE_SIZE}                               from "../../config/constants";
import LinkButton                                from "../../components/linkButton";
import {getMenuList, addMenu, delMenu, saveMenu} from "../../api";
import Add from "./add";
import Save from "./save";

/**
 * 菜单路由
 */
export default class list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parentId: 0,
            parentName: '',
            total: 0,
            menuList: [],
            subMenuList: [],
            loading: false,                 //是否正在获取数据
            showStatus: 0,                  //是否显示确认框，0：都不显示，1：显示添加，2：显示更新
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
                title: '排序',
                dataIndex: 'order_by',
                key: 'order_by',
            },
            {
                title: '操作',
                width: 300,
                render: (menu) => {
                    return (
                        <span>
                             <LinkButton onClick={() => this.showSave(menu)}>编辑</LinkButton>
                            {this.state.parentId === 0 ? <LinkButton onClick={() => {
                                this.showSubMenuList(menu)
                            }}>查看</LinkButton> : null}
                            <Popconfirm title="确定要删除么" okText="是" cancelText="否"
                                        onConfirm={() => this.delMenu(menu.id)}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                 <a href="#">删除</a>
                            </Popconfirm>
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

        const parentId = this.state.parentId;

        const res = await getMenuList(parentId, page, PAGE_SIZE);

        this.setState({loading: false});
        if (res.code === 200) {
            const {list, total} = res.data;
            if (parentId === 0) {
                this.setState({
                    total,
                    menuList: list
                });
            } else {
                this.setState({
                    total,
                    subMenuList: list
                });
            }


        } else {
            message.error("获取菜单列表失败");
        }
    };

    //显示子菜单
    showSubMenuList = (menu) => {
        this.setState({
            parentId: menu.id,
            parentName: menu.name,
        }, () => {
            // 在状态更新且重新render()后执行
            this.getMenuList()
        });
    };

    /**
     * 显示一级菜单列表
     */
    showMenuList = () => {
        this.setState({
            parentId: 0,
            parenName: '',
            subMenuList: []
        });
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

    //显示添加顶级菜单
    showAdd = () => {
        this.setState({showStatus: 1});
    };

    //显示编辑确认框
    showSave = (menu) => {
        this.menu = menu;
        this.setState({showStatus: 2});
    };

    //添加菜单
    addMenu = () => {
        this.form.validateFields(async (err, val) => {
            if (!err) {
                //隐藏确认框
                this.setState({showStatus: 0});
                const {name, parent_id, order_by, menu_router} = val;

                //清除输入数据
                this.form.resetFields();
                //更新分类
                const res = await addMenu({name, parent_id, order_by, menu_router});
                if (res.code === 200) {
                    message.success('添加成功!');
                    //重新显示列表
                    this.getMenuList();
                } else {
                    message.error(res.msg)
                }
            }
        });
    };

    //保存菜单
    saveMenu = () => {
        this.form.validateFields(async (err, val) => {
            if (!err) {
                //隐藏确认框
                this.setState({showStatus: 0});

                const id = this.menu.id;
                const {name, parent_id, order_by, menu_router} = val;

                //清除输入数据
                this.form.resetFields();

                //更新分类
                const res = await saveMenu({id, name, parent_id, order_by, menu_router});
                if (res.code === 200) {
                    //重新显示列表
                    this.getMenuList();
                } else {
                    message.error(res.msg);
                }
            }
        });
    };

    //删除菜单
    delMenu = async (id) => {
        const res = await delMenu(id);
        if (res.code === 200) {
            message.success("删除成功!");
            //重新显示列表
            this.getMenuList();
        } else {
            message.error(res.msg)
        }
    };

    /**
     * 执行异步
     */
    componentDidMount() {
        this.getMenuList(1);
    }

    render() {
        const menu = this.menu || {};
        const total = this.state.total;

        //Card左侧
        const title = this.state.parentId === 0 ? '顶级菜单列表' : (
            <span>
                <LinkButton onClick={() => {
                    this.showMenuList()
                }}>顶级列表</LinkButton>
                 <Icon type='arrow-right' style={{marginRight: 5}}/>
                <span>{this.state.parentName}</span>
            </span>
        );

        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <Icon type="plus"/> 添加菜单
            </Button>
        );

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey="id"
                    loading={this.state.loading}
                    dataSource={this.state.parentId === 0 ? this.state.menuList : this.state.subMenuList}
                    columns={this.state.columns}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getMenuList
                    }}
                />

                <Modal
                    title="添加菜单"
                    visible={this.state.showStatus === 1}
                    onOk={this.addMenu}
                    onCancel={this.handleCancel}
                >
                    <Add
                        menuList={this.state.menuList}
                        parentId={this.state.parentId}
                        setForm={(form) => {
                            this.form = form
                        }}
                    />
                </Modal>
                <Modal
                    title="更新菜单"
                    visible={this.state.showStatus === 2}
                    onOk={this.saveMenu}
                    onCancel={this.handleCancel}
                >
                    <Save
                        menuList={this.state.menuList}
                        menuInfo={menu}
                        setForm={(form) => {
                            this.form = form
                        }}
                    />
                </Modal>
            </Card>
        )
    }
}
