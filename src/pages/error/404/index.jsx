import React              from "react";
import {Button, Row, Col} from "antd";
import "./index.less";

const NotFound = (props) => {
    const {history} = props;
    const goHome = () => history.replace("/");
    return (
        <Row className="not-found">
            <Col className="errorImg">
                <img src="https://static.shundatong.vip/static/404.png" alt="404"/>
            </Col>
            <Col className="errorRight">
                <div className="errorH1">404</div>
                <div className="errorText">抱歉，你访问的页面不存在</div>
                <div className="errorBtn">
                    <Button type="primary" onClick={goHome}>
                        回到首页
                    </Button>
                </div>
            </Col>
        </Row>
    );
};

export default NotFound;
