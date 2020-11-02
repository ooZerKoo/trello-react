import './App.css';

import { connect } from 'react-redux'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import PanelList from './components/PanelList/PanelList.jsx'
import Panel from './components/Panel/Panel.jsx'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

const App = props => {
  return (
    <div className="App" >
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {props.token ? <PanelList /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login" exact>
            {!props.token ? <Login /> : <Redirect to="/" />}
          </Route>
          <Route path="/register" exact>
            {!props.token ? <Register /> : <Redirect to="/" />}
          </Route>
          {props.token ? <Route path="/:idPanel" component={Panel} exact /> : <Route path="/:idPanel" exact><Redirect to="/login" /></Route>}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => ({
  token: state.token
})
const connected = connect(mapStateToProps)(App)

export default connected