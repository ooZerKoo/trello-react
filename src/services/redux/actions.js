import sessionService from 'redux-react-session'

// USER
export const setLogin = async (dispatch, token) => {
    sessionService.saveSession({token: token})
        .then(sessionService.saveUser({token: token}))
}

export const setLogout = async (dispatch) => {
    sessionService.deleteSession()
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