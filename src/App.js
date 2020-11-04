import './App.css';

import React from 'react'
import { connect } from 'react-redux'

import List from './pages/List.jsx'
import Panel from './pages/Panel.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

const App = props => {
	return (
		<div className="App" >
			<BrowserRouter>
				{!props.auth &&
					<Switch>
						<Route path="/login" component={Login} exact />
						<Route path="/register" component={Register} exact />
						<Route path="/" exact><Redirect to="/login" /></Route>
					</Switch>
				}
				{props.auth &&
					<Switch>
						<Route path="/login" exact><Redirect to="/" /></Route>
						<Route path="/register" exact><Redirect to="/" /></Route>
						<Route path="/:idPanel" component={List} exact /> :
						<Route path="/" component={Panel} exact />
					</Switch>
				}
			</BrowserRouter>
		</div>
	);
}

const mapStateToProps = (state, extra) => ({
	auth: state.session.authenticated
})
const connected = connect(mapStateToProps)(App)

export default connected