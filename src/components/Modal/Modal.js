import React, { Fragment } from 'react';

const Modal = (props) => {
	return (
		<Fragment>
			<div className="inset-0 w-full h-full absolute opacity-75 bg-black"></div>
			<div className="flex flex-col w-1/2 fixed h-auto shadow bg-white modal-container">
				<div className="bg-orange-300 flex items-center justify-center h-16 text-2xl">
					<h2>Add new event</h2>
				</div>
				<div className="flex flex-col p-2 h-full">
					{ props.children }
					<div className="self-end w-full text-right">
						<button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
						onClick={props.onConfirm}>Add</button>
						<button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
						onClick={props.onCancel}>Cancel</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Modal;