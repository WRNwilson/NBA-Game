import React from 'react'

import { Container } from 'react-bootstrap';

function Title(props) {	
	return (
        <Container>
            <h1 className="title">
                {props.title}
            </h1>
        </Container>
		
	);
}
export default Title;
