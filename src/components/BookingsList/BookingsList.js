import React from 'react';


const BookingList = (props) => {
	return (
		<ul className="bookings-list">
			{
				props.bookings.map(booking => {
					return (
						<li key={booking._id} className="clearfix my-2">
							<div className="py-2 float-left booking-details">
								<h2>{booking.event.title}</h2>
								<p>{new Date(booking.createdAt).toLocaleDateString()}</p>
							</div>
							<div className="py-2 float-right booking-actions">
							<button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
							onClick={props.onCancel.bind(this, booking._id)}>Cancel</button>
							</div>
						</li>
					);
				})
			}
		</ul>
	);
}

export default BookingList;