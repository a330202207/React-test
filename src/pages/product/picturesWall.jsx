import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Upload, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';


//上传文件组件
export default class PicturesWall extends Component {
    static propTypes = {
        imgs: PropTypes.array
    };
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,  // 标识是否显示大图预览Modal
            previewImage: '',       // 大图的url
            fileList: this.initImgList(props.imgs),           // 所有已上传图片的数组
        }
    };

    //初始化图片列表
    initImgList = (list) => {
        let fileList = [];
        if (list && list.length > 0) {
            fileList = list.map((img, index) => ({
                uid: index,
                url: img.img,
            }));
        }
        return fileList;
    };

    getImgs = () => {
        return this.state.fileList.map(file => file.url);
    };

    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = (file) => {
        //显示指定file对应的大图
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    //当前操作的图片文件
    handleChange = async ({file, fileList}) => {
        if (file.status === 'done') {
            const res = file.response;  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
            if (res.code === 200) {
                message.success('上传图片成功!');
                const {imgName, imgUrl, imgPath} = res.data;
                file = fileList[fileList.length - 1];
                file.name = imgName;
                file.url = imgUrl;
                file.path = imgPath;
            } else {
                file = fileList[fileList.length - 1];
                file.status = 'error';
                message.error(res.msg)
            }
        }
        // 在操作(上传/删除)过程中更新fileList状态
        this.setState({fileList})
    };

    //删除文件
    onRemove = (file) => {
        console.log(file);
        this.props.handleImg(file.url);
        const index = this.state.fileList.indexOf(file);
        const newFileList = this.state.fileList.slice();
        newFileList.splice(index, 1);
        console.log(newFileList);
        this.setState({
            fileList: newFileList
        })
    };

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/admin/upload/img"
                    accept='image/*'                //只接收图片格式
                    listType="picture-card"         //卡片样式
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onRemove={this.onRemove}
                    onChange={this.handleChange}
                    name="image"                    //请求参数名
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}