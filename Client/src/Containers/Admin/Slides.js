import React from 'react';
import IMG1 from '../../Extra/images/ny.jpg';
import IMG2 from '../../Extra/images/la.jpg';
import IMG3 from '../../Extra/images/chicago.jpg';

import {
	MDBCarousel,
	MDBCarouselInner,
	MDBCarouselItem,
	MDBView,
	MDBContainer
} from 'mdbreact';

const CarouselPage = () => {
	return (
		<MDBContainer className='mt-5'>
			<MDBCarousel
				activeItem={1}
				length={3}
				showControls={true}
				showIndicators={true}
				className='z-depth-1 hoverable'
			>
				<MDBCarouselInner className='hoverable'>
					<MDBCarouselItem itemId='1'>
						<MDBView>
							<img
								style={{ height: '50vh' }}
								className='d-block w-100'
								src={IMG1}
								alt='First slide'
							/>
						</MDBView>
					</MDBCarouselItem>
					<MDBCarouselItem itemId='2'>
						<MDBView>
							<img
								style={{ height: '50vh' }}
								className='d-block w-100'
								src={IMG2}
								alt='Second slide'
							/>
						</MDBView>
					</MDBCarouselItem>
					<MDBCarouselItem itemId='3'>
						<MDBView>
							<img
								style={{ height: '50vh' }}
								className='d-block w-100'
								src={IMG3}
								alt='Third slide'
							/>
						</MDBView>
					</MDBCarouselItem>
				</MDBCarouselInner>
			</MDBCarousel>
		</MDBContainer>
	);
};

export default CarouselPage;
