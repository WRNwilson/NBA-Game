import React from 'react'
import './TeamsTable.css'

import { Container, Row, Col } from 'react-bootstrap';

{/* <Container>
  <Row>
    <Col>1 of 1</Col>
  </Row>
</Container> */}

function TeamsTable(props) {	

	
	return (
		<Container className="teams-table">
			<Container>
				<Row className="header">
					<Col>Team Name</Col>
					<Col>City</Col>
					<Col>Abbreviation</Col>
					<Col>Conference</Col>
					<Col>Division</Col>
				</Row>
			</Container>
			{props.teams.map(team => (
				<Container>
					<Row className="team-item" key={team.id} onClick={(e) => props.onItemClick(team)}>
						<Col>{team.full_name}</Col>
						<Col>{team.city}</Col>
						<Col>{team.abbreviation}</Col>
						<Col>{team.conference}</Col>
						<Col>{team.division}</Col>
					</Row>
				</Container>
				
			))}
		</Container>
	);
}
export default TeamsTable;
