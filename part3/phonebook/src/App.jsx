import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personsService from "./services/personsService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((error) => {
        console.error("Error fetching persons:", error);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      {successMessage && <Notification message={successMessage} />}{" "}
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setSuccessMessage={setSuccessMessage}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        newSearch={newSearch}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
