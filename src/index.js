import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { sessionService } from 'redux-react-session'
import App from './App';
import store from './services/redux/store.js'

import './index.scss';
import 'antd/dist/antd.css';

sessionService.loadSession()
  .then(token => {
    if (token && token.token) {
      sessionService.saveUser({ token: token.token })
    } else {
      console.log('Else index.js');
    }
  })
  .catch(console.info)


ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
)
