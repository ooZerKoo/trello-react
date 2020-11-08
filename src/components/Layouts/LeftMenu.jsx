import React from 'react'
import { connect } from 'react-redux'

import { setLogout, filterPanel, setDrawer, setLoaded, setLoading, setUser } from '../../services/redux/actions'
import { apiGetUser } from '../../services/api/api.js'

import { Layout, Menu } from 'antd'
import { LoginOutlined, PlusSquareOutlined, EyeOutlined, PlusOutlined, SearchOutlined, LogoutOutlined, FolderOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
const { Sider } = Layout
const { SubMenu } = Menu

const LeftMenu = props => {
    const doLogout = () => {
        props.setLogout()
    }

    const getMenuLists = () => {
        if (props.auth && props.token && !props.user.loaded) {
            if (!props.user.loading) {
                props.setLoading()
                apiGetUser(props.token)
                    .then(user => props.setUser(user))
            } else {
                props.setLoaded()
            }
        }
    }

    const doFilterPanel = (type, id) => {
        props.filterPanel(type, id)
    }

    const getMenuNoLogged = () => (
        <Menu theme={props.theme} mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<LoginOutlined />}><NavLink to='/login'>Inicia Sesión</NavLink></Menu.Item>
            <Menu.Item key="2" icon={<PlusSquareOutlined />}><NavLink to='/register'>Regístrate</NavLink></Menu.Item>
        </Menu>
    )

    const openDrawerMenu = (id) => {
        props.setDrawerMenu(id, true)
    }

    const getMenuLogged = () => {
        if (props.user.loaded && props.user.data) {
            var cont = 0
            return <Menu theme={props.theme} mode="inline" defaultSelectedKeys={['0']}>
                {renderLineMenu('all', cont++)}
                {props.user.data.panels.map(panel => (
                    renderLinePanel(panel)
                    ))}
                {renderLineMenu('add', 998)}
                {renderLineMenu('logout', 999)}
            </Menu>
        }
    }

    const renderLineMenu = (type, key, id = null) => {
        switch (type) {
            default:
            case 'all':
                return (
                    <Menu.Item key={key} icon={<SearchOutlined />}>
                        <NavLink to='/' onClick={() => doFilterPanel('panel', null)}>Ver Todos</NavLink>
                    </Menu.Item>
                )
            case 'add':
                return (
                    <Menu.Item key={key} icon={<PlusOutlined />}>
                        <NavLink to='/' onClick={() => openDrawerMenu('addPanel')}>Añadir Panel</NavLink>
                    </Menu.Item>
                )
            case 'addlist':
                return (
                    <Menu.Item key={key + '_' + id} icon={<PlusOutlined />}>
                        <NavLink to={'/' + id} onClick={() => openDrawerMenu(key)}>Añadir Lista</NavLink>
                    </Menu.Item>
                )
            case 'logout':
                return (
                    <Menu.Item key={key} icon={<LogoutOutlined />} onClick={() => doLogout()}>Cerrar Sesión</Menu.Item>
                )
        }
    }

    const renderLinePanel = (panel) => {
        
        return (
            <SubMenu key={panel._id + '_0'} title={<span><FolderOutlined /><span>{panel.name}</span></span>}>
                <Menu.Item key={panel._id} icon={<EyeOutlined />}>
                    <NavLink onClick={() => doFilterPanel('panel', panel._id)} to={'/' + panel._id}>Todos los listados</NavLink>
                </Menu.Item>
                {renderLineList(panel.lists)}
                {renderLineMenu('addlist', panel._id, panel._id)}
            </SubMenu>
        )
    }

    const renderLineList = (lists) => {
        return lists.map(list => (
            <Menu.Item key={list._id} icon={<UnorderedListOutlined />}>
                <NavLink to={'/' + list.panel} onClick={() => doFilterPanel('list', list._id)}>{list.name}</NavLink>
            </Menu.Item>
        ))
    }

    if (props.auth && props.token) {
        getMenuLists()
        return (
            <Sider collapsible collapsed={props.collapsed}>
                <div className="logo" />
                {getMenuLogged()}
            </Sider>
        )
    } else {
        return (
            <Sider collapsible collapsed={props.collapsed}>
                <div className="logo" />
                {getMenuNoLogged()}
            </Sider>
        )
    }
}

const mapSateToProps = state => ({
    collapsed: state.menu.collapsed,
    auth: state.session.authenticated,
    theme: state.menu.theme,
    visible: state.actions.drawers,
    token: state.session.user.token,
    user: state.user,
})
const mapDispatchToProps = dispatch => ({
    setLogout: () => setLogout(dispatch),
    filterPanel: (type, id) => filterPanel(dispatch, type, id),
    setDrawerMenu: (id, value) => setDrawer(dispatch, id, value),
    setLoaded: () => setLoaded(dispatch),
    setLoading: () => setLoading(dispatch),
    setUser: (user) => setUser(dispatch, user),
})

const connected = connect(mapSateToProps, mapDispatchToProps)(LeftMenu)

export default connected