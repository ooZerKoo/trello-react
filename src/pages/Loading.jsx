import React from 'react'
import { Col, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loading = () => {
    return <Row align='middle' span={24} justify='center' style={{ fontSize: '3eM', minHeight: '50vh', width: '100%' }}>
        <Col><LoadingOutlined /></Col>
    </Row>
}

export default Loading