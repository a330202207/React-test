import React, {Component} from 'react'
import { message} from 'antd';
import {EditorState, convertToRaw, ContentState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: this.initDetails(props.details), // 创建一个空的富文本
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        })
    };

    //初始化商品详情
    initDetails = (html) => {
        let editorState;
        if (html) {
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            editorState = EditorState.createWithContent(contentState);
        } else {
            editorState = EditorState.createEmpty();
        }
        return editorState;
    };

    getDetail = () => {
        // 返回输入数据对应的html格式的文本
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    };

    //上传图片回调
    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                let formData = new FormData();
                formData.append('image', file);
                let subsystemTourInfo = JSON.parse(localStorage.getItem('subsystemTourInfo')) || {};
                fetch(`/admin/upload/img`, {
                    method: 'POST',
                    headers: {
                        'store-user-token':subsystemTourInfo.token
                    },
                    body: formData,
                }).then(res => {
                    // console.log(res.json())
                    return res.json()
                }).then(res => {
                    console.log(res)
                    if (res.code !== 200) {
                        message.error('图片上传失败', 2);
                        reject(res)
                    } else {
                        resolve({data: {link: res.data.imgUrl}});
                    }
                }).catch(err => {
                    reject(err);
                })
            }
        );
    };

    render() {
        const {editorState} = this.state;
        return (
            <Editor
                editorState={editorState}
                editorStyle={{border: '1px solid black', minHeight: 200, paddingLeft: 10}}
                placeholder="请输商品详情" //输入框中默认内容
                onEditorStateChange={this.onEditorStateChange}      //每次编辑器状态发生变化时
                toolbar={{
                    history: {inDropdown: true},
                    inline: {inDropdown: false},
                    list: {inDropdown: true},
                    textAlign: {inDropdown: true},
                    image: {
                        urlEnabled: true,
                        uploadEnabled: true,
                        alignmentEnabled: true,     // 是否显示排列按钮 相当于text-align
                        previewImage: true,
                        uploadCallback: this.uploadImageCallBack,
                        inputAccept: 'image/gif,image/jpg,image/png,image/jpeg',
                        alt: {present: false, mandatory: false, previewImage: true}

                    },
                }}
            />
        )
    }
}