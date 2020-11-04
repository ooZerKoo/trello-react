import React from 'react'
import { connect } from 'react-redux'

import ListList from '../components/List/List.jsx'
import ListForm from '../components/Forms/ListForm.jsx'

const List = props => {
    return (
        <React.Fragment>
            <ListForm idPanel={props.idPanel} />
            <ListList idPanel={props.idPanel} />
        </React.Fragment>
    )
}

const mapStateToProps = (state, extraVars) => ({
    idPanel: extraVars.idPanel,
})

const connected = connect(mapStateToProps)(List)

export default connected