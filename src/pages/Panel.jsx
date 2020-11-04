import React from 'react'
import { connect } from 'react-redux'

import PanelList from '../components/List/Panel.jsx'
import PanelForm from '../components/Forms/PanelForm.jsx'


const Panel = props => {
    return (
        <React.Fragment>
            <PanelForm />
            <PanelList />
        </React.Fragment>
    )
}

const connected = connect()(Panel)

export default connected