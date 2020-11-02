import axios from 'axios'
const api = require('../api/api')

// USER
export const setLogin = async (dispatch, username, password) => {
    const url = api.getapi('user')
    return axios.post(url + 'login', {
            username: username,
            password: password
        })
        .then(token =>
            dispatch({
                type: 'ADD_TOKEN',
                payload: token.data
            })
        )
}

export const setRegister = async (dispatch, username, email, password) => {
    const url = api.getapi('user')
    return axios.post(url + 'getpassword', {
            password: password
        })
        .then(p => axios.post(url + 'add', {
            username: username,
            email: email,
            password: p.data
        }))
        .then(token =>
            dispatch({
                type: 'ADD_TOKEN',
                payload: token.data
            })
        )
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
                type: 'SET_LIST',
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
                type: 'UPDATE_LIST',
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
                type: 'DELETE_FROM_LIST',
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
                payload: list.data
            })
        })
        .catch(console.error)
}

export const addList = async (dispatch, token, id, data) => {
    const url = api.getapi('list', id)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios.post(url, {
            ...data
        })
        .then(list => {
            return dispatch({
                type: 'UPDATE_LIST',
                payload: list.data
            })
        })
        .catch(console.error)
}

export const deleteList = async (dispatch, token, id) => {
    const url = api.getapi('list', id)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    await axios.delete(url)
        .then(list => {
            return dispatch({
                type: 'DELETE_FROM_LIST',
                payload: list.data
            })
        })
}


// DATA TAKEN
export const setGetDataDone = (dispatch) => dispatch({
    type: 'SET_GET_DATA_DONE'
})

export const unsetGetDataDone = (dispatch) => dispatch({
    type: 'UNSET_GET_DATA_DONE'
})


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