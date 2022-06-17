import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
    const totalExercises = course.parts.reduce((total, part) => total + part.exercises, 0)

    return (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <strong>total of {totalExercises} exercises</strong>
        <br></br><br></br>
    </div>
    ) 
}

export default Course;