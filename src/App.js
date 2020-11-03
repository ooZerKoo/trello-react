import './App.css';

import React from 'react'
import { connect } from 'react-redux'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import PanelList from './components/PanelList/PanelList.jsx'
import Panel from './components/Panel/Panel.jsx'
import Header from './components/Header/Header.jsx'
import ErrorsMessage from './components/Message/ErrorsMessage.jsx'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

const App = props => {
	return (
		<div className="App" >
			<ErrorsMessage />
			<BrowserRouter>
				<Header />
				<Switch>
					<Route path="/login" exact>
						{!props.auth ? <Login /> : <Redirect to="/" />}
					</Route>
					<Route path="/register" exact>
						{!props.auth ? <Register /> : <Redirect to="/" />}
					</Route>
					{props.auth ?
						<Route path="/:idPanel" component={Panel} exact /> :
						<Route path="/:idPanel" exact><Redirect to="/login" /></Route>}
					<Route path="/" exact>
						{props.auth ? <PanelList /> : <Redirect to="/login" />}
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

const mapStateToProps = (state) => ({
	auth: state.session.authenticated
})
const connected = connect(mapStateToProps)(App)

export default connected