const initialState = {
    token: null,
    gotdata: false,
    list: [],
    filters: [],
    form: {
        name: '',
        description: '',
        username: '',
        email: '',
        password: '',
        password2: '',
        status: false
    },
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TOKEN':
            if (action.payload) {
                return {
                    ...state,
                    token: action.payload,
                    form: initialState.form
                }
            } else {
                return {
                    ...state,
                    token: null
                }
            }
        // LIST
        case 'UPDATE_LIST':
            const addList = state.list
            addList.push(action.payload)
            return {
                ...state,
                list: addList,
                form: initialState.form
            }
        case 'SET_LIST':
            return {
                ...state,
                list: action.payload
            }
        case 'DELETE_FROM_LIST':
            const removePanel = state.list.filter(v => v._id !== action.payload._id)
            return {
                ...state,
                list: removePanel,
            }
        // DATA
        case 'SET_GET_DATA_DONE':
            return {
                ...state,
                gotdata: true,
            }
        case 'UNSET_GET_DATA_DONE':
            return {
                ...state,
                gotdata: false,
            }
        // form
        case 'UPDATE_FORM_FIELDS':
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.payload
                }
            }
        case 'UPDATE_FORM_STATUS':
            return {
                ...state,
                form: {
                    ...state.form,
                    status: action.payload
                }
            }
        case 'EMPTY_FORM':
            return {
                ...state,
                form: initialState.form
            }
        default:
            return state
    }
}

export default reducer