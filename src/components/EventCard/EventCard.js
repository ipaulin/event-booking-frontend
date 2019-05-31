import React from 'react';
import './EventCard.css';

const EventCard = props => {
	let description = props.event.description;

	if ( ! props.full ) {
		const descLeng = 40;
		description = props.event.description.length > descLeng ? props.event.description.substring( 0, 40 ) + '...' : props.event.description;
	}

	return (
		<div className="rounded overflow-hidden msb-6 event-card" onClick={ props.onClick }>
			<img className="w-full" src="https://via.placeholder.com/350x150" alt="Sunset in the mountains" />
			<div className="px-6 py-4 event-card-content">
				<p className="text-sm text-gray-600 flex items-center">&#36; { props.event.price } - { new Date( props.event.date ).toLocaleDateString() }</p>
				<div className="font-bold text-xl ">{ props.event.title }</div>
				<p className="text-xs text-gray-600 flex items-center mb-2">{ new Date( props.event.date ).toLocaleDateString() }</p>
				<div className="description-wrap">
					<div className="description">
						<p className="text-gray-700 text-base">{ description }</p>
					</div>
				</div>
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
