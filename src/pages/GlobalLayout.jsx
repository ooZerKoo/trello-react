import React from 'react'
import { connect } from 'react-redux'

import { toggleCollapse } from '../services/redux/actions.js'

import LeftMenu from '../components/Layouts/LeftMenu.jsx'

import './GlobalLayout.scss'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Panel from './Panel.jsx'
import List from './List.jsx'
import Loading from './Loading.jsx'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Row, Typography, Col } from 'antd';

const { Header, Content } = Layout
const { Title } = Typography


const GlobalLayout = props => {

    const getPage = () => {
        switch (props.page) {
            default:
            case '/login':
                return (
                    <React.Fragment>
                        <Col span={24} key='login'>
                            <Title>Iniciar Sesión</Title>
                            <Login />
                        </Col>
                    </React.Fragment>
                )
            case '/register':
                return (
                    <React.Fragment>
                        <Col span={24} key='register'>
                            <Title>Regístrate</Title>
                            <Register />
                        </Col>
                    </React.Fragment>
                )
            case '/':
                if (props.user.loaded) {
                    return (
                        <React.Fragment>
                            <Col span={24} key='paneles'>
                                <Title>Paneles</Title>
                            </Col>
                            <Panel />
                        </React.Fragment>
                    )
                } else {
                    return (
                        <React.Fragment>
                            <Loading />
                        </React.Fragment>
                    )
                }
            case '/:idPanel':
                const panel = props.user.data.panels.filter(v => v._id === props.idPanel)
                return (
                    <React.Fragment>
                        <Col span={24} key='panelTitle'>
                            <Title>{panel[0].name}</Title>
                            <h2>{panel[0].description}</h2>
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
                            onClick: () => props.toggleCollapse(),
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
    page: extra.match.path,
    idPanel: extra.match.params.idPanel,
    user: state.user,
})

const mapDispatchToProps = dispatch => ({
    toggleCollapse: () => toggleCollapse(dispatch),
})

const connected = connect(mapSateToProps, mapDispatchToProps)(GlobalLayout)

export default connected