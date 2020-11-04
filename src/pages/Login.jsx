import React from 'react'
import { connect } from 'react-redux'
import LoginForm from '../components/Forms/LoginForm'

const Login = props => {
    return <LoginForm />
}

const connected = connect()(Login)

export default connected