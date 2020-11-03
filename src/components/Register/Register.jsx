import React from 'react'
import { connect } from 'react-redux'
import { setRegister } from '../../services/redux/actions.js'
import Form from '../Form/Form.jsx'

const Register = props => {

    const prepareRegister = () => {
        props.setRegister(props.form.username, props.form.email, props.form.password)
    }

    const getForm = () => {
        const rows = [
            { id: 'username', name: 'Nombre de Usuario', onblur: 'checkRegister' },
            { id: 'email', name: 'E-mail', onblur: 'checkRegister' },
            { id: 'password', name: 'Contraseña', type: 'password' },
            { id: 'password2', name: 'Repite la contraseña', type: 'password' }
        ]
        return <Form rows={rows} />
    }

    return (
        <div className="form">
            {getForm()}
            <div className="row">
                <button onClick={() => prepareRegister()} >Regístrate</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    form: state.form,
})
const mapDispatchToProps = (dispatch) => ({
    setRegister: (username, email, password) => setRegister(dispatch, username, email, password)
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)

export default connected