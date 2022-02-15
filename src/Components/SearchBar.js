import { useState, useEffect } from "react";
import "./SearchBar.css";

import { Container } from "react-bootstrap";

import axios from "axios";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const onChange = (event) => {
    //event.preventDefault()
    console.log(event.target.name + " = " + event.target.value);

    setSearchTerm(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("On Submit");

    // TODO: validation

    if (searchTerm === "") return console.log("search term cannot be empty");

    // if search term is valid
    props.onSubmit(searchTerm);
  };

  return (
    <Container className="search-bar">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="searchTerm"
          value={searchTerm}
          placeholder="Search Player Name"
          onChange={onChange}
        />
        {/* <FontAwesomeIcon icon="fa-light fa-magnifying-glass" /> */}
      </form>
    </Container>
  );
}
export default SearchBar;
