import React, {Component} from "react";
import {Card, List, Tree} from 'antd'

// import LinkButton from '../../components/link-button';

const {TreeNode} = Tree;

const Item = List.Item;

export const treeData = [
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
]



export default class RoleDetails extends Component {

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
            )
            return pre
        }, [])
    };

    render() {



        // let defaultCheckedKeys = this.getCheckedKeys(treeData);



        return (
            <Card>
                <List>
                    <Item>
                        <Tree
                            defaultExpandAll={true}
                            // checkedKeys={defaultCheckedKeys}
                        >
                            {/*{this.treeNodes}*/}
                            {this.renderTreeNodes(treeData)}
                        </Tree>
                    </Item>
                </List>
            </Card>
        )
    }
}