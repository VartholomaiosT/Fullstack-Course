const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person");
const person = require("./models/person");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
morgan.token("body", (req) => JSON.stringify(req.body));

const customFormat =
  ":method :url :status :res[content-length] - :response-time ms :body";
const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
mongoose.set("strictQuery", false);
app.use(morgan(customFormat));

// let persons = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        console.log("Deleted person:", result);
        response.status(204).end();
      } else {
        response.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});

// const generateId = () => {
//   const maxId =
//     persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
//   return String(maxId + 1);
// };

app.post("/api/persons", (request, response) => {
  const name = request.body.name ? request.body.name.trim() : "";
  const number = request.body.number ? request.body.number.trim() : "";

  if (!name || !number) {
    return response.status(400).json({
      error: "Name and number must be provided",
    });
  }
  Person.findOne({ name })
    .then((existingPerson) => {
      if (existingPerson) {
        return response.status(400).json({
          error: "Name already exists in the phonebook",
        });
      }

      const person = new Person({
        name: request.body.name,
        number: request.body.number,
      });

      person.save().then((savedPerson) => {
        response.json(savedPerson);
        console.log(savedPerson);
      });
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  const date = new Date();
  const count = Person.length;

  response
    .send(
      `
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `
    )
    .catch((error) => next(error));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);
