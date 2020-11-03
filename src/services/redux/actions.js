import axios from 'axios'
import {
    sessionService
} from 'redux-react-session'
import {
    apiCheck,
    apiGetPanelList,
    apiGetToken,
    apiGetapi,
    apiSetRegister
} from '../api/api'

// USER
export const setLogin = async (dispatch, username, password) => {
    const token = await apiGetToken(username, password)
    if (token) {
        await sessionService.saveSession({
                token: token.data
            })
            .then(sessionService.saveUser({
                token: token.data
            }))
        return dispatch({
            type: 'EMPTY_FORM'
        })
    }
}

export const setLogout = async (dispatch) => {
    await sessionService.deleteSession()
        .then(sessionService.deleteUser())
}

export const setRegister = async (dispatch, username, email, password) => {
    const token = await apiSetRegister(username, email, password)
    if (token) {
        await sessionService.saveSession({
                token: token.data
            })
            .then(sessionService.saveUser({
                token: token.data
            }))
        return dispatch({
            type: 'EMPTY_FORM'
        })
    }
}

export const checkRegister = async (dispatch, data, id) => {
    var error = ''
    switch (id) {
        case 'username':
            if (data.username.length < 4) {
                error = 'El usuario tiene que ser más largo que 4'
            } else {
                const checkUsernameRegister = await apiCheck('username', data.username)
                if (!checkUsernameRegister) {
                    error = 'El usuario ya está registrado'
                }
            }
            break
        case 'email':
            if (data.email.length < 4) {
                error = 'El email es muy corto'
            } else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email) !== true) {
                error = 'El email no es correcto'
            } else {
                const checkEmailRegister = await apiCheck('email', data.email)
                if (!checkEmailRegister) {
                    error = 'El email ya está registrado'
                }
            }
            break
        case 'password':
        case 'password2':
            if (
                (data.password.length < 4 && data.password.length > 0) &&
                (data.password2.length < 4 && data.password2.length > 0)
            ) {
                error = 'La contraseña tiene que ser más largo que 4'
            } else if (data.password !== data.password2) {
                error = 'Las contraseñas no coniciden'
            }
            break
        default:
            break
    }
    if (error) {
        return dispatch({
            type: 'ADD_ERROR',
            payload: {
                id: id,
                error: error
            }
        })
    }
}

// PANEL
export const getPanelList = async (dispatch, token) => {
    apiGetPanelList(token)
        .then(panel => {
            return dispatch({
                type: 'SET_PANEL_LIST',
                payload: panel.data
            })
        })
        .catch(console.error)
}

export const addPanel = async (dispatch, token, data) => {
    const url = apiGetapi('panel')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios.post(url, {
            ...data
        })
        .then(panel => {
            return dispatch({
                type: 'UPDATE_PANEL_LIST',
                payload: panel.data
            })
        })
        .catch(console.error)
}

export const deletePanel = async (dispatch, token, id) => {
    const url = apiGetapi('panel', id)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    await axios.delete(url)
        .then(panel => {
            return dispatch({
                type: 'DELETE_FROM_PANEL_LIST',
                payload: panel.data
            })
        })
}


// LIST
export const getListList = async (dispatch, token, id) => {
    const url = apiGetapi('list', id)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios.get(url)
        .then(list => {
            return dispatch({
                type: 'SET_LIST',
                payload: [{
                    id: id,
                    list: list.data
                }]
            })
        })
        .catch(console.error)
}

export const addList = async (dispatch, token, id, data) => {
    const url = apiGetapi('list', id)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios.post(url, {
            ...data
        })
        .then(list => dispatch({
            type: 'UPDATE_LIST',
            payload: list.data,
            idPanel: id
        }))
        .catch(console.error)
}

export const deleteList = async (dispatch, token, idList, idPanel) => {
    const url = apiGetapi('list', idList)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    await axios.delete(url)
        .then(list => {
            return dispatch({
                type: 'DELETE_FROM_LIST',
                payload: list.data,
                idPanel: idPanel
            })
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