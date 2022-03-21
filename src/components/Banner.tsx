import { FC } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const Banner: FC = () => {
	return (
		<div className='relative'>
			<div
				className='hidden sm:inline-flex absolute bottom-0 h-32 z-20 w-full bg-gradient-to-t 
      from-gray-100 to-transparent'
			/>
			<Carousel
				autoPlay
				infiniteLoop
				showStatus={false}
				showIndicators={false}
				showThumbs={false}
				interval={5000}
			>
				<div>
					<img loading='lazy' src='/images/img1.jpg' alt='' />
				</div>
				<div>
					<img loading='lazy' src='/images/img2.jpg' alt='' />
				</div>
				<div>
					<img loading='lazy' src='/images/img3.jpeg' alt='' />
				</div>
			</Carousel>
		</div>
	);
};

export default Banner;
