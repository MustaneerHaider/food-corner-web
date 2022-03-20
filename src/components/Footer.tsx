import { FC } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer: FC = () => {
	return (
		<footer className='bg-brown text-white'>
			{/* top */}
			<div
				className='grid grid-cols-1 md:grid-cols-3 
      max-w-7xl mx-5 lg:mx-auto gap-y-8 md:gap-y-0 p-8'
			>
				{/* Left */}
				<div>
					<h2 className='font-semibold text-lg'>LOCATION</h2>
					<h3 className='text-sm mt-2'>Some City, Some Street 5</h3>
				</div>
				{/* Center */}
				<div>
					<h2 className='font-semibold text-lg'>AROUND THE WEB</h2>
					<div className='flex items-center space-x-4 mt-2'>
						<FaFacebook className='icon' />
						<FaInstagram className='icon' />
						<FaTwitter className='icon' />
					</div>
				</div>
				{/* Right */}
				<div>
					<h2 className='font-semibold text-lg'>ABOUT</h2>
					<p className='text-sm line-clamp-2 mt-2'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Dicta non dolores labore minus numquam qui?
					</p>
				</div>
			</div>

			<hr className='border-t-2 border-black' />

			{/* bottom */}
			<div className='text-center p-4 text-sm md:text-lg font-bold'>
				Copyright&copy;FoodCorner2022
			</div>
		</footer>
	);
};

export default Footer;
