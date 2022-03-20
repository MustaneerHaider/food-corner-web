import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
	href: string;
}

const Link: FC<Props> = ({ children, href }) => {
	return (
		<li>
			<NavLink
				to={href}
				className={({ isActive }) =>
					isActive ? 'activeLink' : 'navLink'
				}
			>
				{children}
			</NavLink>
		</li>
	);
};

export default Link;
