import React from 'react'
import { connect } from 'react-redux'
import { setPanelList } from '../../services/redux/actions.js'
import { apiGetPanelList, apiDeletePanel } from '../../services/api/api.js'

import { Row, Typography, Button } from 'antd'
const { Title, Paragraph, Link } = Typography

let done = false
const PanelList = props => {
    const getPanelList = async () => {
        apiGetPanelList(props.token)
        .then(list => props.setPanelList(list))
    }
    
    const deleteOnePanel = (id) => {
        apiDeletePanel(props.token, id)
        .then(getPanelList)
    }
    
    if (props.token && !done) {
        getPanelList()
        done = true
    }
    return (<React.Fragment>
        {props.panels?.map(panel => (
            <Row key={panel._id}>
                <Title>{panel.name}</Title>
                <Paragraph>{panel.description}</Paragraph>
                <Row>
                    <Button type="danger" onClick={() => deleteOnePanel(panel._id)}>Eliminar</Button>
                    <Link className="btn" type="primary" href={'/' + panel._id} >Ver Panel</Link>
                </Row>
            </Row>
        ))}
    </React.Fragment>)
}

const mapStateToProps = (state) => ({
    panels: state.panel,
    token: state.session.user.token,
})
const mapDispatchToProps = (dispatch) => ({
    setPanelList: (list) => setPanelList(dispatch, list),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(PanelList)

export default connected