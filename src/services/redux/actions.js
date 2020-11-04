import { sessionService } from 'redux-react-session'

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

// LISTS
export const setPanelList = (dispatch, panels) => {
    return dispatch({
        type: 'SET_PANEL',
        payload: panels
    })
}
export const addPanelList = (dispatch, panels) => {
    return dispatch({
        type: 'ADD_PANEL',
        payload: panels
    })
}

export const setListList = (dispatch, id, list) => {
    return dispatch({
        type: 'SET_LIST',
        payload: [{
            id: id,
            list: list
        }]
    })
}
export const addListList = (dispatch, id, list) => {
    return dispatch({
        type: 'ADD_LIST',
        payload: {
            id: id,
            list: list
        }
    })
}

export const setTaskList = (dispatch, id, list) => {
    return dispatch({
        type: 'SET_TASK',
        payload: [{
            id: id,
            list: list
        }]
    })
}
export const addTaskList = (dispatch, id, list) => {
    return dispatch({
        type: 'ADD_TASK',
        payload: {
            id: id,
            list: list
        }
    })
}

// MENU
export const toggleCollapse = (dispatch) => {
    return dispatch({
        type: 'MENU_TOGGLE_COLLAPSE'
    })
}

export const filterPanel = (dispatch, type, id) => {
    const typeFilterPanel = (type === 'panel') ? 'MENU_FILTER_PANEL' : 'MENU_FILTER_LIST'
    return dispatch({
        type: typeFilterPanel,
        payload: id
    })
}

// ACTIONS
export const setVisible = (dispatch, id, value) => {
    return dispatch({
        type: 'SET_ACTION_VISIBLE',
        payload: {
            id: id,
            visible: value
        }
    })
}