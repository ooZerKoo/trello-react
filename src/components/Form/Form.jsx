import React from 'react'
import { connect } from 'react-redux'
import { updateFormFields, checkRegister } from '../../services/redux/actions.js'

const Form = props => {

    const updateForm = (event) => {
        const data = event.target.value
        const name = event.target.id
        switch (name) {
            case 'name':
                props.updateFormFields({ name: data })
                break
            case 'description':
                props.updateFormFields({ description: data })
                break
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
        return
    }

    const checkRegisterForm = (event) => {
        const id = event.target.id
        props.checkRegister(props.form, id)
    }

    const getRows = (row) => {
        if (row.onblur) {
            return <div key={row.id} className="row">
                <label>{row.name}</label>
                <input id={row.id} onChange={updateForm} value={props.form[row.id]} onBlur={checkRegisterForm} type={row.type ? row.type : 'text'} />
            </div>
        }
        return <div key={row.id} className="row">
            <label>{row.name}</label>
            <input id={row.id} onChange={updateForm} value={props.form[row.id]} type={row.type ? row.type : 'text'} />
        </div>
    }

    return <React.Fragment>
        {props.rows.map((row) => getRows(row))}
    </React.Fragment>
}

const mapStateToProps = (state, extraVars) => ({
    rows: extraVars.rows,
    form: state.form,
})
const mapDispatchToProps = (dispatch) => ({
    updateFormFields: (fields) => updateFormFields(dispatch, fields),
    checkRegister: (data, id) => checkRegister(dispatch, data, id)
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)

export default connected