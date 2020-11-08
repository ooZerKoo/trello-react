import React from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Login = props => {
    return <LoadingOutlined style={{ fontSize: 24 }} spin />
}

const connected = connect()(Login)

export default connected