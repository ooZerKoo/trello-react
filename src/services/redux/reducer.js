import {
    combineReducers
} from 'redux'
import {
    sessionReducer
} from "redux-react-session"


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
            var final = state.filter(v => v.id !== action.payload.id)
            final.push(action.payload)
            return final

        case 'ADD_TASK':
            final = state.filter(v => v.id !== action.payload.list)
            var add = state.filter(v => v.id === action.payload.list)
            if (!add[0]) {
                add = {
                    id: action.payload.list,
                    list: [action.payload]
                }
            } else {
                add[0].list.push(action.payload)
            }
            if (!final[0]) {
                final = [add[0]]
            } else {
                final.push(add[0])
            }
            return final
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
    drawers: []
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