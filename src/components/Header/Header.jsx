import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setLogout } from '../../services/redux/actions.js'
import './Header.scss'

const Header = props => {
    return (
        <header>
            <div className="container">
                {props.auth && <React.Fragment>
                        <NavLink className="btn" to='/'>Paneles</NavLink>
                        <span className="btn" onClick={() => props.logout()}>Cerrar Sesión</span>
                    </React.Fragment>}
                {!props.auth &&
                    <React.Fragment>
                        <NavLink className="btn" to='/login'>Login</NavLink>
                        <NavLink className="btn" to='/register'>Register</NavLink>
                    </React.Fragment>
                }
            </div>
        </header>
    )
}

const mapStateToProps = state => ({
    auth: state.session.authenticated,
})
const mapDispatchToProps = (dispatch) => ({
    logout: () => setLogout(dispatch)
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)

export default connected