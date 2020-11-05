import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'
import { LoginOutlined, PlusSquareOutlined, EyeOutlined, PlusOutlined, SearchOutlined, LogoutOutlined, FolderOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { setLogout, filterPanel } from '../../services/redux/actions'
import { NavLink } from 'react-router-dom'
const { Sider } = Layout
const { SubMenu } = Menu

const LeftMenu = props => {
    const doLogout = () => {
        props.setLogout()
    }

    const doFilterPanel = (type, id) => {
        props.filterPanel(type, id)
    }

    const getMenuLogged = () => {
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
                        <NavLink to='/' onClick={() => doFilterPanel('panel', 'form')}>Añadir Panel</NavLink>
                    </Menu.Item>
                )
            case 'addlist':
                return (
                    <Menu.Item key={key + '_' + id} icon={<PlusOutlined />}>
                        <NavLink to={'/' + id} onClick={() => doFilterPanel('list', 'form')}>Añadir Lista</NavLink>
                    </Menu.Item>
                )
            case 'logout':
                return (
                    <Menu.Item key={key} icon={<LogoutOutlined />} onClick={() => doLogout()}>Cerrar Sesión</Menu.Item>
                )
        }
    }

    const renderLinePanel = (panel) => {
        const lists = props.lists.filter(v => v.id === panel._id)
        const finalData = lists[0] && lists[0].list ? lists[0].list : []
        var cont = 0
        return (
            <SubMenu key={panel._id + '_0'} title={<span><FolderOutlined /><span>{panel.name}</span></span>}>
                <Menu.Item key={panel._id} icon={<EyeOutlined />}>
                    <NavLink onClick={() => doFilterPanel('panel', panel._id)} to={'/' + panel._id}>Todos los listados</NavLink>
                </Menu.Item>
                {renderLineList(finalData)}
                {renderLineMenu('addlist', panel._id + '_' + cont++, panel._id)}
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

    if (props.panels.length > 0) {
        return (
            <Sider collapsible collapsed={props.collapsed}>
                <div className="logo" />
                {props.auth && getMenuLogged()}
                {!props.auth &&
                    <Menu theme={props.theme} mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<LoginOutlined />}><NavLink to='/login'>Inicia Sesión</NavLink></Menu.Item>
                        <Menu.Item key="2" icon={<PlusSquareOutlined />}><NavLink to='/register'>Regístrate</NavLink></Menu.Item>
                    </Menu>}
            </Sider>
        )
    } else {
        return (
            <Sider collapsible collapsed={false}>
                <div className="logo" />
            </Sider>
        )
    }
}

const mapSateToProps = state => ({
    panels: state.panel,
    lists: state.list,
    collapsed: state.menu.collapsed,
    auth: state.session.authenticated,
    theme: state.menu.theme,
})
const mapDispatchToProps = dispatch => ({
    setLogout: () => setLogout(dispatch),
    filterPanel: (type, id) => filterPanel(dispatch, type, id)
})

const connected = connect(mapSateToProps, mapDispatchToProps)(LeftMenu)

export default connected