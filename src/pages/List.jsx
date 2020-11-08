import React from 'react'
import { connect } from 'react-redux'

import ListList from '../components/List/List.jsx'
import ListForm from '../components/Forms/ListForm.jsx'

const List = props => {
    const list = props.panels.filter(v => v._id === props.idPanel)
    return (
        <React.Fragment>
            <ListForm idPanel={props.idPanel}/>
            <ListList idPanel={props.idPanel} list={list[0].lists} />
        </React.Fragment>
    )
}

const mapStateToProps = (state, extraVars) => ({
    idPanel: extraVars.idPanel,
    panels: state.user.data.panels
})

const connected = connect(mapStateToProps)(List)

export default connected