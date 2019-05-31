import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import AuthPage from './pages/AuthPage';
import EventsPage from './pages/EventsPage';
import BookingsPage from './pages/BookingsPage';
import MainNavigation from './components/MainNavigation/MainNavigation';
import AuthContext from './context/AuthContext';

class App extends Component {
	state = {
		token: null,
		userId: null,
	}
	componentDidMount() {
		const authDetails = JSON.parse( localStorage.getItem( 'evbr_auth' ) );
		if ( authDetails ) {
			this.setState( {
				token: authDetails.token,
				userId: authDetails.userId,
			} );
		}
	}

	login = ( token, userId, tokenExpiration ) => {
		this.setState( {
			token: token,
			userId: userId,
		});
	}

	logout = () => {
		this.setState( {
			token: null,
			userId: null,
		} );
	}
	render() {
		return (
			<BrowserRouter>
				<React.Fragment>
					<AuthContext.Provider value={ {
						token: this.state.token,
						userId: this.state.userId,
						login: this.login,
						logout: this.logout,
					} }>
						<MainNavigation />
						<main className="main container mx-auto flex flex-col justify-center pt-6">
							<Switch>
								{ this.state.token && ( <Redirect from="/" to="/events" exact /> ) }
								{ this.state.token && ( <Redirect from="/auth" to="/events" exact /> ) }
								{ ! this.state.token && (
									<Route path="/auth" component= { AuthPage } />
								) }
								<Route path="/events" component={ EventsPage } />
								{ this.state.token && (
									<Route path="/bookings" component={ BookingsPage } />
								) }
								{ ! this.state.token &&( <Redirect to="/auth" exact /> ) }
							</Switch>
						</main>
					</AuthContext.Provider>
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
