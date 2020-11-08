import React from 'react'
import { connect } from 'react-redux'

import { setLogout, filterPanel, setDrawer } from '../../../services/redux/actions'

import { Layout, Menu } from 'antd'
import { EyeOutlined, PlusOutlined, SearchOutlined, LogoutOutlined, FolderOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
const { Sider } = Layout
const { SubMenu } = Menu

const MenuLeftLogged = props => {
    const getMenuLogged = () => {
        var cont = 0
        return <Menu theme={props.theme} mode="inline" selectedKeys={props.activeNav === '/' ? '/0' : props.activeNav}>
            {renderLineMenu('all', cont++)}
            {props.user.data.panels.map(panel => (
                renderLinePanel(panel)
            ))}
            {renderLineMenu('add', 998)}
            {renderLineMenu('logout', 999)}
        </Menu>
    }

    const renderLineMenu = (type, key, id = null) => {
        switch (type) {
            default:
            case 'all':
                return (
                    <Menu.Item key={'/' + key} icon={<SearchOutlined />}>
                        <NavLink to='/' onClick={() => props.filterPanel('panel', null)}>Ver Todos</NavLink>
                    </Menu.Item>
                )
            case 'add':
                return (
                    <Menu.Item key={key} icon={<PlusOutlined />}>
                        <NavLink to='/' onClick={() => props.setDrawerMenu('addPanel', true)}>Añadir Panel</NavLink>
                    </Menu.Item>
                )
            case 'addlist':
                return (
                    <Menu.Item key={key + '_' + id} icon={<PlusOutlined />}>
                        <NavLink to={'/' + id} onClick={() => props.setDrawerMenu(key, true)}>Añadir Lista</NavLink>
                    </Menu.Item>
                )
            case 'logout':
                return (
                    <Menu.Item key={key} icon={<LogoutOutlined />} onClick={() => props.setLogout()}>Cerrar Sesión</Menu.Item>
                )
        }
    }

    const renderLinePanel = (panel) => {
        return (
            <SubMenu key={panel._id + '_0'} title={<span><FolderOutlined /><span>{panel.name}</span></span>}>
                <Menu.Item key={panel._id} icon={<EyeOutlined />}>
                    <NavLink onClick={() => props.filterPanel('panel', panel._id)} to={'/' + panel._id}>Listas</NavLink>
                </Menu.Item>
                {renderLineList(panel.lists)}
                {renderLineMenu('addlist', panel._id, panel._id)}
            </SubMenu>
        )
    }

    const renderLineList = (lists) => {
        return lists.map(list => (
            <Menu.Item key={list._id} icon={<UnorderedListOutlined />}>
                <NavLink to={'/' + list.panel} onClick={() => props.filterPanel('list', list._id)}>{list.name}</NavLink>
            </Menu.Item>
        ))
    }

    return (
        <Sider collapsible collapsed={props.collapsed}>
            <div className="logo" />
            {getMenuLogged()}
        </Sider>
    )
}

const mapSateToProps = state => ({
    collapsed: state.menu.collapsed,
    theme: state.menu.theme,
    user: state.user,
})
const mapDispatchToProps = dispatch => ({
    setLogout: () => setLogout(dispatch),
    filterPanel: (type, id) => filterPanel(dispatch, type, id),
    setDrawerMenu: (id, value) => setDrawer(dispatch, id, value),
})

const connected = connect(mapSateToProps, mapDispatchToProps)(MenuLeftLogged)

export default connected