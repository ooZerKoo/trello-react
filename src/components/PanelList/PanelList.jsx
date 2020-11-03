import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getPanelList, addPanel, deletePanel, updateFormStatus, updateFormFields } from '../../services/redux/actions.js'

let done = false;

const PanelList = props => {

    if (!done && props.token) {
        props.getPanelList(props.token)
        done = true
    }

    const prepareForm = (event) => {
        const data = event.target.value
        const name = event.target.id
        const check = data.length > 0 ? true : false
        switch (name) {
            case 'name':
                props.updateFormFields({ name: data })
                props.updateFormStatus(check)
                break
            case 'description':
                props.updateFormFields({ description: data })
                props.updateFormStatus(check)
                break
            default:
                break
        }
        return
    }

    const addNewPanel = () => {
        const data = {
            name: props.form.name,
            description: props.form.description
        }
        props.addPanel(props.token, data)
    }

    const deleteOnePanel = (id) => {
        props.deletePanel(props.token, id)
    }

    return (
        <div className="panelList">
            <div className="form">
                <div className="row">
                    <label>Nombre Panel</label>
                    <input id="name" onChange={prepareForm} value={props.form.name} type='text' />
                </div>
                <div className="row">
                    <button onClick={addNewPanel} disabled={!props.form.status} >Añadir</button>
                </div>
            </div>

            {props.panels?.map(panel => (
                <div key={panel._id} className="panel">
                    <h3>{panel.name}</h3>
                    <span className="btn" onClick={() => deleteOnePanel(panel._id)}>Eliminar</span>
                    <NavLink className="btn" to={'/' + panel._id} >Ver Panel</NavLink>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    token: state.session.user.token,
    panels: state.panel.list,
    form: state.form,
})
const mapDispatchToProps = (dispatch) => ({
    // list
    getPanelList: (token) => getPanelList(dispatch, token),
    // actions
    addPanel: (token, data) => addPanel(dispatch, token, data),
    deletePanel: (token, id) => deletePanel(dispatch, token, id),
    // forms
    updateFormFields: (fields) => updateFormFields(dispatch, fields),
    updateFormStatus: (check) => updateFormStatus(dispatch, check),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(PanelList)

export default connected