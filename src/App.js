import { useEffect, useState } from "react";
import "./App.css";

import axios from "axios";

import SearchBar from "./Components/SearchBar";
import TeamsTable from "./Components/TeamsTable";
import PlayersTable from "./Components/PlayersTable";
import Title from "./Components/Title";
import Dialog from "./Components/Dialog";

function App() {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  const [showDialog, setShowDialog] = useState(false);
  const [showPlayers, setShowPlayers] = useState(false);

  const [selectedTeam, setSelectedTeam] = useState({});

  useEffect(() => {
    axios
      .get("https://www.balldontlie.io/api/v1/teams")
      .then((result) => {
        //console.log(result)
        setTeams(result.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Searches for players
  const onSearchSubmit = (searchTerm) => {
    console.log("APP got search term = " + searchTerm);

    axios
      .get("https://www.balldontlie.io/api/v1/players", {
        params: {
          search: searchTerm,
          // page: 0
        },
      })
      .then((result) => {
        console.log(result.data);
        setPlayers(result.data.data);
        setShowPlayers(true);
        //setTeams(result.data.data)
      })
      .catch((error) => console.log(error));
  };

  const onGotTeams = (teams) => {
    //console.log(teams)
  };

  const onItemClick = (team) => {
    //console.log(team)
    setSelectedTeam(team);
    setShowDialog(true);
  };

  const onPlayersClose = () => {
    setShowPlayers(false);
  };

  const onDialogClose = (event) => {
    setShowDialog(false);
  };

  return (
    <div className="App">
      <Title title="NBA TEAMS" />
      <SearchBar onSubmit={onSearchSubmit} onGotTeams={onGotTeams} />

      {showPlayers && (
        <PlayersTable players={players} onClose={onPlayersClose} />
      )}
      {!showPlayers && <TeamsTable teams={teams} onItemClick={onItemClick} />}

      <Dialog
        team={selectedTeam}
        visible={showDialog}
        onClose={onDialogClose}
      />
    </div>
  );
}

export default App;
