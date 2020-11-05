import React from 'react'
import { connect } from 'react-redux'

import { toggleCollapse } from '../services/redux/actions.js'

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


const GlobalLayout = props => {

    const toggleCollapsePanel = () => props.toggleCollapse()

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
                const panelDescription = props.panel && props.panel.description ? props.panel.description : ''
                return (
                    <React.Fragment>
                        <Col span={24}>
                            <Title>{panelName}</Title>
                            <h2>{panelDescription}</h2>
                        </Col>
                        <List idPanel={props.idPanel} />
                    </React.Fragment>
                )

        }
    }

    return (
        <React.Fragment>
            <Layout>
                <LeftMenu />
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: '0 0 0 25px', textAlign: 'left' }} >
                        {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => toggleCollapsePanel(),
                        })}
                    </Header>
                    <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 'calc(100vh - 112px)', }}>
                        <Row gutter={[16, 16]}>
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
    panel: state.panel.filter(v => v._id === extra.match.params.idPanel)[0],
    filters: state.menu.filter,
    panels: state.panel,
    lists: state.list,
    tasks: state.task,
})

const mapDispatchToProps = dispatch => ({
    toggleCollapse: () => toggleCollapse(dispatch),
})

const connected = connect(mapSateToProps, mapDispatchToProps)(GlobalLayout)

export default connected