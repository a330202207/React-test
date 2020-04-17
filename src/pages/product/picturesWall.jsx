import React, {Component} from "react";
import {Upload, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {delImg} from '../../api'


export default class PicturesWall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,  // 标识是否显示大图预览Modal
            previewImage: '',       // 大图的url
            fileList: [],           // 所有已上传图片的数组
        }
    }

    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = (file) => {
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
                message.error('上传图片失败')
            }
        }

        if (file.status === 'removed') {
            const res = await delImg(file.path);
            if (res.code === 200) {
                message.success('删除图片成功!')
            } else {
                message.error('删除图片失败!')
            }
        }
        // 在操作(上传/删除)过程中更新fileList状态
        this.setState({fileList})
    };

    onRemove = (file) => {
        if (file.response.code === 200) {
            const index = this.state.fileList.indexOf(file);
            const newFileList = this.state.fileList.slice();
            newFileList.splice(index, 1);
            this.setState({
                fileList: newFileList
            })
        }
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