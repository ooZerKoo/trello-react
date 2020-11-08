import React from 'react'
import { connect } from 'react-redux'

import { Layout, Menu } from 'antd'
import { LoginOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
const { Sider } = Layout

const MenuLeftNoLogged = props => {
    return (
        <Sider collapsible collapsed={props.collapsed}>
            <div className="logo" />
            <Menu theme={props.theme} mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<LoginOutlined />}><NavLink to='/login'>Inicia Sesión</NavLink></Menu.Item>
                <Menu.Item key="2" icon={<PlusSquareOutlined />}><NavLink to='/register'>Regístrate</NavLink></Menu.Item>
            </Menu>
        </Sider>
    )
}

const mapSateToProps = state => ({
    collapsed: state.menu.collapsed,
    theme: state.menu.theme,
})

const connected = connect(mapSateToProps, null)(MenuLeftNoLogged)

export default connected