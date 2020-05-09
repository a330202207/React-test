import React, {Component} from "react";
import {Card, Icon, List, Switch} from 'antd'

import LinkButton from '../../components/link-button';

const Item = List.Item;

export default class ProductDetails extends Component {
    render() {
        const {name, price, num, imgs, order_by, status, details, category_info} = this.props.location.state.product;
        console.log(this.props.location.state.product);

        const title = (
            <span>
                <LinkButton>
                  <Icon
                      type='arrow-left'
                      style={{marginRight: 10, fontSize: 20}}
                      onClick={() => this.props.history.goBack()}
                  />
                </LinkButton>
                <span>商品详情</span>
            </span>
        );

        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span className="right">{name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品分类:</span>
                        <span className="right">{category_info.name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        <span className="right">{price}元</span>
                    </Item>
                    <Item>
                        <span className="left">商品库存:</span>
                        <span className="right">{num}</span>
                    </Item>
                    <Item>
                        <span className="left">商品排序:</span>
                        <span className="right">{order_by}</span>
                    </Item>
                    <Item>
                        <span className="left">商品状态:</span>
                        <span className="right">
                            <Switch checkedChildren="上架" unCheckedChildren="下架" defaultChecked={status === 1} disabled /></span>
                    </Item>
                    <Item>
                        <span className="left">商品图片:</span>
                        <span className="right">
                            {
                                imgs.map(img => (
                                    <img
                                        key={img.id}
                                        src={img.img}
                                        className="product-img"
                                        alt="img"
                                    />
                                ))
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情:</span>
                        <span className="right" dangerouslySetInnerHTML={{__html: details}}/>
                    </Item>
                </List>
            </Card>
        )
    }
}