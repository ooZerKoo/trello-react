import React from 'react'
import { connect } from 'react-redux'

import { setLoaded, setLoading, setUser, toggleCollapse } from '../services/redux/actions.js'

import MenuLeftLogged from '../components/Menus/Left/MenuLeftLogged.jsx'
import MenuLeftNoLogged from '../components/Menus/Left/MenuLeftNoLogged.jsx'
import MenuLeftLoading from '../components/Menus/Left/MenuLeftLoading.jsx'

import './GlobalLayout.scss'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Panel from './Panel.jsx'
import List from './List.jsx'
import Loading from './Loading.jsx'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Row, Typography, Col } from 'antd';
import { apiGetUser } from '../services/api/api.js'

const { Header, Content } = Layout
const { Title } = Typography


const GlobalLayout = props => {
    const getMenu = () => {
        if ((props.auth && props.user.loaded) || (props.auth && props.user.data)) {
            return <MenuLeftLogged activeNav={props.location.pathname} />
        } 
        if (props.auth && props.user.loading) {
            return <MenuLeftLoading />
        }
        return <MenuLeftNoLogged />
    }

    const getHeader = () => {
        return (
            <Header className="site-layout-background" style={{ padding: '0 0 0 25px', textAlign: 'left' }} >
                {props.collapsed && <MenuUnfoldOutlined className='trigger' onClick={() => props.toggleCollapse()} />}
                {props.collapsed && <MenuFoldOutlined className='trigger' onClick={() => props.toggleCollapse()} />}
            </Header>
        )
    }

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
                return (
                    <React.Fragment>
                        <Col span={24} key='paneles'>
                            <Title>Paneles</Title>
                            <h2>Gestiona tus listas con diferentes paneles</h2>
                        </Col>
                        {props.user.loaded || props.user.data ? <Panel /> : <Loading />}
                    </React.Fragment>
                )
            case '/:idPanel':
                const panel = props.user.data.panels.filter(v => v._id === props.idPanel)
                if (props.user.loaded || props.user.data) {
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
                return (
                    <React.Fragment>
                        <Col span={24} key='panelTitle'>
                            <Loading />
                        </Col>
                    </React.Fragment>
                )
        }
    }


    if (props.auth && props.token && !props.user.loaded) {
        if (!props.user.loading) {
            setTimeout(() => {
                props.setLoading()
                apiGetUser(props.token)
                    .then(user => props.setUser(user))
                    .then(() => props.setLoaded())
            }, 300)
        }
    }

    return (
        <Layout>
            {getMenu()}
            <Layout className="site-layout">
                {getHeader()}
                <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 'calc(100vh - 112px)', }}>
                    <Row gutter={[16, 16]}>
                        {getPage()}
                    </Row>
                </Content>
            </Layout>
        </Layout>
    )
}

const mapSateToProps = (state, extra) => ({
    collapsed: state.menu.collapsed,
    page: extra.match.path,
    idPanel: extra.match.params.idPanel,
    auth: state.session.authenticated,
    user: state.user,
    token: state.session.user.token,
})

const mapDispatchToProps = dispatch => ({
    toggleCollapse: () => toggleCollapse(dispatch),
    setLoaded: () => setLoaded(dispatch),
    setLoading: () => setLoading(dispatch),
    setUser: (user) => setUser(dispatch, user),
})

const connected = connect(mapSateToProps, mapDispatchToProps)(GlobalLayout)

export default connected