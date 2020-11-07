import React from 'react'
import { connect } from 'react-redux'
import { setDrawer, setPanelList, setFormData } from '../../services/redux/actions.js'
import { apiAddPanel, apiGetPanelList, apiUpdatePanel } from '../../services/api/api.js'

import ImageForm from './ImageForm'

import { Form, Button, Drawer, Input, Row } from 'antd'
const { TextArea } = Input;

const PanelForm = props => {

    const [form] = Form.useForm()

    const addNewPanel = async (data) => {
        apiAddPanel(props.token, { ...data, cover: props.photo })
            .then(() => apiGetPanelList(props.token))
            .then(panels => props.setPanelList(panels))
            .then(() => props.setDrawerPanel('addPanel', false))
            .then(() => props.emptyFormData())
            .then(() => form.resetFields())
    }

    const editPanel = async (data) => {
        const update = props.photo ? {...data, cover: props.photo } : { _id: props.form._id, ...data }
        apiUpdatePanel(props.token,  props.form._id, update)
            .then(() => apiGetPanelList(props.token))
            .then(panels => props.setPanelList(panels))
            .then(() => props.setDrawerPanel('addPanel', false))
            .then(() => props.emptyFormData())
            .then(() => form.resetFields())
    }

    const initiateForm = () => {
        if (!props.form){
            form.resetFields()
        }
        form.setFieldsValue({
            name: props.form && props.form.name ? props.form.name : '',
            description: props.form && props.form.description ? props.form.description : '',
        })
    }
    const onCloseDrawerPanel = () => {
        props.emptyFormData()
        props.setDrawerPanel('addPanel', false)
    }

    const getVisiblePanel = () => {
        const check = props.visible.filter(v => v.id === 'addPanel')
        if (check && check[0] && check[0].visible) {
            return check[0].visible
        }
        return false
    }

    const getPhoto = () => {
        var photo = 'https://images.unsplash.com/photo-1483546363825-7ebf25fb7513?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE4MDI1MX0'
        if (props.photo) {
            photo = props.photo.small
        } else if (props.form && props.form.cover && props.form.cover.small) {
            photo = props.form.cover.small
        }
        return <Row justify="center"><img style={{ marginBottom: '2eM', width: '100%' }} src={photo} alt="foto" /></Row>
    }


    return (
        <Drawer
            width={640}
            placement="right"
            closable={true}
            onClose={() => onCloseDrawerPanel()}
            visible={getVisiblePanel()}
        >
            <Form
                form={form}
                onLoad={() => initiateForm()}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={data => props.form ? editPanel(data) : addNewPanel(data)}
            >
                {getPhoto()}
                <Form.Item
                    hasFeedback
                    label='Nombre'
                    name='name'
                    rules={[
                        { required: true, message: 'El nombre es obligatorio' },
                        { min: 1, message: 'El nombre tiene que ser de 4 caracteres' },
                        { whitespace: true, message: 'No puede estar vacío' },
                    ]}>
                    <Input size="large" />
                </Form.Item>
                <Form.Item label="Descripción" name="description">
                    <TextArea showCount maxLength={100} />
                </Form.Item>

                <ImageForm />

                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" block size="large" htmlType="submit">{props.form ? 'Editar Panel' : 'Añadir Panel'}</Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

const mapStateToProps = (state) => ({
    token: state.session.user.token,
    visible: state.actions.drawers,
    photo: state.actions.photo,
    form: state.menu.data,
})

const mapDispatchToProps = (dispatch) => ({
    setPanelList: (list) => setPanelList(dispatch, list),
    setDrawerPanel: (id, value) => setDrawer(dispatch, id, value),
    emptyFormData: () => setFormData(dispatch, null),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(PanelForm)

export default connected