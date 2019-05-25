import React, { Component } from 'react';

import AuthContext from '../context/AuthContext';
import BookingsList from '../components/BookingsList/BookingsList';

export default class BookingsPage extends Component {
	state = {
		isLoading: false,
		bookings: []
	}
	static contextType = AuthContext;

	componentDidMount() {
		this.fetchBookings();
	};

	fetchBookings () {
		this.setState({
			isLoading: true
		});

		const reqBody = {
			query: `
				query { bookings {
					_id
					createdAt
					event {
						_id
						title
						date
					}
				} }
			`
		}
		const token = this.context.token


		fetch('http://localhost:8000/graphql', {
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token
			}
		})
		.then((res) => {
			if (res.status !== 200 && res.status !== 201) {
				throw new Error('Failed!');
			}
			return res.json();
		})
		.then(resData => {
			this.setState({
				bookings: resData.data.bookings,
				isLoading: false
			});
		})
		.catch(err => {
			this.setState({
				isLoading: false
			})
			throw err;
		})
	};

	// cancel booking 
	onCancelHandler = (id) => {
		this.setState({
			isLoading: true
		});
		const reqBody = {
			query: `
			mutation CancelBooking($bookingId: ID!) { cancelBooking(bookingId: $bookingId) {
				_id
				title
			} }
			`,
			variables: {
				bookingId: id
			}
		}
		const token = this.context.token


		fetch('http://localhost:8000/graphql', {
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token
			}
		})
		.then((res) => {
			if (res.status !== 200 && res.status !== 201) {
				throw new Error('Failed!');
			}
			return res.json();
		})
		.then(resData => {
			this.setState({
				isLoading: false
			});
			this.setState(prevState => {
				const updatedBookings = prevState.bookings.filter(booking => {
					return booking._id !== id;
				});

				return {
					bookings: updatedBookings
				}

			});
		})
		.catch(err => {
			this.setState({
				isLoading: false
			})
			throw err;
		})
	}

	render() {
		return(
			<React.Fragment>
				<h1 className="d-block text-center font-bold text-4xl mb-8">Bookings page</h1>
				{ this.state.isLoading ? 
				<img src={require('../assets/images/Spinner-1s-200px.gif')} alt="Loading..." className="w-24 m-auto" />
				 : <BookingsList bookings={this.state.bookings} onCancel={this.onCancelHandler} /> }
			</React.Fragment>
		);
	}
}