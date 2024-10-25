import React from "react";

const Total = ({ parts }) => {
  const totalExercises = parts.reduce(
    (total, parts) => total + parts.exercises,
    0
  );
  return (
    <p key={parts.id}>
      <b>total of {totalExercises} exercises</b>
    </p>
  );
};

const Course = ({ course }) => (
  <div>
    <h1>{course.name}</h1>
    {course.parts.map((part) => (
      <div key={part.id}>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    ))}
    <Total parts={course.parts} />
  </div>
);

export default Course;
