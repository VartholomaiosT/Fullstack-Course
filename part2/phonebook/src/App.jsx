import { useState } from "react";

const Filter = ({ newSearch, setNewSearch }) => {
  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };
  return (
    <div>
      filter shown with <input value={newSearch} onChange={handleSearch} />
    </div>
  );
};

const PersonForm = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  persons,
}) => {
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const found = persons.some((person) => person.name === newName);
    console.log(found);
    console.log(event.target);
    if (!found) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1),
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
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
      <div></div> <button type="submit">add</button>
    </form>
  );
};
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        persons={persons}
      />
      <h2>Numbers</h2>
      {filteredPersons.map((person, index) => (
        <p key={index}>
          {person.name}
          {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
