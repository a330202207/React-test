import React, {Component} from "react";
import {Card, Form, Icon, Input, Button, message, Tree, List} from 'antd'
import LinkButton from "../../components/link-button";
import {treeData} from "./roleAuth";


const {TreeNode} = Tree;

const Item = List.Item;




/**
 * 保存角色
 */
class addRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [
                {
                    title: "全局权限",
                    key: "0",
                    children: [
                        {
                            title: "查看手机号",
                            key: "1",
                        }
                    ]
                },
                {
                    title: "账号管理",
                    key: "2",
                    children: [
                        {
                            title: "新增账号",
                            key: "3",
                        },
                        {
                            title: "编辑账号",
                            key: "4",
                        },
                        {
                            title: "删除账号",
                            key: "5",
                        }
                    ]
                }
            ],
        };
    };

    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            );
            return pre
        }, [])
    }

    renderTreeNodes = (data) => {
        return treeData.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            );
            return pre
        }, [])
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
                <span>添加角色</span>
            </span>
        );

        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: {span: 2},  // 左侧label的宽度
            wrapperCol: {span: 8}, // 右侧包裹的宽度
        };

        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item
                        label="角色名称"
                        name="name"
                    >
                        {
                            getFieldDecorator('name', {
                                initialValue: '',
                                rules: [
                                    {required: true, message: '角色名称必须输入'}
                                ]
                            })(<Input placeholder='请输入角色名称' style={{width: '100%'}}/>)
                        }
                    </Item>
                    <Item
                        label="菜单权限"
                        name="menu_ids"
                    >
                        <Tree
                            checkable
                            defaultExpandAll={true}
                            // checkedKeys={defaultCheckedKeys}
                        >
                            {/*{this.treeNodes}*/}
                            {this.renderTreeNodes(this.state.menuList)}
                            {/*{this.renderTreeNodes(treeData)}*/}
                        </Tree>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(addRole);