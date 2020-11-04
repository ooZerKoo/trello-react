import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { setPanelList } from '../../services/redux/actions.js'
import { Form, Button, Row, Col, Input } from 'antd'
import { apiGetPanelList, apiAddPanel, apiDeletePanel } from '../../services/api/api.js'

let done = false;

const PanelList = props => {

    const getPanelList = async () => {
        apiGetPanelList(props.token)
            .then(panels => props.setPanelList(panels))
    }

    const addNewPanel = async (data) => {
        apiAddPanel(props.token, data)
            .then(getPanelList)
    }

    const deleteOnePanel = (id) => {
        apiDeletePanel(props.token, id)
            .then(getPanelList)
    }

    const getPanels = () => {
        return props.panels?.map(panel => (
            <Row key={panel._id}>
                <h3>{panel.name}</h3>
                <Button type="danger" onClick={() => deleteOnePanel(panel._id)}>Eliminar</Button>
                <NavLink className="btn" to={'/' + panel._id} >Ver Panel</NavLink>
            </Row>
        ))
    }

    if (!done && props.token) {
        getPanelList()
        done = true
    }

    return (
        <React.Fragment>
            <Row justify="space-around">
                <Col xs={24} md={20} lg={12} xl={8}>
                    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={data => addNewPanel(data)}>
                        <Form.Item
                            hasFeedback
                            label='Nombre'
                            name='name'
                            rules={[
                                { required: true, message: 'El nombre es obligatorio' },
                                { min: 4, message: 'El nombre tiene que ser de 4 caracteres' },
                                { whitespace: true, message: 'No puede estar vacío' },
                            ]}>
                            <Input size="large" />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button type="primary" block size="large" htmlType="submit">Añadir Panel</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            {getPanels()}
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    token: state.session.user.token,
    panels: state.panel,
})
const mapDispatchToProps = (dispatch) => ({
    setPanelList: (panels) => setPanelList(dispatch, panels),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(PanelList)

export default connected