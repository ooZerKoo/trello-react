import { createStore } from 'redux'
import reducer from './reducer.js'
import { sessionService } from 'redux-react-session'


const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const validateSession = (session) => {
    return true
}

const options = {
    refreshOnCheckAuth: true,
    redirectPath: '/',
    driver: 'COOKIES',
    validateSession
};


sessionService.initSessionService(store, options)

export default store