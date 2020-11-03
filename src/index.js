import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import store from './services/redux/store.js'
import {sessionService } from 'redux-react-session'

const loadSession = async () => {
  sessionService.loadSession()
    .then(token => {
      if (token && token.token) sessionService.saveUser({ token: token.token })
    })
    .catch(e => console.error('loadSession() en index.js', e))
}

loadSession()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
