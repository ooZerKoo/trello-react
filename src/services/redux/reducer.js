import { combineReducers } from 'redux'
import { sessionReducer } from "redux-react-session"

const initialStateForm = {
    name: '',
    description: '',
    username: '',
    email: '',
    password: '',
    password2: '',
    status: false,
}

const errors = (state = [], action) => {
    switch(action.type) {
        case 'ADD_ERROR':
            return action.payload

        case 'DELETE_ERROR':
            return []

        default:
            return state
    }
}

const panel = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_PANEL_LIST':
            const addList = state.list
            addList.push(action.payload)
            return addList

        case 'SET_PANEL_LIST':
            return action.payload

        case 'DELETE_FROM_PANEL_LIST':
            const removePanel = state.list.filter(v => v._id !== action.payload._id)
            return removePanel
        
        default:
            return state
    }
}

const list = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_LIST':
            const addList = state.list.filter(v => v.id === action.idPanel)
            const finalList = state.list.filter(v => v.id !== action.idPanel)
            addList[0].list.push(action.payload)
            finalList.push(addList)
            addList.push(action.payload)
            return finalList

        case 'SET_LIST':
            return action.payload

        case 'DELETE_FROM_LIST':
            const deleteRemoveList = state.list.filter(v => v.id === action.idPanel)
            const deleteFinalList = state.list.filter(v => v.id !== action.idPanel)
            const deleteFinalPanelList = deleteRemoveList[0].list.filter(v => v._id !== action.payload)
            deleteFinalList.push(deleteFinalPanelList)
            return deleteFinalList

        default:
            return state
    }
}

const form = (state = initialStateForm, action) => {
    switch (action.type) {
        case 'UPDATE_FORM_FIELDS':
            return {
                ...state,
                ...action.payload
            }

        case 'UPDATE_FORM_STATUS':
            return {
                ...state,
                status: action.payload
            }

        case 'SET_FORM_TYPE':
            return {
                ...state,
                type: action.payload
            }

        case 'EMPTY_FORM':
        case 'UPDATE_PANEL_LIST':
        case 'UPDATE_LIST':
            return initialStateForm
        default:
            return state
    }
}

const reducer = combineReducers({
    panel,
    list,
    form,
    errors,
    session: sessionReducer,
});

export default reducer