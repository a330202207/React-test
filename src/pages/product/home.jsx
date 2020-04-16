import React, {Component} from "react";
import {Card, Select, Input, Button, Icon, Table, message, DatePicker, Divider} from "antd";
import LinkButton from "../../components/link-button";

import {getProductList, addProduct, updateProduct, delProduct} from "../../api";
import {PAGE_SIZE} from '../../utils/constants'
import moment from 'moment';
import memoryUtils from "../../utils/memoryUtils";

const Option = Select.Option;
const {RangePicker} = DatePicker;

export default class ProductHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            productName: '',
            statusType: "0",
            startTime: 0,
            endTime: 0,
            productList: [],
            loading: false,                 //是否正在获取数据
            columns: this.initColumns(),
        }
    };

    /**
     * 初始化Table所有列数组
     * @returns {[{dataIndex: string, title: string, key: string}, {width: number, title: string, render: (function(*=): *)}]}
     */
    initColumns = () => {
        return [
            {
                title: '商品ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '商品名称',
                key: 'name',
                render: (product) => (
                    <LinkButton
                        onClick={() => this.props.history.push('/product/details', {product})}>{product.name}</LinkButton>
                )
            },
            {
                title: '商品价格',
                dataIndex: 'price',
                key: 'price',
                render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
            },
            {
                title: '商品状态',
                dataIndex: 'status',
                key: 'status',
                render: (status) => (
                    <span>{status === 1 ? '在售' : '已下架'}</span>
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
                title: '操作',
                width: 300,
                render: (product) => {
                    const status = product.status === 1 ? "下架" : "上架";
                    const newStatus = product.status === 1 ? 2 : 1;
                    return (
                        <span>
                            <LinkButton onClick={() => this.delProduct(product.id)}>删除</LinkButton>
                            <LinkButton
                                onClick={() => this.props.history.push('/product/edit', {product})}>编辑</LinkButton>
                            <LinkButton onClick={() => {
                                this.updateStatus(product.id, newStatus)
                            }}>{status}</LinkButton>
                        </span>
                    )
                }
            },
        ];
    };


    /**
     * 获取商品列表
     * @returns {Promise<void>}
     */
    getProductList = async (page = 1) => {
        this.page = page;
        const {productName, statusType, startTime, endTime} = this.state;

        this.setState({loading: true}); // 显示loading

        const res = await getProductList(page, PAGE_SIZE, productName, statusType, startTime, endTime);

        console.log(res);
        this.setState({loading: false});
        if (res.code === 200) {
            const {list, total} = res.data;
            this.setState({
                total,
                productList: list
            })
        } else {
            message.error("获取商品列表失败");
        }
    };


    updateStatus = (id, status) => {

    };

    delProduct = (id) => {

    };

    //时间选择
    changeTime = (value, dateString) => {
        // const {startTime, endTime} = dateString;
        const startTime = moment(dateString[0], 'YYYY-MM-DD HH:mm:ss').unix();
        const endTime = moment(dateString[1], 'YYYY-MM-DD HH:mm:ss').unix();

        this.setState({
            startTime,
            endTime
        });
    };


    /**
     * 执行异步
     */
    componentDidMount() {
        this.getProductList(1).then(r => function () {
            console.log("异步获取失败")
        });
    }

    render() {

        const {total} = this.state.total;
        const title = (
            <span>
                商品名称
                <Input
                    placeholder='请输入名称'
                    value={this.state.productName}
                    onChange={event => this.setState({productName: event.target.value})}
                    style={{width: 150, margin: '0 10px'}}
                />
                状态
                <Select
                    defaultValue={this.state.statusType}
                    style={{width: 150, margin: '0 15px'}}
                    onChange={value => this.setState({statusType: value})}
                >
                    <Option value='0'>全部</Option>
                    <Option value='1'>在售</Option>
                    <Option value='2'>已下架</Option>
                </Select>
                添加日期
                <RangePicker
                    style={{margin: '0 5px'}}
                    showTime={{
                        format: 'HH:mm',
                        hideDisabledOptions: true
                    }}
                    format="YYYY-MM-DD HH:mm"
                    onChange={this.changeTime}
                />
                <Button type='primary' onClick={() => {
                    this.getProductList(1)
                }}>搜索</Button>
            </span>
        )

        const extra = (
            <Button type='primary' onClick={() => this.props.history.push('/product/add')}>
                <Icon type='plus'/>
                添加商品
            </Button>
        );

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey="id"
                    loading={this.state.loading}
                    dataSource={this.state.productList}
                    columns={this.state.columns}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProductList
                    }}
                />
            </Card>
        )
    }
}