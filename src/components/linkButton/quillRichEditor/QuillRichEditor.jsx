import React, {Component}  from "react";
import {uploadImg}         from "../../api/common";
import {message}           from "antd";
import ReactQuill, {Quill} from "react-quill";
import "react-quill/dist/quill.snow.css";
import quillEmoji          from "quill-emoji";
import "quill-emoji/dist/quill-emoji.css"; //这个不引入的话会出现emoji框一直在输入框下面的情况

//注册ToolbarEmoji，将在工具栏出现emoji；注册TextAreaEmoji，将在文本输入框处出现emoji。
const {EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji} = quillEmoji;
Quill.register({
    "formats/emoji": EmojiBlot,
    "modules/emoji-shortname": ShortNameEmoji,
    "modules/emoji-toolbar": ToolbarEmoji,
    "modules/emoji-textarea": TextAreaEmoji,
}, true);

export default class QuillRichEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            htmlText: props.details ? props.details : "",
            text: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.reactQuillRef = null; // ReactQuill component
    }


    handleChange(value) {
        // const text = this.reactQuillRef.getEditor().getText();
        this.setState({
            htmlText: value
        }, () => {
            this.props.handleContent({
                htmlText: value,
                // text: text,        //不带html内容
            });
        });
    }

    //上传检查
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/JPG";
        if (!isJpgOrPng) {
            message.error("上传文件格式错误，仅支持jpeg、png、JPG格式!");
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("上传图片必须小于2MB!");
        }
        return isJpgOrPng && isLt2M;
    };

    //上传图片
    imageHandler = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        const that = this;
        input.onchange = async () => {
            const file = input.files[0];

            if (this.beforeUpload(file)) {
                const formData = new FormData();
                formData.append("file", file);
                const res = await uploadImg(formData);
                if (res.code === 200) {

                    let quill = that.reactQuillRef.getEditor();//获取到编辑器本身
                    const cursorPosition = quill.getSelection().index;//获取当前光标位置
                    const link = res.data.path;
                    quill.insertEmbed(cursorPosition, "image", link);//插入图片
                    quill.setSelection(cursorPosition + 1);//光标位置加1
                } else {
                    message.error("图片上传失败,请稍后再试");
                }
            }
        };
    };

    render() {
        const toolbarContainer = [
            [{"size": ["small", false, "large", "huge"]}],      //字号
            ["bold", "italic", "underline", "strike"],          //加粗,斜体,下划线,删除线
            [{"list": "ordered"}, {"list": "bullet"}, {"indent": "-1"}, {"indent": "+1"}],  //列表
            [{"header": [1, 2, 3, 4, 5, 6, false]}],            //标题字号，不能设置单个字大小
            [{"color": []}, {"background": []}],                //字体、背景颜色
            [{"align": []}],                                    //对齐
            // ["link", "image"],                                  //超链接，图片
            ["image"],                                          //超链接，图片
            ["emoji"],                                          //emoji表情
        ];

        return (
            <div className="text-editor" style={{maxHeight: "400px"}}>
                <ReactQuill
                    ref={(el) => {
                        this.reactQuillRef = el;
                    }}
                    placeholder={this.props.placeholder}
                    value={this.state.htmlText}
                    theme={"snow"}
                    onChange={this.handleChange}
                    modules={{
                        toolbar: {
                            container: toolbarContainer,
                            handlers: {
                                image: this.imageHandler,    //点击图片标志会调用的方法
                                // link: this.linkHandler,
                            }
                        },
                        "emoji-toolbar": true,
                        // 'emoji-textarea': true,          //文本框里出现emoji表情
                        "emoji-shortname": true,
                    }}
                />
            </div>
        );
    }
}
