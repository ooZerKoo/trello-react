import React from 'react'
import { connect } from 'react-redux'
import { getListList, addList, deleteList } from '../../services/redux/actions.js'
import Form from '../Form/Form.jsx'

let done = false

const Panel = props => {

    if ((!done && props.idPanel) || (props.lists.length === 0)) {
        props.getListList(props.token, props.idPanel)
        done = true
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

    const getForm = () => {
        const rows = [
            { id: 'name', name: 'Nombre Lista' }
        ]
        return <Form rows={rows} />
    }

    return (<div className="panel">PANEL 2
        <div className="form">
            {getForm()}
            <div className="row">
                <button onClick={() => addNewList()} disabled={!props.form.status}>Añadir Lista</button>
            </div>
        </div>
        {props.lists[0]?.map(list => (
            <div key={list._id} className="list">
                <h3>{list.name}</h3>
                <span className="btn" onClick={() => deleteOneList(list._id)}>Eliminar</span>
            </div>
        ))}
    </div>)
}

const mapStateToProps = (state, extraVars) => ({
    token: state.session.user.token,
    lists: state.list.filter(v => v.id === extraVars.match.params.idPanel),
    form: state.form,
    idPanel: extraVars.match.params.idPanel,
})
const mapDispatchToProps = (dispatch) => ({
    getListList: (token, id) => getListList(dispatch, token, id),
    addList: (token, id, data) => addList(dispatch, token, id, data),
    deleteList: (token, idList, idPanel) => deleteList(dispatch, token, idList, idPanel),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Panel)

export default connected