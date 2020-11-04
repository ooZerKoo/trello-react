import { combineReducers } from 'redux'
import { sessionReducer } from "redux-react-session"


const panel = (state = [], action) => {
    switch (action.type) {
        case 'SET_PANEL':
            return action.payload
        case 'ADD_PANEL':
            var add = state
            add.push(action.payload)
            return add
        default:
            return state
    }
}

const list = (state = [], action) => {
    switch (action.type) {
        case 'SET_LIST':
            return action.payload
        case 'ADD_LIST':
            var add = state
            add.push(action.payload)
            return add
        default:
            return state
    }
}

const task = (state = [], action) => {
    switch (action.type) {
        case 'SET_TASK':
            return action.payload
        case 'ADD_TASK':
            var add = state
            add.push(action.payload)
            return add
        default:
            return state
    }
}

const initialStateMenu = {
    collapsed: false,
    filter: {
        panel: null,
        list: null,
    },
    theme: 'dark'
}

const menu = (state = initialStateMenu, action) => {
    switch (action.type) {
        case 'MENU_TOGGLE_COLLAPSE':
            return {
                ...state,
                collapsed: state.collapsed ? false : true
            }
        case 'MENU_FILTER_PANEL':
            return {
                ...state,
                filter: {
                    panel: action.payload,
                    list: null,
                }
            }
        case 'MENU_FILTER_LIST':
            return {
                ...state,
                filter: {
                    panel: null,
                    list: action.payload,
                }
            }
        default:
            return state
    }
}

const initialStateActions = {
    actions: [],
}

const actions = (state = initialStateActions, action) => {
    switch (action.type) {
        case 'SET_ACTION_VISIBLE':
            const actionVisible = state.actions.filter(v => v.id !== action.payload.id)
            actionVisible.push(action.payload)
            return {
                ...state,
                actions: actionVisible
            }
        default:
            return state
    }
}

const reducer = combineReducers({
    panel,
    list,
    menu,
    task,
    actions,
    session: sessionReducer,
});

export default reducer