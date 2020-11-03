import React from 'react'
import { connect } from 'react-redux'
import { setLogin, updateFormStatus, updateFormFields, emptyForm } from '../../services/redux/actions.js'

const Login = props => {
    const updateFields = (event) => {
        const data = event.target.value
        const type = event.target.id
        const check = (props.form.username.length >= 4 && props.form.password.length >= 4) ? true : false
        switch (type) {
            case 'username':
                props.updateFormFields({ username: data })
                props.updateFormStatus(check)
                break
            case 'password':
                props.updateFormFields({ password: data })
                props.updateFormStatus(check)
                break
            default:
                break
        }
    }

    const prepareLogin = () => {
        props.setLogin(props.form.username, props.form.password)
        props.emptyForm()
    }

    return (
        <div className="form">
            <div className="row">
                <label>Usuario</label>
                <input value={props.form.username} type="text" id="username" onChange={updateFields} onKeyUp={updateFields}></input>
            </div>
            <div className="row">
                <label>Contraseña</label>
                <input value={props.form.password} type="password" id="password" onChange={updateFields} onKeyUp={updateFields}></input>
            </div>
            <div className="row">
                <button onClick={() => prepareLogin()} disabled={!props.form.status} >Iniciar Sesión</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    form: state.form,
})
const mapDispatchToProps = (dispatch) => ({
    updateFormFields: (fields) => updateFormFields(dispatch, fields),
    updateFormStatus: (check) => updateFormStatus(dispatch, check),
    emptyForm: () => emptyForm(dispatch),
    setLogin: (username, password) => setLogin(dispatch, username, password),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default connected