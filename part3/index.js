const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
morgan.token("body", (req) => JSON.stringify(req.body));

const customFormat =
  ":method :url :status :res[content-length] - :response-time ms :body";

app.use(morgan(customFormat));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((persons) => persons.id !== id);
  response.status(204).end();
});

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/persons", (request, response) => {
  const name = request.body.name ? request.body.name.trim() : "";
  const number = request.body.number ? request.body.number.trim() : "";

  if (!name || !number) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const nameExists = persons.some((person) => person.name === name);

  if (nameExists) {
    return response.status(400).json({
      error: "Name already exists in the phonebook",
    });
  }
  const person = {
    id: generateId(),
    name: request.body.name,
    number: request.body.number,
  };
  persons = persons.concat(person);

  console.log(person);
  response.json(person);
});

app.get("/info", (request, response) => {
  const date = new Date();
  const count = persons.length;

  response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
