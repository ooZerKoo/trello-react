import React from 'react'
import { connect } from 'react-redux'
import { setListList, setDrawer, setFormData } from '../../services/redux/actions.js'
import { apiAddList, apiGetListList, apiUpdateList } from '../../services/api/api.js'

import ImageForm from './ImageForm'

import { Form, Row, Button, Drawer, Input } from 'antd'
const { TextArea } = Input;

const ListForm = props => {

    const [form] = Form.useForm();

    const addNewList = async (data) => {
        apiAddList(props.token, props.idPanel, { name: data.name, description: data.description, cover: props.photo })
            .then(() => apiGetListList(props.token, props.idPanel))
            .then(list => props.setListList(props.idPanel, list))
            .then(props.setDrawerList(props.idPanel, false))
            .then(form.resetFields())
    }

    const editList = async (data) => {
        const update = props.photo ? { _id: props.form._id, ...data, cover: props.photo} : { _id: props.form._id, ...data }
        apiUpdateList(props.token, props.idPanel, update)
            .then(() => apiGetListList(props.token, props.idPanel))
            .then(list => props.setListList(props.idPanel, list))
            .then(() => props.setDrawerList(props.idPanel, false))
            .then(() => props.emptyFormData())
            .then(form.resetFields())
    }

    const resetFields = (data) => form.resetFields()
    const onCloseDrawerList = () => props.setDrawerList(props.idPanel, false)

    const getVisibleList = () => {
        const check = props.visible.filter(v => v.id === props.idPanel)
        if (check && check[0] && check[0].visible) {
            return check[0].visible
        }
        return false
    }

    const getPhoto = () => {
        var photo = 'https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE4MDI1MX0'
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
            onClose={() => onCloseDrawerList()}
            visible={getVisibleList()}
        >
            <Form form={form} onLoad={data => resetFields(data)} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={data => props.form ? editList(data) : addNewList(data)} initialValues={props.form ? props.form : {}}>
                {getPhoto()}
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

                <ImageForm />

                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" block size="large" htmlType="submit">{props.form ? 'Editar Lista ' : 'Añadir Lista'}</Button>
                </Form.Item>
            </Form>
        </Drawer>
    )

}

const mapStateToProps = (state, extraVars) => ({
    idPanel: extraVars.idPanel,
    token: state.session.user.token,
    visible: state.actions.drawers,
    photo: state.actions.photo,
    form: state.menu.data,
})

const mapDispatchToProps = (dispatch) => ({
    setListList: (id, list) => setListList(dispatch, id, list),
    setDrawerList: (id, value) => setDrawer(dispatch, id, value),
    emptyFormData: () => setFormData(dispatch, null),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListForm)

export default connected