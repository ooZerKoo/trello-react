import { combineReducers } from 'redux'
import { sessionReducer } from "redux-react-session"


const panel = (state = [], action) => {
    switch (action.type) {
        case 'SET_PANEL_LIST':
            return action.payload
        
        default:
            return state
    }
}

const list = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_LIST':
            const addList = state.filter(v => v.id === action.idPanel)
            const finalList = state.filter(v => v.id !== action.idPanel)
            addList[0].list.push(action.payload)
            finalList.push(addList)
            addList.push(action.payload)
            return finalList

        case 'SET_LIST':
            return action.payload

        case 'DELETE_FROM_LIST':
            const deleteRemoveList = state.filter(v => v.id === action.idPanel)
            const deleteFinalList = state.filter(v => v.id !== action.idPanel)
            const deleteFinalPanelList = deleteRemoveList[0].list.filter(v => v._id !== action.payload)
            deleteFinalList.push(deleteFinalPanelList)
            return deleteFinalList

        default:
            return state
    }
}


const reducer = combineReducers({
    panel,
    list,
    session: sessionReducer,
});

export default reducer