import React from 'react'
import { connect } from 'react-redux'
import { setDrawer, setTaskList } from '../../services/redux/actions.js'
import { apiAddTask, apiGetTaskList } from '../../services/api/api.js'

import { Form, Button, Input, Drawer } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { TextArea } = Input;

const PanelForm = props => {

    const [form] = Form.useForm();

    const addNewTask = async (data) => {
        apiAddTask(props.token, props.idList, { name: data.name, description: data.description })
            .then(() => apiGetTaskList(props.token, props.idList))
            .then(list => props.setTaskList(props.idList, list))
            .then(props.setDrawerTask(props.idList, false))
            .then(form.resetFields())
    }

    const onCloseDrawerTask = () => {
        props.setDrawerTask(props.idList, false)
    }
    
    const openDrawerTask = () => {
        props.setDrawerTask(props.idList, true)
    }

    const getVisibleTask = () => {
        const check = props.visible.filter(v => v.id === props.idList)
        if (check && check[0] && check[0].visible) {
            return check[0].visible
        }
        return false
    }


    return <React.Fragment>
        <PlusOutlined key="ellipsis" onClick={() => openDrawerTask()} />
        <Drawer
            width={640}
            placement="right"
            closable={true}
            onClose={() => onCloseDrawerTask()}
            visible={getVisibleTask()}
        >
            <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={data => addNewTask(data)}>
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
    </React.Fragment>
}

const mapStateToProps = (state) => ({
    token: state.session.user.token,
    filter: state.menu.filter.panel,
    visible: state.actions.drawers,
})

const mapDispatchToProps = (dispatch) => ({
    setTaskList: (id, list) => setTaskList(dispatch, id, list),
    setDrawerTask: (id, value) => setDrawer(dispatch, id, value)
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(PanelForm)

export default connected