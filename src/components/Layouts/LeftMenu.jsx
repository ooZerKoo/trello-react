import React from 'react'
import { connect } from 'react-redux'

import { setLogout, filterPanel, setDrawer, setPanelList, addListList, setTaskList } from '../../services/redux/actions'
import { apiGetListList, apiGetPanelList, apiGetTaskList } from '../../services/api/api.js'

import { Layout, Menu } from 'antd'
import { LoginOutlined, PlusSquareOutlined, EyeOutlined, PlusOutlined, SearchOutlined, LogoutOutlined, FolderOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
const { Sider } = Layout
const { SubMenu } = Menu

const LeftMenu = props => {
    const doLogout = () => {
        props.setLogout()
    }

    const getMenuLists = async () => {
        if (props.token && !props.lists[0]) {
            // get panel
            apiGetPanelList(props.token)
                // set panel to menu
                .then(panels => props.menuSetPanelList(panels))
                .then(panels => panels.payload.map(panel =>
                    // get list
                    apiGetListList(props.token, panel._id)
                        // set list to menu
                        .then(lists => props.menuSetListList(panel._id, lists))
                        .then(lists => lists.payload.list.map(list =>
                            // get task
                            apiGetTaskList(props.token, list._id)
                                // set task to menu
                                .then(tasks => props.menuSetTaskList(list._id, tasks))
                        ))
                ))
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
        if (props.lists[0]) {
            var cont = 0
            return <Menu theme={props.theme} mode="inline" defaultSelectedKeys={['0']}>
                {renderLineMenu('all', cont++)}
                {props.panels.map(panel => (
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
        const lists = props.lists && props.lists.length > 0 ? props.lists.filter(v => v.id === panel._id) : []
        const finalData = lists[0] && lists[0].list ? lists[0].list : []
        return (
            <SubMenu key={panel._id + '_0'} title={<span><FolderOutlined /><span>{panel.name}</span></span>}>
                <Menu.Item key={panel._id} icon={<EyeOutlined />}>
                    <NavLink onClick={() => doFilterPanel('panel', panel._id)} to={'/' + panel._id}>Todos los listados</NavLink>
                </Menu.Item>
                {renderLineList(finalData)}
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
    getMenuLists()

    return (
        <Sider collapsible collapsed={props.collapsed}>
            <div className="logo" />
            {props.auth && getMenuLogged()}
            {!props.auth && getMenuNoLogged()}
        </Sider>
    )
}

const mapSateToProps = state => ({
    panels: state.panel,
    lists: state.list,
    collapsed: state.menu.collapsed,
    auth: state.session.authenticated,
    theme: state.menu.theme,
    visible: state.actions.drawers,
    token: state.session.user.token
})
const mapDispatchToProps = dispatch => ({
    setLogout: () => setLogout(dispatch),
    filterPanel: (type, id) => filterPanel(dispatch, type, id),
    setDrawerMenu: (id, value) => setDrawer(dispatch, id, value),
    menuSetPanelList: (panels) => setPanelList(dispatch, panels),
    menuSetListList: (idPanel, list) => addListList(dispatch, idPanel, list),
    menuSetTaskList: (idList, tasks) => setTaskList(dispatch, idList, tasks),
})

const connected = connect(mapSateToProps, mapDispatchToProps)(LeftMenu)

export default connected