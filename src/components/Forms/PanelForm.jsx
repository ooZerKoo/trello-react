import React from 'react'
import { connect } from 'react-redux'
import { setPanelList } from '../../services/redux/actions.js'
import { apiGetPanelList, apiAddPanel } from '../../services/api/api.js'

import { Form, Button, Col, Input } from 'antd'
const { TextArea } = Input;

const PanelForm = props => {

    const getPanelList = async () => {
        apiGetPanelList(props.token)
            .then(list => props.setPanelList(list))
    }

    const addNewPanel = async (data) => {
        apiAddPanel(props.token, { name: data.name, description: data.description })
            .then(getPanelList)
    }

    if (props.filter === 'form') {
        return (
            <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
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
                    <Form.Item label="Descripción" name="description">
                        <TextArea showCount maxLength={100} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 24 }}>
                        <Button type="primary" block size="large" htmlType="submit">Añadir Panel</Button>
                    </Form.Item>
                </Form>
            </Col>
        )
    } else {
        return <React.Fragment></React.Fragment>
    }
}

const mapStateToProps = (state) => ({
    token: state.session.user.token,
    filter: state.menu.filter.panel
})

const mapDispatchToProps = (dispatch) => ({
    setPanelList: (list) => setPanelList(dispatch, list),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(PanelForm)

export default connected