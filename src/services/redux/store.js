import { createStore } from 'redux'
import reducer from './reducer.js'
import { sessionService } from 'redux-react-session'


const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


sessionService.initSessionService(store)

export default store