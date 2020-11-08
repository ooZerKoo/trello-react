import React from 'react'
import { connect } from 'react-redux'

import PanelList from '../components/List/Panel.jsx'
import PanelForm from '../components/Forms/PanelForm.jsx'

const Panel = props => {
    return (
        <React.Fragment>
            <PanelForm />
            <PanelList panels={props.panels} />
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    panels: state.user && state.user.data && state.user.data.panels ? state.user.data.panels : [],
})

const connected = connect(mapStateToProps)(Panel)

export default connected