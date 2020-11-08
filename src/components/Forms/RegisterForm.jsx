import React from 'react'
import { connect } from 'react-redux'
import { setLogin } from '../../services/redux/actions.js'
import { Form, Button, Row, Col, Input, Divider } from 'antd'
import { NavLink } from 'react-router-dom'

import { apiSetRegister, apiCheck } from '../../services/api/api.js'

const RegisterForm = props => {

    const doRegister = (data) => {
        apiSetRegister(data.username, data.email, data.password)
            .then(token => props.setLogin(token))
    }

    const rows = [
        {
            id: 'username',
            name: 'Usuario',
            rules: [
                { required: true, message: 'El usuario es obligatorio' },
                { min: 4, message: 'El usuario tiene que ser de 4 caracteres' },
                { whitespace: true, message: 'No puede estar vacío'},
                ({ getFieldValue }) => ({
                    async validator(rule, value) {
                        const check = await apiCheck('username', value)
                        if (check) {
                            return Promise.resolve()
                        }
                        return Promise.reject('El usuario ya está registrado')
                    }
                })
            ]
        },
        {
            id: 'email',
            name: 'E-mail',
            onblur: 'checkRegister',
            rules: [
                { required: true, message: 'El email es obligatorio' },
                { pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: 'El formato es incorrecto' },
                { whitespace: true, message: 'No puede estar vacío'},
                ({ getFieldValue }) => ({
                    async validator(rule, value) {
                        const check = await apiCheck('email', value)
                        if (check) {
                            return Promise.resolve()
                        }
                        return Promise.reject('El email ya está registrado')
                    }
                })
            ]
        },
        {
            id: 'password',
            name: 'Contraseña',
            type: 'password',
            rules: [
                { required: true, message: 'La contraseña es obligatoria' },
                { min: 4, message: 'La contraseña tiene que ser de 4 caracteres' },
                { whitespace: true, message: 'No puede estar vacío'},
            ]
        },
        {
            id: 'password2',
            name: 'Repite la Contraseña',
            type: 'password',
            rules: [
                { required: true, message: 'La contraseña es obligatoria' },
                { min: 4, message: 'La contraseña tiene que ser de 4 caracteres' },
                { whitespace: true, message: 'No puede estar vacío'},
                ({ getFieldValue }) => ({
                    validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('Las contraseñas no coinciden');
                    },
                })
            ],
            dependencies: ['password']
        }
    ]

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
        className: 'login',
    };

    return (
        <Row justify="center" span={8}>
            <Col xs={24} sm={24} md={16} lg={12} xl={8} xxl={6}>
                <Form {...layout} onFinish={data => doRegister(data)}>
                    {rows.map(row => (
                        <Form.Item
                            hasFeedback
                            dependencies={row.dependencies}
                            key={row.id}
                            label={row.name}
                            name={row.id}
                            rules={row.rules}>
                            {row.type === 'password' ? <Input.Password size="large" /> : <Input size="large" />}
                        </Form.Item>
                    ))}
                    <Form.Item wrapperCol={24}>
                        <Button type="primary" block size="large" htmlType="submit">Regístrate</Button>
                    </Form.Item>
                    <Divider orientation="left">ó bien</Divider>
                    <NavLink to='/login'><Button block size="large" type="default">Inicia Sesión</Button></NavLink>
                </Form>
            </Col>
        </Row>
    )
}

const mapDispatchToProps = (dispatch) => ({
    setLogin: (token) => setLogin(dispatch, token)
})

const connected = connect(
    null,
    mapDispatchToProps
)(RegisterForm)

export default connected