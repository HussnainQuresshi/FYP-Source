import React from 'react';
import { Link } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle } from 'mdbreact';

const Card = (props) => {
	return (
		<MDBCard
			style={{ width: '22rem' }}
			className='deep-blue-gradient text-black p-3 m-2 hoverable animated pulse'
		>
			<MDBCardImage className='img-fluid' src={props.ImgSource} waves />
			<MDBCardBody className='text-center'>
				<MDBCardTitle>{props.name}</MDBCardTitle>
				<Link to={props.URL}>
					<button className='btn btn-rounded btn-outline-blue btn-sm'>
						Login <i class='fas fa-user-check p-2'></i>
					</button>
				</Link>
			</MDBCardBody>
		</MDBCard>
	);
};

export default Card;
