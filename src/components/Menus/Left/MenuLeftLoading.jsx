import React from 'react'
import { connect } from 'react-redux'

import { Layout, Menu } from 'antd'
import Loading from '../../../pages/Loading'
const { Sider } = Layout

const MenuLeftLoading = props => {
    return (
        <Sider collapsible collapsed={props.collapsed}>
            <div className="logo" />
            <Menu theme={props.theme} mode="inline" defaultSelectedKeys={['1']}>
                <Loading />
            </Menu>
        </Sider>
    )
}

const mapSateToProps = state => ({
    collapsed: state.menu.collapsed,
    theme: state.menu.theme,
})

const connected = connect(mapSateToProps, null)(MenuLeftLoading)

export default connected