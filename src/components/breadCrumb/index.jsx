import React, {Component} from "react";
import {withRouter}       from "react-router-dom";
import {Breadcrumb}       from "antd";
import {HomeOutlined}     from "@ant-design/icons";
import menuList           from "../../config/menuConfig";

/**
 * 导航面包屑
 */
class BreadCrumb extends Component {
    getPath = (menuList, pathname) => {
        let tempPath = [];
        try {
            function getNodePath(node) {
                tempPath.push(node);
                //找到符合条件的节点，通过throw终止掉递归
                if (node.key === pathname) {
                    throw new Error("GOT IT!");
                }
                if (node.children && node.children.length > 0) {
                    for (let i = 0; i < node.children.length; i++) {
                        getNodePath(node.children[i]);
                    }
                    //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
                    tempPath.pop();
                } else {
                    //找到叶子节点时，删除路径当中的该叶子节点
                    tempPath.pop();
                }
            }

            for (let i = 0; i < menuList.length; i++) {
                getNodePath(menuList[i]);
            }
        } catch (e) {
            return tempPath;
        }
    };

    render() {
        const {location} = this.props;
        const {pathname} = location;
        let path = this.getPath(menuList, pathname);
        const first = path && path[0];

        if (first && first.title.trim() !== "首页") {
            path = [{title: "首页", key: "/home"}].concat(path);

        }

        return (
            <Breadcrumb>
                {
                    path && path.map((item) => item.title === "首页" ? (
                            <Breadcrumb.Item key={item.key}>
                                <HomeOutlined/>
                                <a href={`${item.key}`}>{item.title}</a>
                            </Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item key={item.key}>
                                {
                                    item.title === path[path.length - 1].title ? (
                                        <a href={`${item.key}`}>{item.title}</a>) : item.title
                                }
                            </Breadcrumb.Item>
                        )
                    )
                }
            </Breadcrumb>
        );
    }
}

export default withRouter(BreadCrumb);
