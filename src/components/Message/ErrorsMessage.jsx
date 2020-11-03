import React from 'react'
import { connect } from 'react-redux'
import { deleteErrorMessages } from '../../services/redux/actions.js'
import { message } from 'antd'

const ErrorsMessage = props => {
    const getErrors = () => {
        console.log(props.error);
        if( props.error?.id ) {
            message.error({ content: props.error.error, key: props.error.id})
                .then(props.deleteErrorMessages())
        }
    }

    return (
        <React.Fragment>
            {getErrors()}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    error: state.errors
})

const mapDispatchToProps = (dispatch) => ({
    deleteErrorMessages: () => deleteErrorMessages(dispatch)
})
const connected = connect(
    mapStateToProps,
    mapDispatchToProps)
    (ErrorsMessage)

export default connected