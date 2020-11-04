import React from 'react'
import { connect } from 'react-redux'
import RegisterForm from '../components/Forms/RegisterForm.jsx'

const Login = props => {
    return <RegisterForm />
}

const connected = connect()(Login)

export default connected