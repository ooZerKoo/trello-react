import React from 'react'
import { connect } from 'react-redux'

import { apiGetListList, apiGetPanelList, apiGetTaskList } from './../services/api/api.js'
import { setPanelList, setListList, setTaskList, toggleCollapse } from '../services/redux/actions.js'

import LeftMenu from '../components/Layouts/LeftMenu.jsx'

import './GlobalLayout.scss'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Panel from './Panel.jsx'
import List from './List.jsx'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Row, Typography, Col } from 'antd';

const { Header, Content } = Layout
const { Title } = Typography


var done = false
const GlobalLayout = props => {

    const toggleCollapsePanel = () => props.toggleCollapse()

    const getMenuLists = async () => {
        const panels = await apiGetPanelList(props.token)
        props.menuSetPanelList(panels)

        panels.map(async panel => {
            var lists = await apiGetListList(props.token, panel._id)
            props.menuSetListList(panel._id, lists)

            lists.map(async list => {
                var tasks = await apiGetTaskList(props.token, list._id)
                props.menuSetTaskList(list._id, tasks)
            })
        })
        done = true
    }

    const getPage = () => {
        switch (props.page) {
            default:
            case '/login':
                return (
                    <React.Fragment>
                        <Col span={24}>
                            <Title>Iniciar Sesión</Title>
                            <Login />
                        </Col>
                    </React.Fragment>
                )
            case '/register':
                return (
                    <React.Fragment>
                        <Col span={24}>
                            <Title>Regístrate</Title>
                            <Register />
                        </Col>
                    </React.Fragment>
                )
            case '/':
                if (!done && props.token) {
                    getMenuLists()
                }
                return (
                    <React.Fragment>
                        <Col span={24}>
                            <Title>Paneles</Title>
                        </Col>
                        <Panel />
                    </React.Fragment>
                )
            case '/:idPanel':
                const panelName = props.panel && props.panel.name ? props.panel.name : ''
                if (!done && props.token) {
                    getMenuLists()
                }
                return (
                    <React.Fragment>
                        <Col span={24}>
                            <Title>{panelName}</Title>
                        </Col>
                        <List idPanel={props.idPanel} />
                    </React.Fragment>
                )
        }
    }

    return (
        <React.Fragment>
            <Layout>
                <LeftMenu page={props.page} />
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: '0 0 0 25px', textAlign: 'left' }} >
                        {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => toggleCollapsePanel(),
                        })}
                    </Header>
                    <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 'calc(100vh - 112px)', }}>
                        <Row gutter={[16, 16]} align="middle">
                            {getPage()}
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        </React.Fragment>
    )
}

const mapSateToProps = (state, extra) => ({
    collapsed: state.menu.collapsed,
    auth: state.session.authenticated,
    token: state.session.user.token,
    page: extra.match.path,
    idPanel: extra.match.params.idPanel,
    panels: state.panel,
    panel: state.panel.filter(v => v._id === extra.match.params.idPanel)[0],
    lists: state.list,
    tasks: state.task,
    filters: state.menu.filter,
})

const mapDispatchToProps = dispatch => ({
    toggleCollapse: () => toggleCollapse(dispatch),
    menuSetPanelList: (panels) => setPanelList(dispatch, panels),
    menuSetListList: (idPanel, list) => setListList(dispatch, idPanel, list),
    menuSetTaskList: (idList, tasks) => setTaskList(dispatch, idList, tasks),
})

const connected = connect(mapSateToProps, mapDispatchToProps)(GlobalLayout)

export default connected