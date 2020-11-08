import { sessionService } from 'redux-react-session'

// USER
export const setLogin = async (dispatch, token) => {
    sessionService.saveSession({
            token: token
        })
        .then(sessionService.saveUser({
            token: token
        }))
}

export const setLogout = async (dispatch) => {
    sessionService.deleteSession()
        .then(sessionService.deleteUser())
        .then(() => dispatch({type: 'RESET'}))
}

// PANELS
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
export const deletePanel = (dispatch, panel) => {
    return dispatch({
        type: 'DELETE_PANEL',
        payload: panel._id
    })
}


// LIST
export const setListList = (dispatch, id, list) => {
    return dispatch({
        type: 'SET_LIST',
        payload: {
            id: id,
            list: list
        }
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
export const deleteList = (dispatch, list) => {
    return dispatch({
        type: 'DELETE_LIST',
        payload: list._id
    })
}
export const addElementList = (dispatch, id, list) => {
    return dispatch({
        type: 'ADD_ELEMENT_LIST',
        payload: {
            id: id,
            list: list
        }
    })
}

// TASKS
export const setTaskList = (dispatch, idPanel, idList, tasks) => {
    return dispatch({
        type: 'SET_TASK',
        payload: {
            idPanel: idPanel,
            idList: idList,
            tasks: tasks
        }
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
export const deleteTask = (dispatch, list) => {
    return dispatch({
        type: 'DELETE_TASK',
        payload: list._id
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

export const setDrawer = (dispatch, id, value) => {
    return dispatch({
        type: 'SET_DRAWER',
        payload: {
            id: id,
            visible: value
        }
    })
}

export const setPhoto = (dispatch, urls) => {
    return dispatch({
        type: 'SET_PHOTO',
        payload: urls,
    })
}

export const setPhotos = (dispatch, list) => {
    return dispatch({
        type: 'SEARCH_PHOTOS',
        payload: list,
    })
}

export const setFormData = (dispatch, data) => {
    return dispatch({
        type: 'SET_FORM_DATA',
        payload: data
    })
}

export const swapDraggable = (dispatch) => {
    return dispatch({
        type: 'SWAP_DRAGGABLE'
    })
}

// USER
export const setLoading = (dispatch) => {
    return dispatch({
        type: 'LOADING_USER'
    })
}

export const setLoaded = (dispatch) => {
    return dispatch({
        type: 'LOADED'
    })
}

export const setUser = (dispatch, user) => {
    return dispatch({
        type: 'SET_USER',
        payload: user,
    })
}