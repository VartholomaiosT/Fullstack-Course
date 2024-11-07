import personsService from "../services/personsService";
const Persons = ({ persons = [], newSearch, setPersons }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personsService
        .deletePerson(id)
        .then(() => {
          // Fetch the updated list of persons after deletion
          return personsService.getAll();
        })
        .then((updatedPersons) => {
          setPersons(updatedPersons);
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          alert("An error occurred while deleting the person.");
        });
    }
  };
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {" "}
          <p>
            {person.name}: {person.number}
            <button onClick={() => handleDelete(person.id, person.name)}>
              {" "}
              Delete
            </button>{" "}
          </p>
        </div>
      ))}
    </div>
  );
};
export default Persons;
