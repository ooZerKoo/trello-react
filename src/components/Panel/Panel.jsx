import React from 'react'
import { connect } from 'react-redux'
import { setListList } from '../../services/redux/actions.js'

import { apiGetListList, apiAddList, apiDeleteList } from '../../services/api/api.js'

import { Form, Button, Divider, Row, Col, Input } from 'antd'

let done = false

const Panel = props => {

    const getListList = async () => {
        apiGetListList(props.token, props.idPanel)
            .then(list => props.setListList(props.idPanel, list))
    }

    const addNewList = async(data) => {
        apiAddList(props.token, props.idPanel, {name: data.name})
            .then(getListList)
    }

    const deleteOneList = async (idList) => {
        apiDeleteList(props.token, idList)
            .then(getListList)
    }

    const getLists = () => {
        return props.lists[0]?.list.map(list => (
            <Row key={list._id}>
                <h3>{list.name}</h3>
                <Button type="danger" onClick={() => deleteOneList(list._id)}>Eliminar</Button>
            </Row>
        ))
    }
    if ((!done && props.idPanel) || (props.lists.length === 0)) {
        getListList()
        done = true
    }

    return (
        <React.Fragment>
            <Row justify="space-around">
                <Col xs={24} md={20} lg={12} xl={8}>
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

                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button type="primary" block size="large" htmlType="submit">Añadir Panel</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            {getLists()}
        </React.Fragment>
    )
}

const mapStateToProps = (state, extraVars) => ({
    idPanel: extraVars.match.params.idPanel,
    token: state.session.user.token,
    lists: state.list.filter(v => v.id == extraVars.match.params.idPanel),
    full: state.list,
})
const mapDispatchToProps = (dispatch) => ({
    setListList: (id, list) => setListList(dispatch, id, list),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Panel)

export default connected