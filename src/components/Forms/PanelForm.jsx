import React from 'react'
import { connect } from 'react-redux'
import { setPanelList } from '../../services/redux/actions.js'
import { apiGetPanelList, apiAddPanel } from '../../services/api/api.js'
import { Form, Button, Row, Col, Input } from 'antd'

const PanelForm = props => {

    const getPanelList = async () => {
        apiGetPanelList(props.token)
            .then(list => props.setPanelList(list))
    }

    const addNewPanel = async(data) => {
        apiAddPanel(props.token, {name: data.name})
            .then(getPanelList)
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
                            <Button type="primary" block size="large" htmlType="submit">Añadir Lista</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    token: state.session.user.token,
})

const mapDispatchToProps = (dispatch) => ({
    setPanelList: (list) => setPanelList(dispatch, list),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(PanelForm)

export default connected