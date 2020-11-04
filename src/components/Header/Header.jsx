import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setLogout } from '../../services/redux/actions.js'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;


const Headerdesign = props => {
    return (
        <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal">
                {props.auth &&
                    <React.Fragment>
                        <Menu.Item key="1" className={props.path === '/' ? 'active' : ''}><NavLink to='/'>Paneles</NavLink></Menu.Item>
                        <Menu.Item key="2"><NavLink to='/' onClick={() => props.logout()}>Cerrar Sesión</NavLink></Menu.Item>
                    </React.Fragment>
                }
                {!props.auth && 
                <React.Fragment>
                    <Menu.Item key="1" className={props.path === '/login' ? 'active' : ''}><NavLink to='/login'>Login</NavLink></Menu.Item>    
                    <Menu.Item key="2" className={props.path === '/register' ? 'active' : ''}><NavLink to='/register'>Regístrate</NavLink></Menu.Item>    
                </React.Fragment>
                }
            </Menu>
        </Header>
    )
}

const mapStateToProps = (state, location) => ({
    auth: state.session.authenticated,
    path: null,
    state: state,
    extra: location,
})
const mapDispatchToProps = (dispatch) => ({
    logout: () => setLogout(dispatch)
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Headerdesign)

export default connected