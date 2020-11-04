import axios from 'axios'
import {
    sessionService
} from 'redux-react-session'
import {
    apiGetapi,
    apiSetRegister
} from '../api/api'

// USER
export const setLogin = async (dispatch, token) => {
    await sessionService.saveSession({
            token: token
        })
        .then(sessionService.saveUser({
            token: token
        }))
}

export const setLogout = async (dispatch) => {
    await sessionService.deleteSession()
        .then(sessionService.deleteUser())
}

// PANEL
export const setPanelList = (dispatch, panels) => {
    return dispatch({
        type: 'SET_PANEL_LIST',
        payload: panels
    })
}


// LIST
export const setListList = (dispatch, id, list) => {
    return dispatch({
        type: 'SET_LIST',
        payload: [{
            id: id,
            list: list
        }]
    })
}

// FORMS
export const updateFormFields = (dispatch, fields) => dispatch({
    type: 'UPDATE_FORM_FIELDS',
    payload: {
        ...fields
    }
})
export const emptyForm = (dispatch, fields) => dispatch({
    type: 'EMPTY_FORM',
    payload: {
        ...fields
    }
})
export const setFormType = (dispatch, data) => dispatch({
    type: 'SET_FORM_TYPE',
    payload: data
})

// MESSAGES
export const deleteErrorMessages = (dispatch) => dispatch({
    type: 'DELETE_ERROR'
})

export const addErrorMessage = (dispatch, message) => dispatch({
    type: 'ADD_ERROR',
    payload: message
})