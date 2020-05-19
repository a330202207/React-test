import React, {Component} from "react";
import {Card, Form, Icon, Input} from 'antd'
import LinkButton from "../../components/link-button";


const Item = Form.Item;

/**
 * 保存角色
 */
class saveRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 1,
            role: this.props.location.state.role ?? '',
            isUpdate: !!this.props.location.state.role,
            menuList: [],
        };
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
                <span>{this.state.role ? '编辑角色' : '添加角色'}</span>
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
                              initialValue: this.state.role.role_info.name,
                              rules: [
                                  {required: true, message: '商品名称必须输入'}
                              ]
                          })(<Input placeholder='请输入角色名称' style={{width: '100%'}}/>)
                      }
                  </Item>
                  <Item
                    label="菜单权限"
                    name="menu_ids"
                  >
                  </Item>
              </Form>
          </Card>
        )
    }
}

export default Form.create()(saveRole);