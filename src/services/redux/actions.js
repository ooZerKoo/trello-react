import axios from 'axios'
import {
    sessionService
} from 'redux-react-session'
const api = require('../api/api')

// USER
export const setLogin = async (dispatch, username, password) => {
    const url = api.getapi('user')
    const token = await axios.post(url + 'login', {
        username: username,
        password: password
    })
    if (token) {
        await sessionService.saveSession({
                token: token.data
            })
            .then(sessionService.saveUser({
                token: token.data
            }))
    }
}

export const setLogout = async (dispatch) => {
    await sessionService.deleteSession()
        .then(sessionService.deleteUser())
}

export const setRegister = async (dispatch, username, email, password) => {
    const url = api.getapi('user')
    const token = await axios.post(url + 'getpassword', {
            password: password
        })
        .then(p => axios.post(url + 'add', {
            username: username,
            email: email,
            password: p.data
        }))
    if (token) {
        await sessionService.saveSession({
                token: token.data
            })
            .then(sessionService.saveUser({
                token: token.data
            }))
    }
}

export const checkRegister = async (dispatch, data) => {
    const url = api.getapi('user')
    let check = true
    if (check && data.username.length < 4) {
        check = false
    }

    if (check && data.email.length < 4) {
        check = false
    }

    if (check && (data.password.length < 4 || data.password2.length < 4 || data.password !== data.password2)) {
        check = false
    }

    if (check) {
        const checkusername = await axios.post(url + 'checkusername', {
            username: data.username
        })
        check = checkusername.data
    }

    if (check) {
        const checkemail = await axios.post(url + 'checkemail', {
            email: data.email
        })
        check = checkemail.data
    }

    return dispatch({
        type: 'UPDATE_FORM_STATUS',
        payload: check
    })
}

// PANEL
export const getPanelList = async (dispatch, token) => {
    const url = api.getapi('panel')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios.get(url)
        .then(panel => {
            return dispatch({
                type: 'SET_PANEL_LIST',
                payload: panel.data
            })
        })
        .catch(console.error)
}

export const addPanel = async (dispatch, token, data) => {
    const url = api.getapi('panel')
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
    const url = api.getapi('panel', id)
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
    const url = api.getapi('list', id)
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
    const url = api.getapi('list', id)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios.post(url, {...data})
        .then(list => dispatch({
            type: 'UPDATE_LIST',
            payload: list.data,
            idPanel: id
        }))
        .catch(console.error)
}

export const deleteList = async (dispatch, token, idList, idPanel) => {
    const url = api.getapi('list', idList)
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
export const updateFormStatus = (dispatch, check) => dispatch({
    type: 'UPDATE_FORM_STATUS',
    payload: check
})

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