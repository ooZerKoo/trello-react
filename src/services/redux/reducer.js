import { combineReducers } from 'redux'
import { sessionReducer } from "redux-react-session"

const initialUser = {
    loading: false,
    loaded: false,
    data: null
}

const user = (state = initialUser, action) => {
    var newStatePanel, newStateList, idPanel, tempStatePanel, tempStateList, idList
    switch (action.type) {
        case 'LOADING_USER':
            return {
                ...state,
                loaded: false,
                loading: true,
            }
        case 'LOADED':
            return {
                ...state,
                loaded: true,
                loading: false,
            }
        case 'RESET':
            return initialUser
        case 'SET_USER':
            return {
                ...state,
                data: action.payload
            }
        case 'SET_PANEL':
            return {
                ...state,
                data: {
                    ...state.data,
                    panels: action.payload
                }
            }
        case 'SET_LIST':
            idPanel = action.payload.id

            newStatePanel = state.data.panels.filter(v => v._id !== idPanel)

            tempStatePanel = state.data.panels.filter(v => v._id === idPanel)
            tempStatePanel[0].lists = action.payload.list

            newStatePanel.push(tempStatePanel[0])

            return {
                ...state,
                data: {
                    ...state.data,
                    panels: newStatePanel
                }
            }
        case 'SET_TASK':
            idPanel = action.payload.idPanel
            idList = action.payload.idList

            newStatePanel = state.data.panels.filter(a => a._id !== idPanel)
            tempStatePanel = state.data.panels.filter(b => b._id === idPanel)
            
            newStateList = tempStatePanel[0].lists.filter(v => v._id !== idList)
            tempStateList = tempStatePanel[0].lists.filter(v => v._id === idList)

            tempStateList[0].tasks = action.payload.tasks

            newStateList.push(tempStateList[0])
            newStatePanel.push(tempStatePanel[0])

            return {
                ...state,
                data: {
                    ...state.data,
                    panels: newStatePanel
                }
            }
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
        case 'SET_LIST':
        case 'SET_TASK':
        case 'RESET_MENU_FILTER':
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
    user,
    menu,
    actions,
    session: sessionReducer,
});

export default reducer