import React from 'react'
import { connect } from 'react-redux'
import { getListList, addList, deleteList, updateFormFields, updateFormStatus } from '../../services/redux/actions.js'

let done = false

const Panel = props => {

    if ((!done && props.idPanel) || (props.lists.length === 0)) {
        props.getListList(props.token, props.idPanel)
        done = true
    }

    const prepareForm = (event) => {
        const data = event.target.value
        const check = data.length > 0 ? true : false
        props.updateFormFields({ name: data })
        props.updateFormStatus(check)
    }

    const addNewList = () => {
        const data = {
            name: props.form.name,
        }
        props.addList(props.token, props.idPanel, data)
    }

    const deleteOneList = (idList) => {
        props.deleteList(props.token, idList, props.idPanel)
    }

    return (<div className="panel">PANEL 2
        <div className="form">
            <div className="row">
                <label>Nombre</label>
                <input type="text" id="name" onChange={prepareForm} onKeyUp={prepareForm} />
            </div>
            <div className="row">
                <button onClick={addNewList} disabled={!props.form.status}>Añadir Lista</button>
            </div>
        </div>
        {props.lists[0]?.list.map(list => (
            <div key={list._id} className="list">
                <h3>{list.name}</h3>
                <span className="btn" onClick={() => deleteOneList(list._id)}>Eliminar</span>
            </div>
        ))}
    </div>)
}

const mapStateToProps = (state, extraVars) => ({
    token: state.session.user.token,
    lists: state.list.list.filter(v => v.id === extraVars.match.params.idPanel),
    form: state.form,
    idPanel: extraVars.match.params.idPanel,
})
const mapDispatchToProps = (dispatch) => ({
    // list
    getListList: (token, id) => getListList(dispatch, token, id),
    // actions
    addList: (token, id, data) => addList(dispatch, token, id, data),
    deleteList: (token, idList, idPanel) => deleteList(dispatch, token, idList, idPanel),
    // forms
    updateFormFields: (fields) => updateFormFields(dispatch, fields),
    updateFormStatus: (check) => updateFormStatus(dispatch, check),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Panel)

export default connected