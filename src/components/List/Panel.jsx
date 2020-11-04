import React from 'react'
import { connect } from 'react-redux'
import { setPanelList, setVisible } from '../../services/redux/actions.js'
import { apiGetPanelList, apiDeletePanel } from '../../services/api/api.js'

import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Card, Popconfirm, Col } from 'antd'
import { NavLink } from 'react-router-dom';
const { Meta } = Card;

const PanelList = props => {

    const cover = <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />

    const getPanelList = async () => {
        apiGetPanelList(props.token)
            .then(list => props.setPanelList(list))
    }

    const deleteOnePanel = (id) => {
        apiDeletePanel(props.token, id)
            .then(getPanelList)
    }

    const showPopconfirm = (id) => props.setVisible(id, true)
    const handleCancel = (id) => props.setVisible(id, false)

    const renderPanels = (panel) => {
        if (!props.filter || props.filter === panel._id) {
            const currentArray = props.actions.filter(v => v.id === panel._id)
            const current = currentArray[0] ? currentArray[0] : { visible: false }
            const actions = [
                <Popconfirm
                    title='¿Quieres eliminarlo?'
                    onConfirm={() => deleteOnePanel(panel._id)}
                    onCancel={() => handleCancel(panel._id)}
                    visible={current.visible}
                >
                    <DeleteOutlined key="edit" onClick={() => showPopconfirm(panel._id)} />
                </Popconfirm>
                ,
                <NavLink to={'/' + panel._id}><EyeOutlined key="ellipsis" /></NavLink>,
            ]
            return (
                <Col key={panel._id} xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
                    <Card key={panel._id} cover={cover} actions={actions}>
                        <Meta title={panel.name} description={panel.description} />
                    </Card>
                </Col >
            )
        }
    }

    return (<React.Fragment>{props.panels.map(panel => (renderPanels(panel)))}</React.Fragment>)
}

const mapStateToProps = (state) => ({
    panels: state.panel,
    token: state.session.user.token,
    actions: state.actions.actions,
    filter: state.menu.filter.panel,
})
const mapDispatchToProps = (dispatch) => ({
    setPanelList: (list) => setPanelList(dispatch, list),
    setVisible: (id, value) => setVisible(dispatch, id, value),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(PanelList)

export default connected