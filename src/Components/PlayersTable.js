import React from 'react'
import './TeamsTable.css'

import { Container, Row, Col, CloseButton } from 'react-bootstrap';

{/* <Container>
  <Row>
    <Col>1 of 1</Col>
  </Row>
</Container> */}

function PlayersTable(props) {	

	
	return (
		<Container className="teams-table">
            <CloseButton onClick={props.onClose}/>
			<Container>
				<Row className="header">
					<Col>Name</Col>
					<Col>Team Name</Col>
					{/* <Col>Position</Col>
					<Col>Height</Col>
					<Col>Weight</Col> */}
				</Row>
			</Container>
			{props.players.map(player => (
				<Container>
					<Row className="team-item" key={player.id} onClick={(e) => props.onItemClick(player)}>
						<Col>{player.first_name + " " + player.last_name}</Col>
						<Col>{player.team.full_name}</Col>
						{/* <Col>{player.position}</Col>
						<Col>{player.height_feet + "\"" + player.height_inches}</Col>
						<Col>{player.weight_pounds}</Col> */}
					</Row>
				</Container>
			))}
		</Container>
	);
}
export default PlayersTable;
