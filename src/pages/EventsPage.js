import React, { Component, Fragment } from 'react';

import Modal from '../components/Modal/Modal';
import AuthContext from '../context/AuthContext';
import EventCard from '../components/EventCard/EventCard';

export default class EventsPage extends Component {
	state = {
		creating: false,
		events: []
	};

	static contextType = AuthContext;

	constructor(props) {
		super(props);

		this.titleEl = React.createRef();
		this.priceEl = React.createRef();
		this.dateEl = React.createRef();
		this.descriptionEl = React.createRef();
	}

	componentDidMount() {
		const reqBody = {
			query: `
				query { events {
					_id
					title
					date
					price
					description
					creator {
						_id
						email
					}
				} }
			`
		}

		fetch('http://localhost:8000/graphql', {
			method: "POST",
			body: JSON.stringify(reqBody),
			headers: {
				"Content-Type": "application/json",
			}
		})
		.then((res) => {
			if (res.status !== 200 && res.status !== 201) {
				throw new Error('Failed!');
			}
			return res.json();
		})
		.then(resData => {
			// console.log(resData);
			this.setState({
				events: resData.data.events
			});
		})
		.catch(err => {
			throw err;
		})
	}

	onCreateEventHandler = () => {
		this.setState({ creating: true });
	}

	onModalCancelHandler = () => {
		this.setState({ creating: false });
	}

	onModalConfirmHandler = (event) => {
		event.preventDefault();
		this.setState({ creating: false });

		const title = this.titleEl.current.value;
		const price = +this.priceEl.current.value;
		const date = this.dateEl.current.value;
		const description = this.descriptionEl.current.value;

		if(
			title.trim() === '' ||
			price <= 0 ||
			date.trim() === '' ||
			description.trim() === ''
		) {
			console.log('One of the fields is empty');
			return;
		}

		const reqBody = {
			query: `
				mutation { createEvent(inputEvent: {title: "${title}", price: ${price}, date: "${date}", description: "${description}" }) {
					_id
					title
					price
					date,
					description
					creator {
						_id
						email
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
			console.log(resData);
		})
		.catch(err => {
			throw err;
		})
		console.log('from submited');
	}

	render() {
		return(
			<Fragment>
				<h1 className="d-block text-center font-bold text-4xl mb-8">
					Events pagge
				</h1>
				{ this.context.token &&
				<div className="text-center w-1/2 p-4">
					<button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
					onClick={this.onCreateEventHandler}>Create Event</button>
				</div>
				}
				<section className="events-grid mb-6">
				{
					this.state.events.map(event => {
						return (<EventCard event={event} key={event._id} />)
					})
				}
				</section>
				{ this.state.creating && 
				<Modal onCancel={this.onModalCancelHandler} onConfirm={this.onModalConfirmHandler} >
					<form className="w-full">
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
								Title
							</label>
							<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
							id="title" type="text" placeholder="Title" ref={this.titleEl} />
						</div>

						<div className="flex flex-wrap -mx-3 mb-6">
							<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="price">
									Price
								</label>
								<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="price" type="number" placeholder="12.4" ref={this.priceEl} />
							</div>
							<div className="w-full md:w-1/2 px-3">
								<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date">
									Date
								</label>
								<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="date" type="date" placeholder="02/12/2019" ref={this.dateEl} />
							</div>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
								Description
							</label>
							<textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
							id="description"  placeholder="Description" ref={this.descriptionEl}  ></textarea>
						</div>
					</form>
				</Modal> }
			</Fragment>
		);
	}
}