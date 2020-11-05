import React from 'react'
import { connect } from 'react-redux'
import { setListList, setDrawer } from '../../services/redux/actions.js'
import { apiAddList, apiGetListList } from '../../services/api/api.js'
import { Form, Button, Drawer, Input } from 'antd'
const { TextArea } = Input;

const ListForm = props => {

    const [form] = Form.useForm();

    const addNewList = async (data) => {
        apiAddList(props.token, props.idPanel, { name: data.name, description: data.description })
            .then(() => apiGetListList(props.token, props.idPanel))
            .then(list => props.setListList(props.idPanel, list))
            .then(props.setDrawerList(props.idPanel, false))
            .then(form.resetFields())
    }

    const onCloseDrawerList = () => {
        props.setDrawerList(props.idPanel, false)
    }

    const getVisibleList = () => {
        const check = props.visible.filter(v => v.id === props.idPanel)
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
            onClose={() => onCloseDrawerList()}
            visible={getVisibleList()}
        >
                <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={data => addNewList(data)}>
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
                        <Button type="primary" block size="large" htmlType="submit">Añadir Lista</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        )
    
}

const mapStateToProps = (state, extraVars) => ({
    idPanel: extraVars.idPanel,
    token: state.session.user.token,
    filter: state.menu.filter.list,
    visible: state.actions.drawers,
})

const mapDispatchToProps = (dispatch) => ({
    setListList: (id, list) => setListList(dispatch, id, list),
    setDrawerList: (id, value) => setDrawer(dispatch, id, value)
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListForm)

export default connected