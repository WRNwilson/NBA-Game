import { useEffect, useState } from 'react';
import './Dialog.css'

import axios from 'axios';

import { Container, CloseButton, Row, Col } from 'react-bootstrap';

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const getFormattedDate = (date) => {
    // 2022-01-05T00:00:00.000Z
    let parts = date.split("T")
    return parts[0]
}

function Dialog(props) {
    const [totalGamesCount, setTotalGamesCount] = useState(null)
    const [randomGame, setRandomGame] = useState(null)

    useEffect(() => {
        if(!props.team.id) {
            console.log("team id is undefined")
            return
        }

        axios.get("https://www.balldontlie.io/api/v1/games", {
                params: {
                    team_ids: [props.team.id],
                    start_date: "2022-01-01",
                    end_date: "2022-12-31"
                }
            })
            .then(function (response) {
                //console.log(response)

                let games = response.data.data
                let randomIndex = getRandomInt(0, games.length)

                console.log(games[randomIndex])

                setTotalGamesCount(response.data.meta.total_count)
                setRandomGame(games[randomIndex])
            })
            .catch(function (error) {
                console.log(error);
            }) 
    }, [props.team])

    useEffect(() => {
        if(!props.visible) {
            setTotalGamesCount(0)
            setRandomGame(null)
        }

    }, [props.visible])

    if(!props.visible)
        return <div/>

    return (
        <div className="dialog-container">
            <div className="dialog">
                <Container className="header">
                    <h2>{props.team.name}</h2>
                    <CloseButton onClick={props.onClose}/>
                </Container>
                <Container className="content">
                    <Row>
                        <Col>Team Full Name</Col>
                        <Col>{props.team.full_name}</Col>
                    </Row>
                    <Row>
                        <Col>Total Games in 2022</Col>
                        {!randomGame && <p>Loading...</p>}
                        {randomGame && <Col>{totalGamesCount}</Col>}
                    </Row>
                    {randomGame &&
                        <>
                            <h3>Random Game Details</h3>
                            <Row>
                                <Col>Date</Col>
                                <Col>{randomGame.date ? getFormattedDate(randomGame.date) : ""}</Col>
                            </Row>
                            <Row>
                                <Col>Home Team</Col>
                                <Col>{randomGame.home_team.name ? randomGame.home_team.name : ""}</Col>
                            </Row>
                            <Row>
                                <Col>Home Team Score</Col>
                                <Col>{randomGame.home_team_score ? randomGame.home_team_score : ""}</Col>
                            </Row>
                            <Row>
                                <Col>Visitor Team</Col>
                                <Col>{randomGame.visitor_team.name ? randomGame.visitor_team.name : ""}</Col>
                            </Row>
                            <Row>
                                <Col>Visitor Team Score</Col>
                                <Col>{randomGame.visitor_team_score ? randomGame.visitor_team_score : ""}</Col>
                            </Row>
                        </>
                    }
                </Container>
            </div>
        </div>
    )
}

export default Dialog