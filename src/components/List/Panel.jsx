import React from 'react'
import { connect } from 'react-redux'
import { setDrawer, setPanelList, setVisible, setFormData } from '../../services/redux/actions.js'
import { apiGetPanelList, apiDeletePanel } from '../../services/api/api.js'

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Popconfirm, Col, Empty, Button } from 'antd'

const { Meta } = Card;

const PanelList = props => {

    const coverDefault = {small: "https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE4MDI1MX0"}
    const cover = <img src={coverDefault.small} alt="cover" />

    const getPanelList = async () => {
        apiGetPanelList(props.token)
            .then(list => props.setPanelList(list))
    }
    const deleteOnePanel = (id) => {
        apiDeletePanel(props.token, id)
            .then(getPanelList)
    }
    const openDrawerPanel = () => props.setDrawerPanel(true)
    const openDrawerPanelEdit = (data) => {
        props.setFormDataPanel(data)
        openDrawerPanel()
    }
    const showPopconfirm = (id) => props.setVisible(id, true)
    const handleCancel = (id) => props.setVisible(id, false)

    const renderPanels = () => props.panels.map(panel => renderPanel(panel))

    const renderPanel = (panel) => {
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
                    <DeleteOutlined key="delete" onClick={() => showPopconfirm(panel._id)} />
                </Popconfirm>
                ,
                <EditOutlined key="edit" onClick={() => openDrawerPanelEdit(panel)} />
            ]
            return (
                <Col key={'panelList_'+panel._id} xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
                    <Card key={panel._id} cover={panel.cover ? <img alt={panel.name} src={panel.cover.small} /> : cover} actions={actions}>
                        <Meta title={panel.name} description={panel.description} />
                    </Card>
                </Col >
            )
        }
    }

    if (props.panels.length > 0) {
        return <React.Fragment>{renderPanels()}</React.Fragment>
    }
    return (
        <Col span={24} key='panelList'>
            <Empty description='No hay ningún panel creado'>
                <Button type="primary" onClick={() => openDrawerPanel('addPanel')}><PlusOutlined /> Añade una Panel</Button>
            </Empty>
        </Col>
    )
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
    setDrawerPanel: (value) => setDrawer(dispatch, 'addPanel', value),
    setFormDataPanel: (data) => setFormData(dispatch, data),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(PanelList)

export default connected