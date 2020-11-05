import React from 'react'
import { connect } from 'react-redux'
import { setDrawer, setPanelList } from '../../services/redux/actions.js'
import { apiAddPanel, apiGetPanelList } from '../../services/api/api.js'

import { Form, Button, Drawer, Input } from 'antd'
const { TextArea } = Input;

const PanelForm = props => {

    const [form] = Form.useForm()

    const addNewPanel = async (data) => {
        apiAddPanel(props.token, { name: data.name, description: data.description })
            .then(() => apiGetPanelList(props.token))
            .then(panels => props.setPanelList(panels))
            .then(() => props.setDrawerPanel('addPanel', false))
            .then(() => form.resetFields())
    }

    const onCloseDrawerPanel = () => {
        props.setDrawerPanel('addPanel', false)
    }

    const getVisiblePanel = () => {
        const check = props.visible.filter(v => v.id === 'addPanel')
        if (check && check[0] && check[0].visible) {
            return check[0].visible
        }
        return false
    }


    return (
        <Drawer
            width={640}
            placement="right"
            closable={true}
            onClose={() => onCloseDrawerPanel()}
            visible={getVisiblePanel()}
        >
            <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={data => addNewPanel(data)}>
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
        </Drawer>
    )
}

const mapStateToProps = (state) => ({
    token: state.session.user.token,
    filter: state.menu.filter.panel,
    visible: state.actions.drawers,
})

const mapDispatchToProps = (dispatch) => ({
    setPanelList: (list) => setPanelList(dispatch, list),
    setDrawerPanel: (id, value) => setDrawer(dispatch, id, value)
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(PanelForm)

export default connected