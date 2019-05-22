import React from 'react';

const EventCard = (props) => {
	return(
		<div className="max-w-md md:max-w-xs rounded overflow-hidden shadow-lg msb-6">
			<img className="w-full" src="https://via.placeholder.com/350x150" alt="Sunset in the mountains" />
			<div className="px-6 py-4">
				<p className="text-sm text-gray-600 flex items-center">&#36; {props.event.price}</p>
				<div className="font-bold text-xl ">{props.event.title}</div>
				<p className="text-xs text-gray-600 flex items-center mb-2">{new Date(props.event.date).toISOString()}</p>
				<p className="text-gray-700 text-base">{props.event.description}</p>
			</div>
			<div className="px-6 py-4">
				<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>
				<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
				<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
			</div>
		</div>
	);
}

export default EventCard;