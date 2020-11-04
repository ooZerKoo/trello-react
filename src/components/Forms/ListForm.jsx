import React from 'react'
import { connect } from 'react-redux'
import { setListList } from '../../services/redux/actions.js'
import { apiGetListList, apiAddList } from '../../services/api/api.js'
import { Form, Button, Col, Input } from 'antd'
const { TextArea } = Input;

const ListForm = props => {

    const getListList = async () => {
        apiGetListList(props.token, props.idPanel)
            .then(list => props.setListList(props.idPanel, list))
    }

    const addNewList = async (data) => {
        apiAddList(props.token, props.idPanel, { name: data.name, description: data.description })
            .then(getListList)
    }

    if (props.filter === 'form') {
        return (
            <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
                <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={data => addNewList(data)}>
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
            </Col>
        )
    }
    else {
        return <React.Fragment></React.Fragment>
    }
}

const mapStateToProps = (state, extraVars) => ({
    idPanel: extraVars.idPanel,
    token: state.session.user.token,
    filter: state.menu.filter.list
})

const mapDispatchToProps = (dispatch) => ({
    setListList: (id, list) => setListList(dispatch, id, list),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListForm)

export default connected