import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getPanelList, addPanel, deletePanel } from '../../services/redux/actions.js'
import Form from '../Form/Form.jsx'

let done = false;

const PanelList = props => {

    if (!done && props.token) {
        props.getPanelList(props.token)
        done = true
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

    const getForm = () => {
        const rows = [
            {id: 'name', name: 'Nombre Lista'}
        ]
        return <Form rows={rows} />
    }

    const getPanels = () => {
        return props.panels?.map(panel => (
            <div key={panel._id} className="panel">
                <h3>{panel.name}</h3>
                <span className="btn" onClick={() => deleteOnePanel(panel._id)}>Eliminar</span>
                <NavLink className="btn" to={'/' + panel._id} >Ver Panel</NavLink>
            </div>
        ))
    }

    return (
        <div className="panelList">
            <div className="form">
                {getForm()}
                <div className="row">
                    <button onClick={() => addNewPanel()}>Añadir</button>
                </div>
            </div>
            {getPanels()}
        </div>
    )
}

const mapStateToProps = state => ({
    token: state.session.user.token,
    panels: state.panel,
    form: state.form,
})
const mapDispatchToProps = (dispatch) => ({
    getPanelList: (token) => getPanelList(dispatch, token),
    addPanel: (token, data) => addPanel(dispatch, token, data),
    deletePanel: (token, id) => deletePanel(dispatch, token, id),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(PanelList)

export default connected