import React, { Fragment } from 'react';
import './Modal.css';

const Modal = props => {
	const title = props.title;
	const onConfirmText = props.onConfirmText;
	return (
		<Fragment>
			<div className="inset-0 w-full h-full fixed opacity-75 bg-black"></div>
			<div className="flex flex-col fixed shadow bg-white modal-container">
				{ title &&
				<div className="bg-orange-300 flex items-center justify-center h-16 text-2xl">
					<h2>{ title }</h2>
				</div>
				}
				<div className="flex flex-col justify-between p-2 h-full">
					{ props.children }
					<div className="self-end w-full text-right">
						{ onConfirmText &&
						<button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
							onClick={ props.onConfirm }>{ onConfirmText }</button>
						}
						<button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
							onClick={ props.onCancel }>Cancel</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Modal;
