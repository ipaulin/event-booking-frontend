import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const MainNavigation = props => (
	<AuthContext.Consumer>
		{
			context => {
				return ( <header className="flex justify-between items-center h-16 bg-orange-300  px-6">
					<div className="mr-4">
						<h2 className="text-2xl">Events platform</h2>
					</div>
					<nav>
						<ul className="list-none flex">
							{ ! context.token && ( <li className="mx-2">
								<NavLink to="/auth">Auth</NavLink>
							</li> )
							}
							<li className="mx-2">
								<NavLink to="/events">Events</NavLink>
							</li>
							{ context.token && (
								<React.Fragment>
									<li className="mx-2">
										<NavLink to="/bookings">Bookings</NavLink>
									</li>
									<li className="mx-2">
										<button onClick={ context.logout }>Logout</button>
									</li>
								</React.Fragment>
							)
							}
						</ul>
					</nav>
				</header> )
			}
		}
	</AuthContext.Consumer>
);

export default MainNavigation;
