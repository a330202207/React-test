import React, {Component} from "react";
import {Card, List, Tree} from 'antd'
import menuList from "../../config/menuConfig";

const {TreeNode} = Tree;
const Item = List.Item;

/**
 * 角色详情
 */
export default class RoleDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedKeys: this.props.roleMenus,
        };
    };

    // 组件树形控件 子节点渲染
    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.title} key={item.key}/>;
        });

    render() {
        return (
            <Card>
                <List>
                    <Item>
                        <Tree
                            checkable
                            defaultExpandAll={true}
                            checkedKeys={this.state.checkedKeys}
                        >
                            {this.renderTreeNodes(menuList)}
                        </Tree>
                    </Item>
                </List>
            </Card>
        )
    }
}