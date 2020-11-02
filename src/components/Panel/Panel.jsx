import React from 'react'
import { connect } from 'react-redux'
import { getListList, addList, deleteList, setGetDataDone, updateFormFields, updateFormStatus } from '../../services/redux/actions.js'

const Panel = props => {

    if (!props.gotdata) {
        props.getListList(props.token, props.idPanel)
        props.setGetDataDone()
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

    const deleteOneList = (id) => {
        props.deleteList(props.token, id)
    }

    return (<div className="panel">PANEL 2
        <div className="form">
            <div className="row">
                <label>Nombre</label>
                <input type="text" id="name" onChange={prepareForm} onKeyUp={prepareForm} />
            </div>
            <div className="row">
                <button onClick={addNewList}>Añadir Lista</button>
            </div>
        </div>
        {props.lists.map(list => (
            <div key={list._id} className="list">
                <h3>{list.name}</h3>
                <span onClick={() => deleteOneList(list._id)}>Eliminar</span>
            </div>
        ))}
    </div>)
}

const mapStateToProps = (state, extraVars) => ({
    token: state.token,
    lists: state.list,
    form: state.form,
    status: state.form.status,
    gotdata: state.gotdata,
    idPanel: extraVars.match.params.idPanel
})
const mapDispatchToProps = (dispatch) => ({
    // list
    getListList: (token, id) => getListList(dispatch, token, id),
    // actions
    addList: (token, id, data) => addList(dispatch, token, id, data),
    deleteList: (token, id) => deleteList(dispatch, token, id),
    // data
    setGetDataDone: () => setGetDataDone(dispatch),
    // forms
    updateFormFields: (fields) => updateFormFields(dispatch, fields),
    updateFormStatus: (check) => updateFormStatus(dispatch, check)
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Panel)

export default connected