import React from 'react'
import { connect } from 'react-redux'
import { checkRegister, setRegister, updateFormFields } from '../../services/redux/actions.js'

const Register = props => {
    const updateFields = (event, update = true) => {
        const data = event.target.value
        const type = event.target.id
        switch (type) {
            case 'username':
                props.updateFormFields({ username: data })
                break
            case 'email':
                props.updateFormFields({ email: data })
                break
            case 'password':
                props.updateFormFields({ password: data })
                break
            case 'password2':
                props.updateFormFields({ password2: data })
                break
            default:
                break
        }
        if (update) props.updateStateRegister(props.form)
        return
    }

    const prepareRegister = () => props.setRegister(props.form.username, props.form.email, props.form.password)

    return (
        <div className="form">
            <div className="row">
                <label>Usuario</label>
                <input value={props.form.username} type="text" id="username" onChange={e => updateFields(e, false)} onKeyUp={updateFields}></input>
            </div>
            <div className="row">
                <label>E-mail</label>
                <input value={props.form.email} type="text" id="email" onChange={e => updateFields(e, false)} onKeyUp={updateFields}></input>
            </div>
            <div className="row">
                <label>Contraseña</label>
                <input value={props.form.password} type="text" id="password" onChange={e => updateFields(e, false)} onKeyUp={updateFields}></input>
            </div>
            <div className="row">
                <label>Repite la Contraseña</label>
                <input value={props.form.password2} type="text" id="password2" onChange={e => updateFields(e, false)} onKeyUp={updateFields}></input>
            </div>
            <div className="row">
                <button onClick={() => prepareRegister()} disabled={!props.form.status} >Regístrate</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    form: state.form,
})
const mapDispatchToProps = (dispatch) => ({
    updateFormFields: (fields) => updateFormFields(dispatch, fields),
    updateStateRegister: (data) => checkRegister(dispatch, data),
    setRegister: (username, email, password) => setRegister(dispatch, username, email, password)
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)

export default connected