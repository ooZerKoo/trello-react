import React from 'react'
import { connect } from 'react-redux'
import { setLogin } from '../../services/redux/actions.js'
import Form from '../Form/Form.jsx'

const Login = props => {

    const prepareLogin = () => {
        props.setLogin(props.form.username, props.form.password)
    }

    const getForm = () => {
        const rows = [
            {id: 'username', name: 'Usuario'},
            {id: 'password', name: 'Contraseña', type:'password'}
        ]
        return <Form rows={rows} />
    }

    return (
        <div className="form">
            {getForm()}
            <div className="row">
                <button onClick={() => prepareLogin()} >Iniciar Sesión</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    form: state.form,
})
const mapDispatchToProps = (dispatch) => ({
    setLogin: (username, password) => setLogin(dispatch, username, password),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default connected