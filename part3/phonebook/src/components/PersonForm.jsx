import React from "react";
import personsService from "../services/personsService";
import Notification from "./Notification";
const PersonForm = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  persons,
  setPersons,
  setSuccessMessage,
}) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const found = persons?.some((person) => person.name === newName);

    if (!found) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: String((persons?.length || 0) + 1),
      };
      personsService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons((prevPersons) =>
            (prevPersons || []).concat(returnedPerson)
          );
          setNewName("");
          setNewNumber("");
          setSuccessMessage(`Added ${newName}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.error("Error adding person:", error);
        });
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
