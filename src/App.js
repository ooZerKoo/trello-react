import './App.css';

import React from 'react'
import { connect } from 'react-redux'

import GlobalLayout from './pages/GlobalLayout.jsx'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

const App = props => {
	return (
		<div className="App" >
			<BrowserRouter>
				{!props.auth &&
					<Switch>
						<Route path="/login" component={GlobalLayout} pageToDisplay='login' exact />
						<Route path="/register" component={GlobalLayout} pageToDisplay='register' exact />
						<Route path="/"><Redirect to="/login" /></Route>
					</Switch>
				}
				{props.auth &&
					<Switch>
						<Route path="/login" exact><Redirect to="/" /></Route>
						<Route path="/register" exact><Redirect to="/" /></Route>
						<Route path="/:idPanel" component={GlobalLayout} pageToDisplay='list' exact /> :
						<Route path="/" component={GlobalLayout} pageToDisplay='panel' exact />
					</Switch>
				}
			</BrowserRouter>
		</div>
	);
}

const mapStateToProps = state => ({
	auth: state.session.authenticated
})
const connected = connect(mapStateToProps)(App)

export default connected