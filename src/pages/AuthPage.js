import React, { Component } from 'react';
import AuthContext from '../context/AuthContext';

export default class AuthPage extends Component {
	state = {
		isLogin: true,
	}

	static contextType = AuthContext;

	constructor( props ) {
		super( props );

		this.emailEl = React.createRef();
		this.passwordEl = React.createRef();
	}

	// switch auth form to signup/login
	handleSwitch = () => {
		this.setState( ( prevState => {
			return { isLogin: ! prevState.isLogin };
		} ) )
	}

	handleSubmit = event => {
		event.preventDefault();
		const email = this.emailEl.current.value;
		const pass = this.passwordEl.current.value;

		if ( email.trim().length === 0 || pass.trim().length === 0 ) {
			return;
		}

		let reqBody = {
			query: `
				query Login($email: String!, $pass: String!) { login(email: $email, password: $pass) {
					userId
					token
					tokenExpiration
				}
			}
			`,
			variables: {
				email: email,
				pass: pass,
			},
		}

		// if not is login mode, create new user
		if ( ! this.state.isLogin ) {
			reqBody = {
				query: `
				mutation CreateUser($email: String!, $pass: String!) { 
					createUser(inputUser: {email: $email, password: $pass}) {
						email
						_id
					} 
				}
				`,
				variables: {
					email: email,
					pass: pass,
				},
			}
		}

		fetch('http://localhost:8000/graphql', {
			method: 'POST',
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then( res => {
				if ( res.status !== 200 && res.status !== 201 ) {
					throw new Error( 'Failed!' );
				}
				return res.json();
			} )
			.then( resData => {
				if ( resData.data.login ) {
					localStorage.setItem( 'evbr_auth', JSON.stringify( {
						token: resData.data.login.token,
						tokenExpiration: resData.data.login.tokenExpiration,
						userId: resData.data.login.userId,
					} ) );
					this.context.login( resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration )
				}
			} )
			.catch( err => {
				throw err;
			} );
	}

	render() {
		return (
			<div className="w-full max-w-xs m-auto">
				<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={ this.handleSubmit }>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
							Username
						</label>
						<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
							id="email" type="text" placeholder="Email" ref={ this.emailEl } />
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
							Password
						</label>
						<input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
							id="password" type="password" placeholder="******************" ref={ this.passwordEl } />
					</div>
					<div className="flex items-center justify-between">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
							Sign In
						</button>
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={ this.handleSwitch }>
							Switch to { this.state.isLogin ? 'Sign up' : 'Login' }
						</button>
					</div>
				</form>
			</div>
		);
	}
}
