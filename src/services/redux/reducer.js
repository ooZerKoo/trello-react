import { combineReducers } from 'redux'
import { sessionReducer } from "redux-react-session"

const initialPanel = [false]
const initialList = [false]
const initialTask = [false]

const panel = (state = initialPanel, action) => {
    var add, final
    switch (action.type) {
        case 'SET_PANEL':
            return action.payload
        case 'DELETE_PANEL':
            final = state.filter(v => v.id !== action.payload)
            return final
        case 'ADD_PANEL':
            if (state[0] === false) {
                add = [action.payload]
            } else {
                add = state
                add.push(action.payload)
            }
            return add
        case 'RESET':
            return initialPanel
        default:
            return state
    }
}

const list = (state = initialList, action) => {
    var add, final, current
    switch (action.type) {
        case 'SET_LIST_LIST':
            return action.payload

        case 'ADD_LIST':
            if (state[0] === false) {
                add = [action.payload]
            } else {
                add = state
                add.push(action.payload)
            }
            return add

        case 'ADD_ELEMENT_LIST':
            if (state[0] === false) {
                final = [action.payload]
            } else {
                final = state.filter(v => v.id !== action.payload.id)
                current = state.filter(v => v.id === action.payload.id)
                if (current.length === 0) {
                    current = action.payload
                } else {
                    current[0].list.push(action.payload.list)
                }
                final.push(current[0])
            }
            return final
        case 'RESET':
            return initialList
        default:
            return state
    }
}

const task = (state = initialTask, action) => {
    var final, current
    switch (action.type) {
        case 'SET_TASK':
            if (state[0] === false) {
                final = [action.payload]
            } else {
                final = state.filter(v => v.id !== action.payload.id)
                final.push(action.payload)
            }
            return final

        case 'ADD_TASK':
            if (state[0] === false) {
                final = [action.payload]
            } else {
                final = state.filter(v => v.id !== action.payload.id)
                current = state.filter(v => v.id === action.payload.id)
                if (current.length === 0) {
                    current = [action.payload]
                } else {
                    current[0].list.push(action.payload.list)
                }
                final.push(current[0])
            }
            return final
        case 'RESET':
            return initialTask
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
    theme: 'dark',
    data: null,
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
        case 'SET_FORM_DATA':
            return {
                ...state,
                data: action.payload
            }
        case 'RESET':
        case 'SET_PANEL':
        case 'SET_LIST_LIST':
        case 'SET_TASK':
        case 'RESET_MENU_FILTER':
        case 'DELETE_ALL_PHOTOS':
            return initialStateMenu

        default:
            return state
    }
}

const initialStateActions = {
    actions: [],
    drawers: [],
    photos: [],
    photo: null,
    draggable: false,
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
            case 'SET_DRAWER':
                const drawers = state.drawers.filter(v => v.id !== action.payload.id)
                drawers.push(action.payload)
                return {
                    ...state,
                    drawers: drawers
                }
            case 'SEARCH_PHOTOS':
                return {
                    ...state,
                    photos: action.payload
                }
            case 'SET_PHOTO':
                return {
                    ...state,
                    photo: action.payload,
                    photos: [],
                }
            case 'SWAP_DRAGGABLE':
                return {
                    ...state,
                    draggable: !state.draggable
                }
            case 'RESET':
            case 'SET_PANEL':
            case 'SET_LIST_LIST':
            case 'SET_TASK':
            case 'RESET_MENU_FILTER':
            case 'DELETE_ALL_PHOTOS':
                return initialStateActions
            default:
                return state
    }
}

const reducer = combineReducers({
    panel: panel,
    list: list,
    task: task,
    menu: menu,
    actions: actions,
    session: sessionReducer,
});

export default reducer