import React from 'react'
import { connect } from 'react-redux'
import { setDrawer, setTaskList } from '../../services/redux/actions.js'
import { apiAddTask, apiGetTaskList } from '../../services/api/api.js'

import { Form, Button, Input, Col, Divider } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { TextArea } = Input;

const TaskForm = props => {

    const [form] = Form.useForm();

    const addNewTask = async (data) => {
        apiAddTask(props.token, props.idList, { ...data, status: false })
            .then(() => apiGetTaskList(props.token, props.idList))
            .then(list => props.setTaskList(props.idList, list))
            .then(props.setDrawerTask(props.idList, false))
            .then(form.resetFields())
    }

    const toggleTaskForm = () => {
        const check = props.visible.filter(v => v.id === props.idList)
        if (!check || !check[0]) {
            props.setDrawerTask(props.idList, true)
        } else {
            props.setDrawerTask(props.idList, !check[0].visible)
        }
    }

    const getVisibleTask = () => {
        const check = props.visible.filter(v => v.id === props.idList)
        if (check && check[0] && check[0].visible) {
            return check[0].visible ? 'block' : 'none'
        }
        return 'none'
    }


    return (
        <React.Fragment>
            <Divider />
            <Col span={24} style={{ textAlign: 'center' }}>
                <Button onClick={() => toggleTaskForm()} type='dashed'>
                    <PlusOutlined key="ellipsis"></PlusOutlined> Añade una Tarea
            </Button>
            </Col>

            <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={data => addNewTask(data)} style={{ display: getVisibleTask() }}>
                <Form.Item
                    hasFeedback
                    label='Nombre'
                    name='name'
                    rules={[
                        { required: true, message: 'El nombre es obligatorio' },
                        { min: 1, message: 'No puede estar vacío' },
                        { whitespace: true, message: 'No puede estar vacío' },
                    ]}>
                    <Input size="large" />
                </Form.Item>
                <Form.Item label="Descripción" name="description">
                    <TextArea showCount maxLength={100} />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" block size="large" htmlType="submit">Añadir Tarea</Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    token: state.session.user.token,
    visible: state.actions.drawers,
})

const mapDispatchToProps = (dispatch) => ({
    setTaskList: (id, list) => setTaskList(dispatch, id, list),
    setDrawerTask: (id, value) => setDrawer(dispatch, id, value)
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskForm)

export default connected